import Ship from "./ship.js";

const player = (name, gameboard) => {
  const playerName = name;
  const board = gameboard;
  const shots = [];

  const getPlayerName = () => playerName;
  const getBoard = () => board;
  const getShots = () => shots;

  const hasShotCoordsBefore = (row, column) => {
    let flag = false;
    shots.forEach((shot) => {
      if (shot[0] === row && shot[1] === column) {
        flag =  true;
      };
    });
    return flag;
  };
  
  const chooseRandomShot = () => {
    let returnValue;
    const row = Math.round(Math.random() * 10);
    const column = Math.round(Math.random() * 10);
    
    if (!hasShotCoordsBefore(row, column)) {
      shots.push([row, column]);
      returnValue = [row, column];
    }
    return returnValue;
  };

  const getRandomShipPlacements = () => {
    
    const ship1 = Ship(4);
    const ship2 = Ship(4);
    // const ship3 = Ship(4);

    const shipCoords = [
      {row: 1, column: 3, ship: ship1}, 
      {row: 2, column: 4, ship: ship2}, 
      // {row: 3, column: 5, ship: ship3}, 
    ];
    return shipCoords;
  };

  return { getPlayerName, getBoard, getShots, chooseRandomShot, getRandomShipPlacements };
};
// const ship1 = Ship(4);
// const ship2 = Ship(2);
// const ship3 = Ship(3);
// const ship4 = Ship(4);

// const ships = [ship1, ship2, ship3, ship4];
// console.log(ships[2].getLength());
export default player;