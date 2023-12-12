import Gameboard from "../modules/gameboard";
import player from "../modules/player";

test("test player name", () => {
  const p = player("John");
  expect(p.getPlayerName()).toMatch("John");
});

test("test player board", () => {
  const board = Gameboard();
  const p = player("John", board);
  expect(p.getBoard().getGameboard()).toEqual(board.getGameboard());
});

test("test that AI is not shooting the same coords", () => {
  const ai = player("ai");
  for (let i = 0; i < 101; i++) {
    ai.chooseRandomShot();
  }
  expect(ai.getShots().length).toBeLessThan(101);
});

// add a test that checks that getShots function matches the chooseRandomShot function