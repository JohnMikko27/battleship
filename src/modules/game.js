import player from "./player";
import Gameboard from "./gameboard";
import Ship from "./ship";
import displayPlayerGameboard from "./ui";

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
    // add an eventListener for each cell in the opposing (not active player) board
    if (activePlayer === player1) {
      const cells = document.querySelectorAll("#right .cell");
      cells.forEach(cell => cell.addEventListener("click", (e) => {
        console.log(e.target.dataset.row, e.target.dataset.column);
        opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));
        displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());
        switchActivePlayer();
        playGame();
        // so now I can receiveAttack on the board and display it correctly,
        // now, I need to remove the eventListeners and switch the activeplayers
        // and then run playGame()
      }));
    } else if (activePlayer === player2) {
      const cells = document.querySelectorAll("#left .cell");
      cells.forEach(cell => cell.addEventListener("click", (e) => {
        console.log(e.target.dataset.row, e.target.dataset.column);
        opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));
        displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());
        switchActivePlayer();
        playGame();
      }));
    }
  };

  return { createNewGame, getPlayer1, getPlayer2, playGame };
})();

export default Game;

// NOW I NEED TO CHECK IF ALL SHIPS ARE SUNK AND END THE GAME AND DISPLAY THE WINNER