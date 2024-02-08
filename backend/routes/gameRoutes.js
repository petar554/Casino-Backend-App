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
        console.log(`The game with ID ${req.params.id} has been deleted.`);
        res.status(204).send(); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting the game');
    }
});

module.exports = router;
