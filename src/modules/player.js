/*
 *
 * Players can take turns playing the game by attacking the enemy Gameboard.
 * The game is played against the computer, so make the ‘computer’ capable of making random plays. 
 * The AI does not have to be smart, but it should know whether or not a given move is legal
 *  (i.e. it shouldn’t shoot the same coordinate twice).
 *   
 */

// should i refactor computer? both computers and players will just be created from a player factory
// and that player factory will have all the methods that it has right now
const player = (name, gameboard) => {
  const playerName = name;
  const board = gameboard;
  const shots = [];

  const getPlayerName = () => playerName;
  const getBoard = () => board;
  const getShots = () => shots;

  const hasShotBefore = (row, column) => {
    let flag = false;
    shots.forEach((shot) => {
      if (shot[0] === row && shot[1] === column) {
        flag =  true;
      };
    });
    return flag;
  };
  
  const chooseRandomShot = () => {
    let returnValue = null;
    const row = Math.round(Math.random() * 10);
    const column = Math.round(Math.random() * 10);
    
    if (!hasShotBefore(row, column)) {
      shots.push([row, column]);
      returnValue = { row, column };
    }
    return returnValue;
  };

  return { getPlayerName, getBoard, getShots, chooseRandomShot, };
};

// might need a placeAllships at random places function, or should this be in gameboard?
// const computer = () => {
//   const shots = [];
  
//   const getShots = () => shots;

//   const hasShotBefore = (row, column) => {
//     let flag = false;
//     shots.forEach((shot) => {
//       if (shot[0] === row && shot[1] === column) {
//         flag =  true;
//       };
//     });
//     return flag;
//   };
  
//   const chooseRandomShot = () => {
//     let returnValue = null;
//     const row = Math.round(Math.random() * 10);
//     const column = Math.round(Math.random() * 10);
    
//     if (!hasShotBefore(row, column)) {
//       shots.push([row, column]);
//       returnValue = { row, column };
//     }
//     return returnValue;
//   };

//   return { getShots, chooseRandomShot, };
// };


// console.log(c.chooseRandomShot());

// console.log(c.getShots());
export default player;