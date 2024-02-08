const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

const playerService = require('../services/playerService');

// routes
router.get('/', playerController.getAllPlayers);
router.get('/search', playerController.searchPlayers);
router.get('/pagination', playerController.getPlayersWithPagination);
router.get('/:playerId/games', playerController.getGamesPlayedByPlayer);

// CRUD - delete
router.delete('/:id', async (req, res) => {
    try {
        await playerService.deletePlayer(req.params.id);
        res.status(204).send();

        console.error('The player has been deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting the player');
    }
});

module.exports = router;