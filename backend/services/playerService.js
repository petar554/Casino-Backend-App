const Player = require("../models/Player");

exports.getAllPlayers = async () => {
  return await Player.findAll();
};

exports.createPlayer = async (playerData) => {
  return await Player.create(playerData);
};

exports.getPlayerById = async (playerId) => {
  return await Player.findByPk(playerId);
};

exports.updatePlayer = async (playerId, playerData) => {
  const player = await Player.findByPk(playerId);
  if (!player) {
    throw new Error("Player not found");
  }
  return await player.update(playerData);
};

exports.deletePlayer = async (playerId) => {
  const player = await Player.findByPk(playerId);
  if (!player) {
    throw new Error("Player not found");
  }
  await player.destroy();
  return true;
};
