//  if player.getName is ai, then set parent container to be right, if not then left
const displayPlayerGameboard = (player, gameboard) => {
  let parentContainer;
  if (player.getPlayerName() === "ai") parentContainer = document.querySelector("#right");
  else parentContainer = document.querySelector("#left");
 
  // clears it first then adds the gameboard to prevent duplication
  parentContainer.textContent = "";
  for (let i = 0; i < gameboard.getGameboard().length; i++) {
    const row = document.createElement("div");
    const rowNum = i;
    row.classList.add("row");
    for (let j = 0; j < gameboard.getGameboard()[i].length; j++) {
      const columnNum = j;
      // check if each gameboard[i][j] cell has a ship, has a missed attack, or has hit a ship
      // if so i could add different classes to differentiate the cell from different cells
      const cell = document.createElement("div");

      if (gameboard.getGameboard()[i][j] === "x") cell.textContent = "x";
      else if (gameboard.getGameboard()[i][j] === "o") cell.textContent = "o";
      else if (gameboard.getGameboard()[i][j] === "m") cell.textContent = "m";
        
      cell.dataset.row = rowNum;
      cell.dataset.column = columnNum;
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    parentContainer.appendChild(row);
  }
};

// instructions didn't actullay say to use an array for keeping track of missedShtos
// might need to refactor gameboard.receiveAttack, mayeb make it so that initially everything is just a "-"
// when a ship is placed on a coordinate change it to a "o" and if a ship is it change to a "x"
// and if a coordinate that is not a ship is hit change to "m"
// so that when we display the board, we can get each individual element of the 2d board, check the value,
// and change it accordingly

// i should have a function that adds an eventListener to each cell
// I need to utilize shipCoordinates and missedAttacks, 
// if player clicked on a cell that has the same row and column as a ship, add a ship-hit style or something
// if player clicked on a cell that has no ships, add a style called noHit or something
// i should also have a function that removes that eventListener 
// so that when it's not that player's turn, then they won't be able to make a shot


export default displayPlayerGameboard;
// export { displayPlayerGameboard, };