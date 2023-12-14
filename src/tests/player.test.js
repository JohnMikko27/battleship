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

test("test that AI is not shooting the same coords", () => {
  const ai = player("ai");
  for (let i = 0; i < 101; i++) {
    ai.chooseRandomShot();
  }
  expect(ai.getShots().length).toBeLessThan(101);
});

test("test random ship placements", () => {
  const board = Gameboard();
  const ai = player("ai", board);
  let flag = true;
  // what do i want it to do? 
  // i want it to return an array of objects; object = {row, column, ship}
  // i want to check and make sure that (for right now) they are in different rows
  // and that the ship doesn't go out of bounds; column + ship.getLength() < 10
  // maybe i can split into two tests, i can check first if the rows and column + ships don't go out of bounds
  const shipsCoordinates = ai.getRandomShipPlacements();
  shipsCoordinates.forEach(obj => {
    if (obj.row > 10 || (obj.column + obj.ship.getLength() > 10)) flag = false;
  });
  expect(flag).toBeTruthy();
});

test("test chooseRandomShot matches getShots", () => {
  const board = Gameboard();
  const ai = player("ai", board);
  const shot = ai.chooseRandomShot();
  console.log(shot);
  console.log(ai.getShots());
  expect(ai.getShots()[0]).toEqual(shot);
});