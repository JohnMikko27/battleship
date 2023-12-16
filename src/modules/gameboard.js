import Ship from "./ship.js";

const Gameboard = () => {
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
  
  // how do i make it so that ships won't overlap and ships won't go out of board?
  // to make ships not overlap, since we're only doing things horizontally, 
  // if row is in shipsCoordinates check if column is greater than that corresponding column and less than column + ship length
  // if it is then that is an invalid row/column
  // to make ships not go out of board, 
  // if column (since ships are only going horizontally) + ship length > 10 (which is the length of board) 
  // then say something about how it's invalid
  // and what do i do if i do get row/column/ship length that are invalid? 
  // maybe worry about this later, because it's not that urgent
  // maybe refactor it in a way where only valid coordinates are given?
  // maybe this is a function for drag and drop?
  const placeShip = (row, column, ship) => {
    for (let i = 0; i < ship.getLength(); i++) {
      // "o" means there is a ship/part of a ship on those coords
      gameboard[row][column+i] = "o";
    }
    shipsCoordinates.push({row, column, ship}); 
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
    } else {
      missedAttacks.push([row, column]);
      gameboard[row][column] = "m";
    }
  };

  const areAllShipsSunk = () => {
    let shipsSunk = 0;
    shipsSunk = shipsCoordinates.reduce( (acc, cur) => {
      if (cur.ship.isSunk()) return acc + 1;
      return acc + 0;
    }, 0);
    
    return shipsSunk === shipsCoordinates.length;
  };

  const hasShotCoordsBefore = (row, column) => {
    let flag = false;
    if (gameboard[row][column] === "m" || gameboard[row][column] === "x") flag = true;
    return flag;
  };

  const getRandomShipPlacements = () => {
    const shipCoords = [];
    let i = 0;
    while (i < 4) {
      let flag = false;
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const ship = Ship(i+2);
      // maybe check if column + ship length is greater than 10 here already so we can just continue
      shipCoords.forEach(el => {
        if (row === el.row && (column >= el.column && column < (el.column + el.ship.getLength()))) {
          flag = true;
        } else if (row === el.row) {
          for (let k = 0; k < ship.getLength(); k++) {
            const newColumn = column;
            if (((newColumn + k + 1) >= el.column) && ((newColumn + k + 1) < (el.column + el.ship.getLength()))) flag = true;
          }
        } 
      });
      if (flag || column + ship.getLength() > 10) {
        flag = false;
        // i++;
      } else {
        shipCoords.push({row, column, ship});
        i++;
      }
    }
    return shipCoords;
  };

  const placeAiShips = () => {
    const shipArr = getRandomShipPlacements();
    shipArr.forEach(obj => placeShip(obj.row, obj.column, obj.ship));
  };

  return { createGameboard, getGameboard, placeShip, receiveAttack, 
    getMissedAttacks, areAllShipsSunk, hasShotCoordsBefore, placeAiShips };
};

export default Gameboard;