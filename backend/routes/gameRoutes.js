const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const gameService = require("../services/gameService");

// curl -X GET http://localhost:3000/api/games
/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Retrieve a list of all games
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       500:
 *         description: Error when retrieving a list of all games
 */
router.get("/", gameController.getAllGames);

// curl -X GET http://localhost:3000/api/games/search?query={title}
// curl -X GET http://localhost:3000/api/games/search?query={title}&{id}
/**
 * @swagger
 * /api/games/search:
 *   get:
 *     summary: Search for games by title or ID
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Title of the game to search for
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the game to search for
 *     responses:
 *       200:
 *         description: An array of games matching the search criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 *       500:
 *         description: Error when searching for games by title or ID
 */
router.get("/search", gameController.searchGames);

// curl -X GET http://localhost:3000/api/games/pagination?page=1&limit=10
/**
 * @swagger
 * /api/games/pagination:
 *    get:
 *      summary: Retrieve a paginated list of games
 *      tags: [Games]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            default: 1
 *          required: false
 *          description: Page number
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            default: 10
 *          required: false
 *          description: Number of items per page
 *      responses:
 *        200:
 *          description: A paginated list of games
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  games:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Game'
 *                  total:
 *                    type: integer
 *                    description: Total number of games
 *                  pages:
 *                    type: integer
 *                    description: Total number of pages
 *                  currentPage:
 *                    type: integer
 *                    description: Current page number
 *        500:
 *          description: Error when retrieving a paginated list of games
 */
router.get("/pagination", gameController.getGamesWithPagination);

// Request body: https://gist.github.com/d6a3c9a948a8c278061c14534ae790d7.git
/**
 * @swagger
 * /api/games/create-game-with-players:
 *    post:
 *      summary: Create a game with players
 *      tags: [Games]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GameCreateRequest'
 *      responses:
 *        201:
 *          description: The game was successfully created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Game'
 *        500:
 *          description: Error when creating a game with players
 */
router.post("/create-game-with-players", gameController.createGameWithPlayers);

// curl -X DELETE http://localhost:3000/api/games/{gameID}
/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Deletes a game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     responses:
 *       204:
 *         description: Successfully deleted the game
 *       500:
 *         description: Error deleting the game
 */
router.delete("/:id", async (req, res) => {
  try {
    await gameService.deleteGame(req.params.id);
    console.log(`The game with ID: ${req.params.id} has been deleted.`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the game");
  }
});

// curl -X PUT -H "Content-Type: application/json" -d '{"title":"GTA5","description":"Description of the GTA5"}' http://localhost:3000/api/games/{gameID}
/**
 * @swagger
 * /api/games/{gameId}:
 *   put:
 *     summary: Updates a game's information
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: The game ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GameUpdateRequest'
 *     responses:
 *       200:
 *         description: Successfully updated the game
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       500:
 *         description: Error updating the game
 */
router.put("/:gameId", async (req, res) => {
  try {
    const updatedGame = await gameService.updateGame(
      req.params.gameId,
      req.body
    );
    console.log(`The game with ID: ${req.params.gameId} has been updated.`);
    res.json(updatedGame);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating the game");
  }
});

module.exports = router;
