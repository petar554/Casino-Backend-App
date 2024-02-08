const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

const playerService = require('../services/playerService');

// CRUD operations
router.get('/', playerController.getAllPlayers);
router.get('/search', playerController.searchPlayers);
router.get('/pagination', playerController.getPlayersWithPagination);
router.get('/:playerId/games', playerController.getGamesPlayedByPlayer);

// Test: curl -X DELETE http://localhost:3000/api/players/playerID
router.delete('/:id', async (req, res) => {
    try {
        await playerService.deletePlayer(req.params.id);
        console.log(`The player with ID ${req.params.id} has been deleted.`);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting the player');
    }
});

module.exports = router;