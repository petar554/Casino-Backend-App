# Casino Backend Application

## Description

This project is a backend application for managing casino players and games via a REST API. It provides endpoints for CRUD operations on players and games, as well as additional features such as pagination, searching, and listing games played by a specific player. The application is built with Node.js, Express, and Sequelize ORM, supporting multiple clients simultaneously with data persistence in a SQLite database.

## Features

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

## Technologies Used

- **Backend Framework:** Express.js
- **Database:** SQLite
- **ORM:** Sequelize ORM
- **Testing Framework:** Postman, JEST

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
npm install express sequelize sqlite3 body-parser
```

3. Start the server:

```bash
npm start (nodemon app.js)
```

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

### Example:

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
