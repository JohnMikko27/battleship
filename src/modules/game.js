import player from "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import displayPlayerGameboard from "./ui.js";

const Game = (() => {
  let player1;
  let player2;
  let gameboard1;
  let gameboard2;
  let activePlayer;
  let opposingPlayer;

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;
  // will probably have to add name parameters later so that players can set their names
  const createNewGame = () => {
    gameboard1 = Gameboard();
    gameboard2 = Gameboard();
    player1 = player("John", gameboard1);
    player2 = player("ai", gameboard2);
    // player2.getBoard().receiveAttack(0,9);
    activePlayer = player1;
    opposingPlayer = player2;
    // might need to display the boards here instead of calling somewhere else
  };
  
  const switchActivePlayer = () => {
    if (activePlayer === player1) {
      activePlayer = player2;
      opposingPlayer = player1;
    } else {
      activePlayer = player1;
      opposingPlayer = player2;
    }
  };

  createNewGame();
  const ship1 = Ship(3);
  const ship2 = Ship(3);
  gameboard1.placeShip(0, 0, ship1);
  gameboard1.placeShip(1, 0, ship2);


  const ship3 = Ship(3);
  const ship4 = Ship(3);
  gameboard2.placeShip(0, 0, ship3);
  gameboard2.placeShip(2, 0, ship4);

  // maybe i can refactor this, i can add an eventListener for each cell, 
  // but it will only receive attack, and display player gameboard if it's that person's turn
  // instead of adding an eventListener again
  // but i might need to keep it like this because display the board removes the eventlisteners
  const playGame = () => {
    let cells;

    
    if (activePlayer === player1) {
      cells = document.querySelectorAll("#right .cell");
      cells.forEach(cell => cell.addEventListener("click", (e) => {
        console.log(e.target.dataset.row, e.target.dataset.column);

        // to make sure that we can't choose the same coordinates
        // i should have a function that checks player1.gameboard and gets all the coordinates that have been shot
        // if the e.dataset.row/col match that, then just run playGame again (add a display later)
        // should i create a coordinatesShot array in gameboard? to keep track of all the cooridinates that have been shot
        // or just a function hasShotCoords before that just checks the gameboard's element at that coord
        // if it's "m" or "x" that means it has been shot before 
        if (opposingPlayer.getBoard().hasShotCoordsBefore(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10))) {
          console.log("has shot their before");
          return;
        }

        opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));
        displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());

        if (opposingPlayer.getBoard().areAllShipsSunk()) console.log(`all ships are sunk for player ${opposingPlayer.getPlayerName()}`);
        switchActivePlayer();
        playGame();
      }));
    }

    // so chooseRandomShot can go outside the board, gotta fix that
    else {
      cells = document.querySelectorAll("#left .cell");
      const shot = activePlayer.chooseRandomShot();
      opposingPlayer.getBoard().receiveAttack(shot[0], shot[1]);
      displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());
      switchActivePlayer();
      playGame();
    }

  };

  return { createNewGame, getPlayer1, getPlayer2, playGame };
})();

export default Game;

// now i have a both boards working with the receiveAttack, placeShip, and allShipsSunk functions
// now i need to make ai place its ships randomly
// i probably also need to refactor placeships and make sure that it only takes valid coordinates
// how do i make placeShips know if its a valid coordinate
// maybe if coordinates is in ships coordinates, then return???
// after i get ai to place its ships randomly, i need to check the gameboard functions
