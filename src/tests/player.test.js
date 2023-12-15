import Gameboard from "../modules/gameboard.js";
import player from "../modules/player.js";

test("test player name", () => {
  const p = player("John");
  expect(p.getPlayerName()).toMatch("John");
});

test("test player board", () => {
  const board = Gameboard();
  const p = player("John", board);
  expect(p.getBoard().getGameboard()).toEqual(board.getGameboard());
});

// might need to delete or refactor this test because it's not that good of a test
// test("test that AI is not shooting the same coords", () => {
//   const ai = player("ai");
//   for (let i = 0; i < 101; i++) {
//     ai.chooseRandomShot();
//   }
//   expect(ai.getShots().length).toBeLessThan(101);
// });

// test("test random ship placements", () => {
//   const board = Gameboard();
//   const ai = player("ai", board);
//   let flag = true;
  
//   const shipsCoordinates = ai.getRandomShipPlacements();
//   console.log(shipsCoordinates);
//   shipsCoordinates.forEach(obj => {
//     if (obj.row > 10 || (obj.column + obj.ship.getLength() > 10)) flag = false;
//   });
//   expect(flag).toBeTruthy();
// });

test("test chooseRandomShot matches getShots", () => {
  const board = Gameboard();
  const ai = player("ai", board);
  const shot = ai.chooseRandomShot();
  console.log(shot);
  console.log(ai.getShots());
  expect(ai.getShots()[0]).toEqual(shot);
});