const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

const gameService = require('../services/gameService');

// CRUD operations
router.get('/', gameController.getAllGames);
router.get('/search', gameController.searchGames);
router.get('/pagination', gameController.getGamesWithPagination);

// Test: curl -X DELETE http://localhost:3000/api/games/gameID
router.delete('/:id', async (req, res) => {
    try {
        await gameService.deleteGame(req.params.id);
        console.log(`The game with ID: ${req.params.id} has been deleted.`);
        res.status(204).send(); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting the game');
    }
});

// Test: curl -X PUT -H "Content-Type: application/json" -d '{"title":"GTA2","description":"Description of the GTA2"}' http://localhost:3000/api/games/{8ac7cd09-35d0-4959-9a3f-dfabef5677c4}
router.put('/:gameId', async (req, res) => {
    try {
        const updatedGame = await gameService.updateGame(req.params.gameId, req.body);
        console.log(`The game with ID: ${req.params.gameId} has been updated.`);
        res.json(updatedGame);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating the game');
    }
});

module.exports = router;
