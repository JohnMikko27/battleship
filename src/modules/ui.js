// need a function that gets a gameboard and displays where the ships are and where it has been hit

const displayPlayerGameboard = (gameboard) => {
  const left = document.querySelector("#left");
  // clears it first then adds the gameboard to prevent duplication
  left.textContent = "";
  for (let i = 0; i < gameboard.getGameboard().length; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < gameboard.getGameboard()[i].length; j++) {
      // check if each gameboard[i][j] cell has a ship, has a missed attack, or has hit a ship
      // if so i could add different classes to differentiate the cell from different cells
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    left.appendChild(row);
  }
};



export default displayPlayerGameboard;
// export { displayPlayerGameboard, };