const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

const gameService = require('../services/gameService');

router.get('/', gameController.getAllGames);
router.get('/search', gameController.searchGames);
router.get('/pagination', gameController.getGamesWithPagination);

// CRUD - delete
router.delete('/:id', async (req, res) => {
    try {
        await gameService.deleteGame(req.params.id);
        res.status(204).send(); 

        console.error('The game has been deleted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting the game');
    }
});

module.exports = router;
