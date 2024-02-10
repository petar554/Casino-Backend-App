const GameController = require("../controllers/gameController");
const GameService = require("../services/gameService");

describe("Game JEST test", () => {
  test("Create a game with players", async () => {
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
      send: jest.fn(),
    };

    try {
      await GameController.createGameWithPlayers(mockRequest, mockResponse);
    } catch (error) {
      console.error("Error in test:", error);
    }
  }, 10000);

  test("Search game by game ID", async () => {
    const mockRequest = {
      query: {
        id: "a23bfa47-ee41-4ad6-935d-b6f7c32a5aaf",
      },
    };

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockGame = {
      id: "a23bfa47-ee41-4ad6-935d-b6f7c32a5aaf",
      title: "Witcher",
      description: "A classic strategy of Witcher game",
    };

    GameService.getGameById = jest.fn().mockResolvedValue(mockGame);

    await GameController.searchGames(mockRequest, mockResponse);

    const expectedGame = {
      id: mockGame.id,
      title: mockGame.title,
      description: mockGame.description,
    };

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(expectedGame)])
    );
  });
});
