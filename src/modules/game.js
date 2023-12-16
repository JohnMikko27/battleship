import player from "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import { displayPlayerGameboard, displayEndGameDisplay} from "./ui.js";

const Game = (() => {
  let player1;
  let player2;
  let gameboard1;
  let gameboard2;
  let activePlayer;
  let opposingPlayer;

  const createNewGame = () => {
    gameboard1 = Gameboard();
    gameboard2 = Gameboard();
    player1 = player("John", gameboard1);
    player2 = player("ai", gameboard2);
    activePlayer = player1;
    opposingPlayer = player2;

    // test
    const ship1 = Ship(3);
    const ship2 = Ship(3);
    gameboard1.placeShip(0, 0, ship1);
    gameboard1.placeShip(1, 0, ship2);
    gameboard2.placeAiShips();

    displayPlayerGameboard(player1, gameboard1);
    displayPlayerGameboard(player2, gameboard2);

    const startGame = document.querySelector("button");
    // eslint-disable-next-line no-use-before-define
    startGame.addEventListener("click", playGame);
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

  const playGame = () => {
    if (activePlayer === player1) {
      const cells = document.querySelectorAll("#right .cell");
      // eslint-disable-next-line prefer-arrow-callback
      cells.forEach(cell => cell.addEventListener("click", function eventHandler(e) {
        console.log(e.target.dataset.row, e.target.dataset.column);

        if (opposingPlayer.getBoard().hasShotCoordsBefore(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10))) {
          console.log("has shot there before");
          return;
        }
        
        opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));
        displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());

        if (opposingPlayer.getBoard().areAllShipsSunk()) {
          console.log(`all ships are sunk for player ${opposingPlayer.getPlayerName()}`);
          // add some end game stuff
          displayEndGameDisplay(activePlayer.getPlayerName(), createNewGame);
          // eslint-disable-next-line no-shadow
          cells.forEach(cell => cell.removeEventListener("click", eventHandler));
          return;
        }
        
        // displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());
        switchActivePlayer();
        playGame();
      }));
    } 
    
    else {
      const shot = activePlayer.chooseRandomShot();
      opposingPlayer.getBoard().receiveAttack(shot[0], shot[1]);
      displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());
    
      if (opposingPlayer.getBoard().areAllShipsSunk()) {
        console.log(`all ships are sunk for playermikko ${opposingPlayer.getPlayerName()}`);
        // add some end game stuff
        displayEndGameDisplay(activePlayer.getPlayerName(), createNewGame);
      }
      switchActivePlayer();
      playGame();
    }
  };

  return { createNewGame, playGame };
})();

export default Game;

// maybe when i implement drag and drop, i can have a function that checks if the ship will overlap/go out of board
// if that's true then dont' place else place it
// maybe if coordinates is in ships coordinates, then return???
// after i get ai to place its ships randomly, i need to check the gameboard functions
// now i can create a new game on load, then start a game if i hit button, then i can end the game after someone wins

// so the plan is to intially display both player and ai boards, 
// then have a start game button where they can start game
// but before that the player has preplaced ships on their board and can drag and drop them to anywhere they want
// so i need to be able to implement drag and drop
// i can create a isValidCoordinates function that checks if a coordinate is valid, 
// i can check if it's valid by using the conditionals in getRandomShipPlacements function
// if it is valid,
// then i need to place the ship at that coordinate