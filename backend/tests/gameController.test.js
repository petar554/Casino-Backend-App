const GameController = require("../controllers/gameController");
const GameService = require("../services/gameService");

describe("Game JEST test", () => {
  test.only("Create a game with players", async () => {
    const mockRequest = {
      body: {
        gameData: {
          title: "Witcher",
          description: "A classic strategy of Witcher game",
        },
        playersData: [
          {
            firstName: "Janko",
            lastName: "Kan",
            bornDate: "1999-02-05",
          },
          {
            firstName: "Joze",
            lastName: "Skoda",
            bornDate: "1988-11-22",
          },
        ],
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await GameController.createGameWithPlayers(mockRequest, mockResponse);
  });

  test("Should search game by ID", async () => {
    const mockRequest = {
      query: {
        id: "f0424cc7-f229-4eb7-b148-4dd7c719bd05",
      },
    };

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockGame = {
      id: "f0424cc7-f229-4eb7-b148-4dd7c719bd05",
      players: [
        "b4e476d7-fd4e-4ac4-8032-a1325120ebd8",
        "3f5a441f-06c1-4225-91b5-c9a50bed15e4",
      ],
      title: "Witcher",
      createdAt: new Date("2024-02-09T20:40:52.507Z"),
      description: "A classic strategy of Witcher game",
      updatedAt: new Date("2024-02-09T20:40:52.546Z"),
    };

    GameService.getGameById = jest.fn().mockResolvedValue(mockGame);

    await GameController.searchGames(mockRequest, mockResponse);

    const expectedGame = {
      id: mockGame.id,
      title: mockGame.title,
      createdAt: mockGame.createdAt,
      updatedAt: mockGame.updatedAt,
      description: mockGame.description,
      players: mockGame.players,
    };

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(expectedGame)])
    );
  });
});
