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

// // sample data
// (async () => {
//     try {
//         await Game.bulkCreate([
//             { title: 'PES', description: 'Description of PES' },
//             { title: 'FIFA', description: 'Description of FIFA' }
//         ]);

//         await Player.bulkCreate([
//             { firstName: 'Mike', lastName: 'Makic' },
//             { firstName: 'Stefan', lastName: 'Vrbica' }
//         ]);

//         console.log('Sample data inserted successfully');
//     } catch (err) {
//         console.error('Error inserting sample data:', err);
//     }
// })();

// const createGameWithPlayers = async () => {
//     try {
//         const game = await gameService.createGame({
//             title: 'San Andreas',
//             description: 'Description of the San Andreas',
//         });

//         const player1 = await playerService.createPlayer({
//             firstName: 'Vlado',
//             lastName: 'Vakic',
//         });

//         const player2 = await playerService.createPlayer({
//             firstName: 'Boki',
//             lastName: 'Bokic',
//         });

//         await game.addPlayer(player1);
//         await game.addPlayer(player2);

//         console.log('Game created with players');
//     } catch (error) {
//         console.error('Error creating game with players:', error);
//     }
// };

const createGameWithPlayers = async () => {
    try {
        const game = await gameService.createGame({
            title: 'San Andreas',
            description: 'Description of the San Andreas',
        });

        const player1 = await playerService.createPlayer({
            firstName: 'Vlado',
            lastName: 'Vakic',
            bornDate: '1990-05-15'
        });

        const player2 = await playerService.createPlayer({
            firstName: 'Boki',
            lastName: 'Bokic',
            bornDate: '1992-08-22'
        });

        const playersData = [
            { id: player1.id, firstName: player1.firstName, lastName: player1.lastName, bornDate: player1.bornDate },
            { id: player2.id, firstName: player2.firstName, lastName: player2.lastName, bornDate: player2.bornDate }
        ];

        await gameService.updateGamePlayers(game.id, playersData);

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
