// import Ship from "./ship.js";

export default function Gameboard() {
  const gameboard = [];
  const shipsCoordinates = [];
  const missedAttacks = [];

  const getGameboard = () => gameboard;

  const getMissedAttacks = () => missedAttacks;

  const createGameboard = () => {
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push("-");
      }
      gameboard.push(row);
    }
  };
  createGameboard();

  // need to add conditionals to check if ships go out of page
  // also for rn, ships are only placed horizontally
  const placeShip = (row, column, ship) => {
    for (let i = 0; i < ship.getLength(); i++) {
      gameboard[row][column+i] = "o";
    }
    // maybe add them as objects?
    shipsCoordinates.push([row, column, ship]);
  };

  // for visualization purposes
  const printGameboard = () => {
    let result = "";
    gameboard.forEach((row) => {
      row.forEach((element) => {
        result += element;
      });
      console.log(result);
      result = "";
    });
  };

  const receiveAttack = (row, column) => {
    if (gameboard[row][column] === "o") {
      for (let i = 0; i < shipsCoordinates.length; i++) {
        const arr = shipsCoordinates[i];
        if (row === arr[0] && (column >= arr[1] && column < arr[1] + arr[2].getLength())) {
          gameboard[row][column] = "x";
          arr[2].hit();
        }
      }
    } else missedAttacks.push([row, column]);
  };

  const areAllShipsSunk = () => {
    let shipsSunk = 0;
    // see if you can change this to a reduce function
    for (let i = 0; i < shipsCoordinates.length; i++) {
      if (shipsCoordinates[i][2].isSunk()) {
        shipsSunk++;
      }
    }
    return shipsSunk === shipsCoordinates.length;
  };

  return { getGameboard, placeShip, printGameboard, receiveAttack, getMissedAttacks, areAllShipsSunk };
}


// const g = Gameboard();
// const ship1 = Ship();
// const ship2 = Ship();
// ship1.setLengthOfShip(3);
// ship2.setLengthOfShip(3);

// g.placeShip(3, 3, ship1);
// g.placeShip(4, 3, ship2);

// g.printGameboard();
// g.receiveAttack(3,4);
// g.receiveAttack(3,3);
// g.receiveAttack(3,5);
// g.receiveAttack(3,6);

// g.printGameboard();
// console.log(ship1.isSunk());
// console.log(g.getMissedAttacks());
// console.log(g.areAllShipsSunk());