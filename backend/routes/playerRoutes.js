const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

const playerService = require("../services/playerService");

// curl -X GET http://localhost:3000/api/players
/**
 * @swagger
 *  /api/players:
 *    get:
 *      summary: Lists all players
 *      tags: [Players]
 *      responses:
 *        200:
 *          description: The list of the players
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Player'
 */
router.get("/", playerController.getAllPlayers);

// curl -X GET http://localhost:3000/api/players/search?query={name}
/**
 * @swagger
/api/players/search:
*    get:
*      summary: Search for players by name
*      tags: [Players]
*      parameters:
*        - in: query
*          name: query
*          schema:
*            type: string
*          required: false
*          description: Player name to search for
*      responses:
*        200:
*          description: An array of players matching the search criteria
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  $ref: '#/components/schemas/Player'
*/
router.get("/search", playerController.searchPlayers);

// curl -X GET http://localhost:3000/api/players/pagination?page=1&limit=10
/**
 * @swagger
 * /api/players/pagination:
 *    get:
 *      summary: Retrieve a paginated list of players
 *      tags: [Players]
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
 *          description: A paginated list of players
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  players:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Player'
 *                  total:
 *                    type: integer
 *                    description: Total number of players
 *                  pages:
 *                    type: integer
 *                    description: Total number of pages
 *                  currentPage:
 *                    type: integer
 *                    description: Current page number
 */
router.get("/pagination", playerController.getPlayersWithPagination);

// curl -X GET http://localhost:3000/api/players/{id}/games
/**
 * @swagger
 *  /api/players/{playerId}/games:
 *    get:
 *      summary: Get games played by a specific player
 *      tags: [Players]
 *      parameters:
 *        - in: path
 *          name: playerId
 *          required: true
 *          schema:
 *            type: string
 *          description: Unique identifier of the player
 *      responses:
 *        200:
 *          description: A list of games associated with the player
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Game'
 */
router.get("/:playerId/games", playerController.getGamesPlayedByPlayer);

// curl -X DELETE http://localhost:3000/api/players/playerID
router.delete("/:id", async (req, res) => {
  try {
    await playerService.deletePlayer(req.params.id);
    console.log(`The player with ID: ${req.params.id} has been deleted.`);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the player");
  }
});

// curl -X PUT -H "Content-Type: application/json" -d '{"firstName":"Jan","lastName":"Bricl"}' http://localhost:3000/api/players/{34ba8d53-2fd0-47e1-bb52-ab02e2193483}
router.put("/:playerId", async (req, res) => {
  try {
    const updatedPlayer = await playerService.updatePlayer(
      req.params.playerId,
      req.body
    );
    console.log(`The plaer with ID: ${req.params.playerId} has been updated.`);
    res.json(updatedPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating the player");
  }
});

module.exports = router;
