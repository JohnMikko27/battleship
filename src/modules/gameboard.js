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
   
    shipsCoordinates.push({row, column, ship}); 
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
        const obj = shipsCoordinates[i];
        if (row === obj.row && (column >= obj.column && column < obj.column + obj.ship.getLength())) {
          gameboard[row][column] = "x";
          obj.ship.hit();
        }
      }
    } else missedAttacks.push([row, column]);
  };

  const areAllShipsSunk = () => {
    let shipsSunk = 0;
    // see if you can change this to a reduce function
    shipsSunk = shipsCoordinates.reduce( (acc, cur) => {
      if (cur.ship.isSunk()) return acc + 1;
      return acc + 0;
    }, 0);
    
    
    // for (let i = 0; i < shipsCoordinates.length; i++) {
    //   if (shipsCoordinates[i].ship.isSunk()) {
    //     shipsSunk++;
    //   }
    // }
    console.log(shipsSunk);
    return shipsSunk === shipsCoordinates.length;
  };

  return { getGameboard, placeShip, printGameboard, receiveAttack, getMissedAttacks, areAllShipsSunk };
}

// import Ship from "./ship.js";
// const g = Gameboard();
// const ship1 = Ship(3);
// const ship2 = Ship(3);

// g.placeShip(3, 3, ship1);
// g.placeShip(4, 3, ship2);

// g.printGameboard();
// g.receiveAttack(3,4);
// g.receiveAttack(3,3);
// g.receiveAttack(3,5);
// g.receiveAttack(3,6);
// g.receiveAttack(6,9);

// g.receiveAttack(4,3);
// g.receiveAttack(4,4);
// g.receiveAttack(4,5);


// g.printGameboard();
// console.log(ship1.isSunk());
// console.log(ship2.isSunk());

// console.log(g.getMissedAttacks());
// console.log(g.areAllShipsSunk());