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


  gameboard2.placeAiShips();

  // maybe i can refactor this, i can add an eventListener for each cell, 
  // but it will only receive attack, and display player gameboard if it's that person's turn
  // instead of adding an eventListener again
  // but i might need to keep it like this because display the board removes the eventlisteners
  const playGame = () => {
    if (activePlayer === player1) {
      const cells = document.querySelectorAll("#right .cell");
      cells.forEach(cell => cell.addEventListener("click", (e) => {
        console.log(e.target.dataset.row, e.target.dataset.column);

        if (opposingPlayer.getBoard().hasShotCoordsBefore(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10))) {
          console.log("has shot there before");
          return;
        }
        
        opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));

        if (opposingPlayer.getBoard().areAllShipsSunk()) {
          console.log(`all ships are sunk for player ${opposingPlayer.getPlayerName()}`);
          // add some end game stuff
        }

        displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());
        switchActivePlayer();
        playGame();
      }));
    } 
    
    else {
      const shot = activePlayer.chooseRandomShot();
      opposingPlayer.getBoard().receiveAttack(shot[0], shot[1]);
      if (opposingPlayer.getBoard().areAllShipsSunk()) {
        console.log(`all ships are sunk for playermikko ${opposingPlayer.getPlayerName()}`);
        // add some end game stuff
      }
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
