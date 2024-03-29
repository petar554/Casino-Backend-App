const { Op } = require("sequelize");
const { Player } = require("../models/index");

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    // cache-control for 1 minute
    res.set("Cache-Control", "public, max-age=600");
    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.searchPlayers = async (req, res) => {
  const { query } = req.query;
  try {
    const players = await Player.findAll({
      where: {
        firstName: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    // cache-control for 1 minute
    res.set("Cache-Control", "public, max-age=600");
    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.getPlayersWithPagination = async (req, res) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;
  try {
    const players = await Player.findAll({ offset, limit });
    // cache-control for 1 minute
    res.set("Cache-Control", "public, max-age=600");
    res.json(players);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.getGamesPlayedByPlayer = async (req, res) => {
  const { playerId } = req.params;
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const offset = (page - 1) * limit;

  try {
    const player = await Player.findByPk(playerId);

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    const games = await player.getGames({ offset, limit });
    // cache-control for 1 minute
    res.set("Cache-Control", "public, max-age=600");
    console.log(games);

    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
