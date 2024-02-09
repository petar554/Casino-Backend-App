const Player = require('./Player');
const Game = require('./Game');
const sequelize = require('../utils/database');

Player.belongsToMany(Game, { through: 'PlayerGame' });
Game.belongsToMany(Player, { through: 'PlayerGame' });

module.exports = {
  sequelize,
  Player,
  Game
};