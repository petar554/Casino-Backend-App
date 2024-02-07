const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getAllGames);
router.get('/search', gameController.searchGames);
router.get('/pagination', gameController.getGamesWithPagination);

module.exports = router;
