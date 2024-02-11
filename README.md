# Casino Backend Application

## Description

This project is a backend application for managing casino players and games via a REST API. It provides endpoints for CRUD operations on players and games, as well as additional features such as pagination, searching, and listing games played by a specific player. The application is built with Node.js, Express, and Sequelize ORM, supporting multiple clients simultaneously with data persistence in a SQLite database.

## Features

### Key features:

- **Games Management:**

  - CRUD operations for games.
  - List all games.
  - List games with pagination support.
  - Search for games.

- **Players Management:**

  - CRUD operations for players.
  - List all players.
  - List players with pagination support.
  - List games played by a player with pagination support.
  - Search for players.

### Additional features:

- **HTTP Cache Mechanisms**: To improve performance and reduce server load. This optimization is particularly focused on endpoints that fetch data, which are less likely to change frequently.

- **Request Counter**: All REST API calls are tracked using a request counter, which records the number of times each endpoint is accessed. This information is saved to a local file.

- **Swagger Documentation**: The API is fully documented using Swagger, offering an interactive documentation interface where users can explore available endpoints..

## Technologies Used

- **Backend Framework:** Express.js
- **Database:** SQLite
- **ORM:** Sequelize ORM
- **Testing Framework:** Postman, JEST
- **Documentation:** Swagger (OpenAPI)

## Installation

### Prerequisites

- Node.js (version 12.x or above)
- npm (version 6.x or above)
- A running instance of SQLite database

### Steps

1. Clone the repository:

```bash
git clone https://github.com/petar554/Casino-Backend-App.git
cd Casino-Backend-App/backend
```

2. Install dependencies:

```bash
npm install express sequelize sqlite3 body-parser swagger-ui-express swagger-jsdoc jest --save-dev
```

3. Start the server:

```bash
npm app.js (nodemon app.js)
```

## API Documentation

Swagger is utilized to document the API endpoints interactively. Once the server is running, access the Swagger UI at: URL: http://localhost:3000/api-docs

This documentation provides a comprehensive overview of available endpoints, allowing for direct interaction and testing within the browser.

## Usage

The application supports the following REST API endpoints:

- **Games**

  - `GET /api/games`: List all games.
  - `POST /api/games/create-game-with-players`: Create a new game with players.
  - `PUT /api/games/:id`: Update a game by ID.
  - `DELETE /api/games/:id`: Delete a game by ID.

- **Players**

  - `GET /api/players`: List all players.
  - `POST /api/games/create-game-with-players`: Creating players (along with the game)
  - `PUT /api/players/:id`: Update a player by ID.
  - `DELETE /api/players/:id`: Delete a player by ID.

### Example (Using curl):

Make sure to update the URL if your server is running on a different host or port.

Creating a new game with players:

```bash
curl -X POST -H "Content-Type: application/json" -d '{ "gameData": { "title": "Fortnite", "description": "A classic strategy of Fortnite game" }, "playersData": [ { "firstName": "Petar", "lastName": "Buric", "bornDate": "1999-02-05" }, { "firstName": "Nejc", "lastName": "Lubej", "bornDate": "1988-11-22" } ] }' http://localhost:3000/api/games/create-game-with-players
```

### Example (Postman Collection):

1. **Open Postman:**

   - Launch the Postman application or open the Postman web interface.

2. **Select Request Type and URL:**

   - Choose the `POST` request type.
   - Enter the URL `http://localhost:3000/api/games/create-game-with-players`.

3. **Set Headers:**

   - Click on the "Headers" tab.
   - Add a new header with key `Content-Type` and value `application/json`.

4. **Set Request Body:**
   - Click on the "Body" tab.
   - Select the `raw` option.
   - From the dropdown menu next to the raw option, select `JSON`.
   - Copy and paste the following JSON data into the body:
   - To test the `create-game-with-players` endpoint using Postman, you can use the JSON data provided in this [GitHub Gist](https://gist.github.com/petar554/d6a3c9a948a8c278061c14534ae790d7).

### Example (JEST tests):

With all the dependencies installed, you can run some of the implemented JEST tests using the npx command.

```bash
npx jest
```

After running the tests, JEST will provide an output summarizing the test results:

**Passed Tests:**
These are indicated by a green checkmark or the word "PASS" in the terminal. It means the test ran successfully, and the application behavior met the expectations defined in the test.

**Failed Tests:**
If any tests fail, they will be marked with a red "FAIL" label. The output will include detailed information about which tests failed and why, including expected and actual outcomes.

### Example (Basic SQLite Queries):

This section provides examples of basic SQLite queries that can be used to interact with the database for the Casino Backend Application. These examples assume you have SQLite installed and are running these commands from the SQLite command line interface.

```sql
SELECT * FROM Players AS P order by P.createdAt DESC;
SELECT * FROM Games AS G order by G.createdAt DESC;

SELECT * FROM PlayerGame AS PG order by PG.createdAt DESC;
```

```sql
SELECT
	g.id AS GAME_ID,
	g.title AS GAME_TITLE,
	g.description AS GAME_DESCRIPTION,
	pg.PlayerId AS PLAYER_ID
FROM
	Games g
JOIN PlayerGame pg ON pg.GameId = g.id
```
