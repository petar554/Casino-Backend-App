const PlayerController = require("../controllers/playerController");
const PlayerService = require("../services/playerService");

describe("Player JEST test", () => {
  test("Create players", async () => {
    const mockPlayers = [
      {
        firstName: "Robert",
        lastName: "Abramovic",
        bornDate: "1999-02-05",
      },
      {
        firstName: "Marko",
        lastName: "Sumina",
        bornDate: "1988-11-22",
      },
    ];

    try {
      await Promise.all(
        mockPlayers.map((playerData) => PlayerService.createPlayer(playerData))
      );
    } catch (error) {
      console.error("Error in tests:", error);
    }
  });

  test("Get games played by player", async () => {
    const playerId = "746c2f55-d54d-4e50-b436-603dd30a0c24";
    const mockRequest = {
      params: {
        playerId: playerId,
      },
      query: {
        page: 1,
        limit: 10,
      },
    };

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockPlayer = {
      id: playerId,
      firstName: "Joze",
      lastName: "Skoda",
      bornDate: "1988-11-22",
    };

    const expectedGame = {
      id: "b18b6ed5-56b1-435b-9f75-415237ae346b",
      title: "Witcher",
      description: "A classic strategy of Witcher game",
    };

    PlayerService.getPlayerById = jest.fn().mockResolvedValue(mockPlayer);

    await PlayerController.getGamesPlayedByPlayer(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(expectedGame)])
    );
  });
});
