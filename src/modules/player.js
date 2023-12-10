/*
 *
 * Players can take turns playing the game by attacking the enemy Gameboard.
 * The game is played against the computer, so make the ‘computer’ capable of making random plays. 
 * The AI does not have to be smart, but it should know whether or not a given move is legal
 *  (i.e. it shouldn’t shoot the same coordinate twice).
 *   
 */


const player = (name) => {
  const playerName = name;
    
  const getPlayerName = () => playerName;

  return { getPlayerName, };
};




const computer = () => {
  const shots = [];
  
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

  return { getShots, chooseRandomShot, };
};

const c = computer();
console.log(c.chooseRandomShot());
// console.log(c.chooseRandomShot());

// console.log(c.getShots());