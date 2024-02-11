/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID for the game.
 *         title:
 *           type: string
 *           description: The title of the game.
 *         description:
 *           type: string
 *           description: The description of the game.
 *         players:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of player IDs associated with the game.
 */
