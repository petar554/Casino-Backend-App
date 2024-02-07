const { Op } = require('sequelize');
const Game = require('../models/Game');

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
