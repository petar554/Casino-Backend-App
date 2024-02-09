const { Op } = require('sequelize');
const sequelize = require('../utils/database');
const Game = require('../models/index');
const { createGame } = require('../services/gameService');
const { createPlayer } = require('../services/playerService');

exports.createGameWithPlayers = async (req, res) => {
    const { gameData, playersData } = req.body;
    let transaction;
    try {
        transaction = await sequelize.transaction();

         // game creation
        const game = await createGame(gameData, { transaction });

        // players creation
        const players = await Promise.all(playersData.map(player => createPlayer(player, { transaction })));

        // update the game with player IDs
        const playerIds = players.map(player => player.id);
        await game.update({ players: playerIds }, { transaction });

        // update join table
        await game.setPlayers(players, { transaction });

        await transaction.commit();
        res.status(201).json(game);
    } catch (error) {
        console.error('Error starting the server:', error);
        if (transaction) await transaction.rollback();
        res.status(500).send("Error creating game with players.");
    }
};

exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

exports.searchGames = async (req, res) => {
    const { query } = req.query;
    try {
        const games = await Game.findAll({
            where: {
                title: {
                    [Op.like]: `%${query}%`
                }
            }
        });
        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};

exports.getGamesWithPagination = async (req, res) => {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    console.log(offset);
    try {
        const games = await Game.findAll({ offset, limit });
        res.json(games);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
};
