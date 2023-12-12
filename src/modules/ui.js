// need a function that gets a gameboard and displays where the ships are and where it has been hit

const displayPlayerGameboard = (gameboard) => {
  const left = document.querySelector("#left");
  // clears it first then adds the gameboard to prevent duplication
  left.textContent = "";
  for (let i = 0; i < gameboard.getGameboard().length; i++) {
    const row = document.createElement("div");
    const rowNum = i;
    let columnNum = 0;
    row.classList.add("row");
    for (let j = 0; j < gameboard.getGameboard()[i].length; j++) {
      columnNum = j;
      // check if each gameboard[i][j] cell has a ship, has a missed attack, or has hit a ship
      // if so i could add different classes to differentiate the cell from different cells
      const cell = document.createElement("div");
      cell.dataset.row = rowNum;
      cell.dataset.column = columnNum;
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    left.appendChild(row);
  }
};

// i should have a function that adds an eventListener to each cell
// I need to utilize shipCoordinates and missedAttacks, 
// if player clicked on a cell that has the same row and column as a ship, add a ship-hit style or something
// if player clicked on a cell that has no ships, add a style called noHit or something
// bc whats the point of missedShots array or ship coordinates if i just use "o"s and "x"s to identify them
// i should also have a function that removes that eventListener 
// so that when it's not that player's turn, then they won't be able to make a shot


export default displayPlayerGameboard;
// export { displayPlayerGameboard, };