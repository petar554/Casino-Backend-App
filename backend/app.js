const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

const gameRoutes = require('./routes/gameRoutes');
const playerRoutes = require('./routes/playerRoutes');

const { createGame, updateGame } = require('./services/gameService');
const { createPlayer } = require('./services/playerService');

const Player = require('./models/Player');
const Game = require('./models/Game');

// todo: should be moved to model definitions
Player.belongsToMany(Game, { through: 'PlayerGame' });
Game.belongsToMany(Player, { through: 'PlayerGame' });

const app = express();

app.use(bodyParser.json());

app.use('/api/games', gameRoutes);
app.use('/api/players', playerRoutes);
 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is wrong.');
});

const createGameWithPlayers = async (gameData, playersData) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        // game creation
        const game = await createGame(gameData, { transaction });
        
        // players creation
        const players = await Promise.all(playersData.map(player => createPlayer(player, { transaction })));
        const playerIds = players.map(player => player.id);
        
        // update the game with player IDs
        await game.update({ players: playerIds }, { transaction });
        await game.setPlayers(players, { transaction });

        await transaction.commit();

        console.log('Game created with players:', game.toJSON());
        return game;
    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error('Error creating game with players:', error);
        throw error;
    }
};

const startServer = async () => {
    try {
        await sequelize.sync(); // sync models with the database

        // sample data (todo)
        const gameData = {
            title: 'GTA',
            description: 'Description of the GTA',
        };
        const playersData = [
            {
                firstName: 'Jan',
                lastName: 'Oblak',
                bornDate: new Date('1990-05-15')
            },
            {
                firstName: 'Toni',
                lastName: 'Montana',
                bornDate: new Date('1992-08-22')
            }
        ];

        // create a game with players
        await createGameWithPlayers(gameData, playersData);

        app.listen(3000, () => {
            console.log('Bravo, server is running on port 3000');
        });
    } catch (err) {
        console.error('Error starting the server:', err);
        process.exit(1);
    }
};

startServer();