const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');

const gameRoutes = require('./routes/gameRoutes');
const playerRoutes = require('./routes/playerRoutes');

const gameService = require('./services/gameService');
const playerService = require('./services/playerService');

const Player = require('./models/Player');
const Game = require('./models/Game');

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

const createGameWithPlayers = async () => {
    try {
        const game = await gameService.createGame({
            title: 'GTA',
            description: 'Description of the GTA',
        });

        const player1 = await playerService.createPlayer({
            firstName: 'Jan',
            lastName: 'Oblak',
            bornDate: new Date('1990-05-15')
        });

        const player2 = await playerService.createPlayer({
            firstName: 'Toni',
            lastName: 'Montana',
            bornDate: new Date('1992-08-22')
        });

        await game.addPlayer(player1);
        await game.addPlayer(player2);

        const playerIds = [player1.id, player2.id];
        await gameService.updateGame(game.id, { players: playerIds });

        console.log('Game created');
    } catch (error) {
        console.error('Error creating game with players:', error);
    }
};

sequelize.sync() // sync models with database
    .then(() => {
        createGameWithPlayers(); 
        app.listen(3000, () => {
            console.log('Bravo, server is running on port 6000');
        });
    })
    .catch(err => console.error(err));
