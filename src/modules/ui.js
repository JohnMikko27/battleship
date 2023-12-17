let shipLength;

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
      const cell = document.createElement("div");

      cell.dataset.row = rowNum;
      cell.dataset.column = columnNum;

      if (gameboard.getGameboard()[i][j] === "x") cell.textContent = "x";
      else if (gameboard.getGameboard()[i][j] === "o") {
        cell.textContent = "o";
      }
      else if (gameboard.getGameboard()[i][j] === "m") cell.textContent = "m";
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    parentContainer.appendChild(row);
  }
};

const createEndGameDisplay = (winner, cb) => {
  const displayContainer = document.createElement("div");
  const winnerDisplay = document.createElement("div");
  const playAgain = document.createElement("button");

  winnerDisplay.textContent = `${winner} has won!`;
  playAgain.textContent = "Play Again";
  playAgain.addEventListener("click", () => {
    cb();
    const lastChild = document.querySelector("body > div:last-child");
    document.body.removeChild(lastChild);
    document.body.classList.remove("blur");
  });

  displayContainer.setAttribute("id", "end-game-display");

  displayContainer.appendChild(winnerDisplay);
  displayContainer.appendChild(playAgain);

  return displayContainer;
};

const displayEndGameDisplay = (winner, cb) => {
  const body = document.querySelector("body");
  const endGameDisplay = createEndGameDisplay(winner, cb);
  
  body.classList.add("blur");
  endGameDisplay.classList.remove("blur");
  body.appendChild(endGameDisplay);
};

const createModal = (gameboard) => {
  const modal = document.createElement("div");
  const message = document.createElement("h2");
  const boardContainer = document.createElement("div");
  const shipsContainer = document.createElement("div");

  message.textContent = "Place Your Ships";

  for (let i = 0; i < gameboard.getGameboard().length; i++) {
    const row = document.createElement("div");
    const rowNum = i;
    row.classList.add("row");
    for (let j = 0; j < gameboard.getGameboard()[i].length; j++) {
      const columnNum = j;
      const cell = document.createElement("div");

      cell.dataset.row = rowNum;
      cell.dataset.column = columnNum;

      if (gameboard.getGameboard()[i][j] === "x") cell.textContent = "x";
      else if (gameboard.getGameboard()[i][j] === "o") cell.textContent = "o";
      else if (gameboard.getGameboard()[i][j] === "m") cell.textContent = "m";
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    boardContainer.appendChild(row);
  }

  for (let i = 0; i < 4; i++) {
    const ship = document.createElement("div");
    ship.classList.add("ship");
    for (let j = 0; j <= i+1; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      ship.appendChild(cell);
    }
    shipsContainer.appendChild(ship);
  }
  shipsContainer.setAttribute("id", "ships-container");
  modal.setAttribute("id", "modal");

  modal.appendChild(message);
  modal.appendChild(boardContainer);
  modal.appendChild(shipsContainer);
  return modal;
};

const displayModal = (gameboard) => {
  const modal = createModal(gameboard);
  document.body.appendChild(modal);
};

// const dragStartEventHandler = (e, gameboard) => {
//   // e.dataTransfer.setData('text/plain', )
//   // maybe use e.dataTransfer.setData to transfer the data of the length the ship??
//   // maybe use that function to get the length of the ship, and maybe have cell.addEventListener in display function
//   // so when dragStarts, we just call this function and it will return the correct length of the ship
//   // maybe we could have a global variable and it will just change that global variable
//   // so that when they start dragging the ship, we can have the correct length of the ship being dragged
//   console.log("drag start");
//   console.log(e.target.dataset.row, e.target.dataset.column);
//   const row = parseInt(e.target.dataset.row, 10);
//   const column = parseInt(e.target.dataset.column, 10);
//   for (let i = 0; i < gameboard.getShipsCoordinates().length; i++) {
//     if (gameboard.getShipsCoordinates()[i].row === row && (column >= gameboard.getShipsCoordinates()[i].column && (column < (gameboard.getShipsCoordinates()[i].column + gameboard.getShipsCoordinates()[i].ship.getLength())))) {
//       shipLength = gameboard.getShipsCoordinates()[i].ship.getLength();
//       console.log(shipLength);
//       e.dataTransfer.setData("text/plain", e.target.textContent);
//     }
//   }
// };

// const dragEventHandler = (e) => {
//   console.log("dragged");
//   // maybe refactor displayGamboard function
//   // i don't necessarily need to loop through each cell on the board, 
//   // but if i don't loop through each cell on the board, 
//   // then i would have to already have a 10x10 board, 
//   // and i would just place/style individual cells that are ship parts

//   // or maybe for each individual cell representing a part of a ship, 
//   // add a class like ship.${shiplength} to each of those individual parts, 
//   // then when we drag start, 
//   // we could select all those individual ship parts (maybe?) and use the dataTransfer.setData function on it?

//   // or maybe we could get the default image shown and multiply it or something
// };

// const dropEventHandler = (e) => {
//   e.preventDefault();
//   console.log("dropped");
//   const data = e.dataTransfer.getData("text/plain");
//   e.target.textContent = data;
// };

export { displayPlayerGameboard, displayEndGameDisplay, displayModal };

// according to webdev simplified's video, there are drag and drop events, so i should be able to drag
// the ships and drop them in the container
// so i need to know how i can differentiate each individual ship
// maybe i can only drag and drop after clicking each ship once, 
// so clicking it once allows for drag and drop
// and that click will identify the ship by going through the ship coords and identifying which element it is
// and then when they're dragging and about to drop, it should check if it is a valid coord
// if it is then drop it, if not then put the ship back to where it was

// when im trying to drag and drop, to be able to 'drag' and 'drop' the ship, once i click/start dragging
// it should find the right ship in the ship coords
// so that when i drop it, it will display correctly; it will display the correct ship length
// once i find the right ship length from starting the drag
// while dragging it over, i should be check if it is a valid coordinate, only then can it be dropped
// once it's dropped it should just change the correct element from the array, change the row/column
// and then since we're validing coords and placing ship, it should place it correctly

// use setDragImage function to make it look like you're draggint the whole thing
// i first need to understand each drag/drop event and then figure out what i need to put in each of those

// look at my notes on notebook, I got the dragstart done now i think
// i should implement showing all the ship being dragged but rn
// or maybe i do need to use the dataTransfer.setData so that it knows how 'long' the ship is?
// i can just focus on first dropping the thing i am dragging, it might be easier later on if i do this first

// from drag and drop mdn docs
// Each DataTransfer object contains an items property, 
// which is a list of DataTransferItem objects. 
// A DataTransferItem object represents a single drag item, each with a kind property (either string or file) 
// and a type property for the data item's MIME type. 
// The DataTransferItem object also has methods to get the drag item's data.