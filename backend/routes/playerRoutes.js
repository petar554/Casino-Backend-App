const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

// routes
router.get('/', playerController.getAllPlayers);
router.get('/pagination', playerController.getPlayersWithPagination);
router.get('/:playerId/games', playerController.getGamesPlayedByPlayer);

module.exports = router;