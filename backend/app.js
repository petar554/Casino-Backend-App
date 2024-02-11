const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const requestCounter = require("./middleware/requestCounter");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = require("./config/swaggerOptions");

const gameRoutes = require("./routes/gameRoutes");
const playerRoutes = require("./routes/playerRoutes");

const app = express();

app.use(bodyParser.json());
app.use(requestCounter);

app.use("/api/games", gameRoutes);
app.use("/api/players", playerRoutes);

// swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is wrong.");
});

const startServer = async () => {
  try {
    await sequelize.sync(); // sync models with the database

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
};

startServer();
