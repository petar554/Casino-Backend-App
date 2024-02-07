const Game = require('../models/Game');

exports.getAllGames = async () => {
    return await Game.findAll();
};

exports.createGame = async (gameData) => {
    return await Game.create(gameData);
};

exports.getGameById = async (gameId) => {
    return await Game.findByPk(gameId);
};

exports.updateGame = async (gameId, gameData) => {
    const game = await Game.findByPk(gameId);
    if (!game) {
        throw new Error('Game not found');
    }
    return await game.update(gameData);
};

exports.deleteGame = async (gameId) => {
    const game = await Game.findByPk(gameId);
    if (!game) {
        throw new Error('Game not found');
    }
    await game.destroy();
    return true;
};
