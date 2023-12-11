import Ship from "../modules/ship";

let ship;
let ship2;

beforeEach(() => {
  ship = Ship(4);
  ship2 = Ship(1);
});

test("get number of times hit", () => {
  ship.hit();
  expect(ship.getNumOfHits()).toBe(1);
});

test("check if ship isSunk", () => {
  ship2.hit();
  expect(ship2.isSunk()).toBeTruthy();
});

test("check if ship is not sunk", () => {
  expect(ship.isSunk()).toBeFalsy();
});

