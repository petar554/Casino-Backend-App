const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Casino Backend API",
      version: "1.0.0",
      description: "This is a REST API for managing casino games and players.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js", "./api-docs/schemas/*.js"],
};

module.exports = options;
