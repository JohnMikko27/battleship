// if a message has no side effect, then don't test it because it changes nothing!!!
// test incoming queries by asserting (making sure it sends correct) results
// test incoming commands by asserting direct public side effects
// test outgoing commands by "expect to send outgoing command messages"

import Gameboard from "../modules/gameboard.js";
import Ship from "../modules/ship.js";

let gameboard;
let ship;

beforeEach(() => {
  gameboard = Gameboard();
  ship = Ship(4);
  gameboard.placeShip(1, 2, ship);
});

test("create gameboard", () => {
  gameboard.createGameboard();
  expect(gameboard.getGameboard()[0][0]).toBe("-");
});

test("test the placement of ship", () => {
  expect(gameboard.getGameboard()[1][2]).toBe("o");
  expect(gameboard.getGameboard()[1][3]).toBe("o");
  expect(gameboard.getGameboard()[1][4]).toBe("o");
  expect(gameboard.getGameboard()[1][5]).toBe("o");
});

test("test receiveAttack on ship" , () => {
  gameboard.receiveAttack(1, 2);
  expect(ship.getNumOfHits()).toBe(1);
});

test("test missed hit on receiveAttack", () => {
  gameboard.receiveAttack(7,8);
  expect(ship.getNumOfHits()).toBe(0);
  expect(gameboard.getMissedAttacks()).toContainEqual([7,8]);
});

test("test if all ships sunk", () => {
  gameboard.receiveAttack(1,2);
  gameboard.receiveAttack(1,3);
  gameboard.receiveAttack(1,4);
  gameboard.receiveAttack(1,5);
  expect(gameboard.areAllShipsSunk()).toBeTruthy();
});

// maybe change this name
test("test hasShotCoordsBefore", () => {
  // it should return true or false
  gameboard.receiveAttack(9,9);
  expect(gameboard.hasShotCoordsBefore(9,9)).toBeTruthy();
});

// add an isValidCoords function

test("test isValidCoords out of board", () => {
  expect(gameboard.isValidCoords(9,9, ship)).toBeFalsy();
});