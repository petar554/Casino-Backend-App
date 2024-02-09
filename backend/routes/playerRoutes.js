const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

const playerService = require('../services/playerService');

// CRUD operations
// Test: curl -X GET http://localhost:3000/api/players
router.get('/', playerController.getAllPlayers);
// Test: curl -X GET http://localhost:3000/api/players/search?query=Toni
router.get('/search', playerController.searchPlayers);
// Test: curl -X GET http://localhost:3000/api/players/pagination?page=1&limit=10
router.get('/pagination', playerController.getPlayersWithPagination);
// Test: curl -X GET http://localhost:3000/api/players/7911bd5d-7716-4aad-abc9-c2181652f931/games
router.get('/:playerId/games', playerController.getGamesPlayedByPlayer);

// Test: curl -X DELETE http://localhost:3000/api/players/playerID
router.delete('/:id', async (req, res) => {
    try {
        await playerService.deletePlayer(req.params.id);
        console.log(`The player with ID: ${req.params.id} has been deleted.`);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting the player');
    }
});

// Test: curl -X PUT -H "Content-Type: application/json" -d '{"firstName":"Jan","lastName":"Bricl"}' http://localhost:3000/api/players/{34ba8d53-2fd0-47e1-bb52-ab02e2193483}
router.put('/:playerId', async (req, res) => {
    try {
        const updatedPlayer = await playerService.updatePlayer(req.params.playerId, req.body);
        console.log(`The plaer with ID: ${req.params.playerId} has been updated.`);
        res.json(updatedPlayer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating the player');
    }
});

module.exports = router;