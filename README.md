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
