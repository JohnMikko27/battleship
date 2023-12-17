/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/modules/player.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard.js */ "./src/modules/gameboard.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship.js */ "./src/modules/ship.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui.js */ "./src/modules/ui.js");





const Game = (() => {
  let player1;
  let player2;
  let gameboard1;
  let gameboard2;
  let activePlayer;
  let opposingPlayer;

  const createNewGame = () => {
    gameboard1 = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    gameboard2 = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    player1 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("John", gameboard1);
    player2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("ai", gameboard2);
    activePlayer = player1;
    opposingPlayer = player2;

    // test
    const ship4 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(5);
    const ship3 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(4);
    const ship2 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
    const ship1 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(2);

    gameboard1.placeShip(0, 0, ship1);
    gameboard1.placeShip(1, 0, ship2);
    gameboard1.placeShip(8, 6, ship3);
    gameboard1.placeShip(6, 4, ship4);

    gameboard2.placeAiShips();

    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(player1, gameboard1);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(player2, gameboard2);
    // displayModal(gameboard1);
    const startGame = document.querySelector("button");
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
        (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(opposingPlayer, opposingPlayer.getBoard());

        if (opposingPlayer.getBoard().areAllShipsSunk()) {
          console.log(`all ships are sunk for player ${opposingPlayer.getPlayerName()}`);
          // add some end game stuff
          (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayEndGameDisplay)(activePlayer.getPlayerName(), createNewGame);
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
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(opposingPlayer, opposingPlayer.getBoard());
    
      if (opposingPlayer.getBoard().areAllShipsSunk()) {
        console.log(`all ships are sunk for playermikko ${opposingPlayer.getPlayerName()}`);
        // add some end game stuff
        (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayEndGameDisplay)(activePlayer.getPlayerName(), createNewGame);
      }
      switchActivePlayer();
      playGame();
    }
  };

  return { createNewGame, playGame };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

// maybe when i implement drag and drop, i can have a function that checks if the ship will overlap/go out of board
// if that's true then dont' place else place it
// maybe if coordinates is in ships coordinates, then return???
// after i get ai to place its ships randomly, i need to check the gameboard functions
// now i can create a new game on load, then start a game if i hit button, then i can end the game after someone wins

// so the plan is to intially display both player and ai boards, 
// then have a start game button where they can start game
// but before that the player has preplaced ships on their board and can drag and drop them to anywhere they want
// so i need to be able to implement drag and drop
// i need to be able to differentiate/individualize each ship so that when i try to drag one, 
// the whole ships follows and not just a part of the ship
// i can create a isValidCoordinates function that checks if a coordinate is valid, 
// i can check if it's valid by using the conditionals in getRandomShipPlacements function
// if it is valid,
// then i need to place the ship at that coordinate



/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/modules/ship.js");


const Gameboard = () => {
  const gameboard = [];
  const shipsCoordinates = [];
  const missedAttacks = [];

  const getGameboard = () => gameboard;
  const getShipsCoordinates = () => shipsCoordinates;
  const getMissedAttacks = () => missedAttacks;

  const createGameboard = () => {
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push("-");
      }
      gameboard.push(row);
    }
  };
  createGameboard();
  
  // how do i make it so that ships won't overlap and ships won't go out of board?
  // to make ships not overlap, since we're only doing things horizontally, 
  // if row is in shipsCoordinates check if column is greater than that corresponding column and less than column + ship length
  // if it is then that is an invalid row/column
  // to make ships not go out of board, 
  // if column (since ships are only going horizontally) + ship length > 10 (which is the length of board) 
  // then say something about how it's invalid
  // and what do i do if i do get row/column/ship length that are invalid? 
  // maybe worry about this later, because it's not that urgent
  // maybe refactor it in a way where only valid coordinates are given?
  // maybe this is a function for drag and drop?
  const placeShip = (row, column, ship) => {
    for (let i = 0; i < ship.getLength(); i++) {
      // "o" means there is a ship/part of a ship on those coords
      gameboard[row][column+i] = "o";
    }
    shipsCoordinates.push({row, column, ship}); 
  };

  const receiveAttack = (row, column) => {
    if (gameboard[row][column] === "o") {
      for (let i = 0; i < shipsCoordinates.length; i++) {
        const obj = shipsCoordinates[i];
        if (row === obj.row && (column >= obj.column && column < obj.column + obj.ship.getLength())) {
          gameboard[row][column] = "x";
          obj.ship.hit();
        }
      }
    } else {
      missedAttacks.push([row, column]);
      gameboard[row][column] = "m";
    }
  };

  const areAllShipsSunk = () => {
    let shipsSunk = 0;
    shipsSunk = shipsCoordinates.reduce( (acc, cur) => {
      if (cur.ship.isSunk()) return acc + 1;
      return acc + 0;
    }, 0);
    
    return shipsSunk === shipsCoordinates.length;
  };

  const hasShotCoordsBefore = (row, column) => {
    let flag = false;
    if (gameboard[row][column] === "m" || gameboard[row][column] === "x") flag = true;
    return flag;
  };

  const getRandomShipPlacements = () => {
    const shipCoords = [];
    let i = 0;
    while (i < 4) {
      let flag = false;
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const ship = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i+2);
      // maybe check if column + ship length is greater than 10 here already so we can just continue
      shipCoords.forEach(el => {
        if (row === el.row && (column >= el.column && column < (el.column + el.ship.getLength()))) {
          flag = true;
        } else if (row === el.row) {
          for (let k = 0; k < ship.getLength(); k++) {
            const newColumn = column;
            if (((newColumn + k + 1) >= el.column) && ((newColumn + k + 1) < (el.column + el.ship.getLength()))) flag = true;
          }
        } 
      });
      if (flag || column + ship.getLength() > 10) {
        flag = false;
        // i++;
      } else {
        shipCoords.push({row, column, ship});
        i++;
      }
    }
    return shipCoords;
  };

  const placeAiShips = () => {
    const shipArr = getRandomShipPlacements();
    shipArr.forEach(obj => placeShip(obj.row, obj.column, obj.ship));
  };

  return { createGameboard, getGameboard, placeShip, receiveAttack, 
    getMissedAttacks, areAllShipsSunk, hasShotCoordsBefore, placeAiShips, getShipsCoordinates };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const player = (name, gameboard) => {
  const playerName = name;
  const board = gameboard;
  const shots = [];

  const getPlayerName = () => playerName;
  const getBoard = () => board;
  const getShots = () => shots;

  const hasShotCoordsBefore = (row, column) => {
    let flag = false;
    shots.forEach((shot) => {
      if (shot[0] === row && shot[1] === column) {
        flag =  true;
      };
    });
    return flag;
  };
  
  const chooseRandomShot = () => {
    let returnValue;
    const row = Math.floor(Math.random() * 10);
    const column = Math.floor(Math.random() * 10);
    
    if (!hasShotCoordsBefore(row, column)) {
      shots.push([row, column]);
      returnValue = [row, column];
    } else if (hasShotCoordsBefore(row, column)) {
      returnValue = chooseRandomShot();
    }
    return returnValue;
  };

  return { getPlayerName, getBoard, getShots, chooseRandomShot };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = (length) => {
  const lengthOfShip = length;
  let numOfHits = 0;

  const getLength = () => lengthOfShip;
  // for testing purposes
  const getNumOfHits = () => numOfHits;

  const hit = () => {
    numOfHits++;
  };

  const isSunk = () => (lengthOfShip - numOfHits) === 0;

  return { hit, isSunk, getLength, getNumOfHits };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayEndGameDisplay: () => (/* binding */ displayEndGameDisplay),
/* harmony export */   displayModal: () => (/* binding */ displayModal),
/* harmony export */   displayPlayerGameboard: () => (/* binding */ displayPlayerGameboard)
/* harmony export */ });
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
  playAgain.addEventListener("click", cb);

  displayContainer.appendChild(winnerDisplay);
  displayContainer.appendChild(playAgain);

  return displayContainer;
};

const displayEndGameDisplay = (winner, cb) => {
  const body = document.querySelector("body");
  const endGameDisplay = createEndGameDisplay(winner, cb);
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

const dragStartEventHandler = (e, gameboard) => {
  // e.dataTransfer.setData('text/plain', )
  // maybe use e.dataTransfer.setData to transfer the data of the length the ship??
  // maybe use that function to get the length of the ship, and maybe have cell.addEventListener in display function
  // so when dragStarts, we just call this function and it will return the correct length of the ship
  // maybe we could have a global variable and it will just change that global variable
  // so that when they start dragging the ship, we can have the correct length of the ship being dragged
  console.log("drag start");
  console.log(e.target.dataset.row, e.target.dataset.column);
  const row = parseInt(e.target.dataset.row, 10);
  const column = parseInt(e.target.dataset.column, 10);
  for (let i = 0; i < gameboard.getShipsCoordinates().length; i++) {
    if (gameboard.getShipsCoordinates()[i].row === row && (column >= gameboard.getShipsCoordinates()[i].column && (column < (gameboard.getShipsCoordinates()[i].column + gameboard.getShipsCoordinates()[i].ship.getLength())))) {
      shipLength = gameboard.getShipsCoordinates()[i].ship.getLength();
      console.log(shipLength);
      e.dataTransfer.setData("text/plain", e.target.textContent);
    }
  }
};

const dragEventHandler = (e) => {
  console.log("dragged");
  // maybe refactor displayGamboard function
  // i don't necessarily need to loop through each cell on the board, 
  // but if i don't loop through each cell on the board, 
  // then i would have to already have a 10x10 board, 
  // and i would just place/style individual cells that are ship parts

  // or maybe for each individual cell representing a part of a ship, 
  // add a class like ship.${shiplength} to each of those individual parts, 
  // then when we drag start, 
  // we could select all those individual ship parts (maybe?) and use the dataTransfer.setData function on it?

  // or maybe we could get the default image shown and multiply it or something
};

const dropEventHandler = (e) => {
  e.preventDefault();
  console.log("dropped");
  const data = e.dataTransfer.getData("text/plain");
  e.target.textContent = data;
};



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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");


window.addEventListener("load", () => {
  _modules_game__WEBPACK_IMPORTED_MODULE_0__["default"].createNewGame();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNwTEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rQzs7QUFFbEM7QUFDQSxFQUFFLHFEQUFJO0FBQ04sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCBkaXNwbGF5RW5kR2FtZURpc3BsYXksIGRpc3BsYXlNb2RhbCB9IGZyb20gXCIuL3VpLmpzXCI7XG5cbmNvbnN0IEdhbWUgPSAoKCkgPT4ge1xuICBsZXQgcGxheWVyMTtcbiAgbGV0IHBsYXllcjI7XG4gIGxldCBnYW1lYm9hcmQxO1xuICBsZXQgZ2FtZWJvYXJkMjtcbiAgbGV0IGFjdGl2ZVBsYXllcjtcbiAgbGV0IG9wcG9zaW5nUGxheWVyO1xuXG4gIGNvbnN0IGNyZWF0ZU5ld0dhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZWJvYXJkMSA9IEdhbWVib2FyZCgpO1xuICAgIGdhbWVib2FyZDIgPSBHYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXIxID0gcGxheWVyKFwiSm9oblwiLCBnYW1lYm9hcmQxKTtcbiAgICBwbGF5ZXIyID0gcGxheWVyKFwiYWlcIiwgZ2FtZWJvYXJkMik7XG4gICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG5cbiAgICAvLyB0ZXN0XG4gICAgY29uc3Qgc2hpcDQgPSBTaGlwKDUpO1xuICAgIGNvbnN0IHNoaXAzID0gU2hpcCg0KTtcbiAgICBjb25zdCBzaGlwMiA9IFNoaXAoMyk7XG4gICAgY29uc3Qgc2hpcDEgPSBTaGlwKDIpO1xuXG4gICAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoMCwgMCwgc2hpcDEpO1xuICAgIGdhbWVib2FyZDEucGxhY2VTaGlwKDEsIDAsIHNoaXAyKTtcbiAgICBnYW1lYm9hcmQxLnBsYWNlU2hpcCg4LCA2LCBzaGlwMyk7XG4gICAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoNiwgNCwgc2hpcDQpO1xuXG4gICAgZ2FtZWJvYXJkMi5wbGFjZUFpU2hpcHMoKTtcblxuICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQocGxheWVyMSwgZ2FtZWJvYXJkMSk7XG4gICAgZGlzcGxheVBsYXllckdhbWVib2FyZChwbGF5ZXIyLCBnYW1lYm9hcmQyKTtcbiAgICAvLyBkaXNwbGF5TW9kYWwoZ2FtZWJvYXJkMSk7XG4gICAgY29uc3Qgc3RhcnRHYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcbiAgICBzdGFydEdhbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXlHYW1lKTtcbiAgfTtcbiAgXG4gIGNvbnN0IHN3aXRjaEFjdGl2ZVBsYXllciA9ICgpID0+IHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwbGF5R2FtZSA9ICgpID0+IHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcmlnaHQgLmNlbGxcIik7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWFycm93LWNhbGxiYWNrXG4gICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gZXZlbnRIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcblxuICAgICAgICBpZiAob3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5oYXNTaG90Q29vcmRzQmVmb3JlKHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCksIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uLCAxMCkpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJoYXMgc2hvdCB0aGVyZSBiZWZvcmVcIik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKSwgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKSk7XG4gICAgICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQob3Bwb3NpbmdQbGF5ZXIsIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkpO1xuXG4gICAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYGFsbCBzaGlwcyBhcmUgc3VuayBmb3IgcGxheWVyICR7b3Bwb3NpbmdQbGF5ZXIuZ2V0UGxheWVyTmFtZSgpfWApO1xuICAgICAgICAgIC8vIGFkZCBzb21lIGVuZCBnYW1lIHN0dWZmXG4gICAgICAgICAgZGlzcGxheUVuZEdhbWVEaXNwbGF5KGFjdGl2ZVBsYXllci5nZXRQbGF5ZXJOYW1lKCksIGNyZWF0ZU5ld0dhbWUpO1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcbiAgICAgICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZXZlbnRIYW5kbGVyKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICAgICAgc3dpdGNoQWN0aXZlUGxheWVyKCk7XG4gICAgICAgIHBsYXlHYW1lKCk7XG4gICAgICB9KSk7XG4gICAgfSBcbiAgICBcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHNob3QgPSBhY3RpdmVQbGF5ZXIuY2hvb3NlUmFuZG9tU2hvdCgpO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKHNob3RbMF0sIHNob3RbMV0pO1xuICAgICAgZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG4gICAgXG4gICAgICBpZiAob3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5hcmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgYWxsIHNoaXBzIGFyZSBzdW5rIGZvciBwbGF5ZXJtaWtrbyAke29wcG9zaW5nUGxheWVyLmdldFBsYXllck5hbWUoKX1gKTtcbiAgICAgICAgLy8gYWRkIHNvbWUgZW5kIGdhbWUgc3R1ZmZcbiAgICAgICAgZGlzcGxheUVuZEdhbWVEaXNwbGF5KGFjdGl2ZVBsYXllci5nZXRQbGF5ZXJOYW1lKCksIGNyZWF0ZU5ld0dhbWUpO1xuICAgICAgfVxuICAgICAgc3dpdGNoQWN0aXZlUGxheWVyKCk7XG4gICAgICBwbGF5R2FtZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVOZXdHYW1lLCBwbGF5R2FtZSB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcblxuLy8gbWF5YmUgd2hlbiBpIGltcGxlbWVudCBkcmFnIGFuZCBkcm9wLCBpIGNhbiBoYXZlIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlIHNoaXAgd2lsbCBvdmVybGFwL2dvIG91dCBvZiBib2FyZFxuLy8gaWYgdGhhdCdzIHRydWUgdGhlbiBkb250JyBwbGFjZSBlbHNlIHBsYWNlIGl0XG4vLyBtYXliZSBpZiBjb29yZGluYXRlcyBpcyBpbiBzaGlwcyBjb29yZGluYXRlcywgdGhlbiByZXR1cm4/Pz9cbi8vIGFmdGVyIGkgZ2V0IGFpIHRvIHBsYWNlIGl0cyBzaGlwcyByYW5kb21seSwgaSBuZWVkIHRvIGNoZWNrIHRoZSBnYW1lYm9hcmQgZnVuY3Rpb25zXG4vLyBub3cgaSBjYW4gY3JlYXRlIGEgbmV3IGdhbWUgb24gbG9hZCwgdGhlbiBzdGFydCBhIGdhbWUgaWYgaSBoaXQgYnV0dG9uLCB0aGVuIGkgY2FuIGVuZCB0aGUgZ2FtZSBhZnRlciBzb21lb25lIHdpbnNcblxuLy8gc28gdGhlIHBsYW4gaXMgdG8gaW50aWFsbHkgZGlzcGxheSBib3RoIHBsYXllciBhbmQgYWkgYm9hcmRzLCBcbi8vIHRoZW4gaGF2ZSBhIHN0YXJ0IGdhbWUgYnV0dG9uIHdoZXJlIHRoZXkgY2FuIHN0YXJ0IGdhbWVcbi8vIGJ1dCBiZWZvcmUgdGhhdCB0aGUgcGxheWVyIGhhcyBwcmVwbGFjZWQgc2hpcHMgb24gdGhlaXIgYm9hcmQgYW5kIGNhbiBkcmFnIGFuZCBkcm9wIHRoZW0gdG8gYW55d2hlcmUgdGhleSB3YW50XG4vLyBzbyBpIG5lZWQgdG8gYmUgYWJsZSB0byBpbXBsZW1lbnQgZHJhZyBhbmQgZHJvcFxuLy8gaSBuZWVkIHRvIGJlIGFibGUgdG8gZGlmZmVyZW50aWF0ZS9pbmRpdmlkdWFsaXplIGVhY2ggc2hpcCBzbyB0aGF0IHdoZW4gaSB0cnkgdG8gZHJhZyBvbmUsIFxuLy8gdGhlIHdob2xlIHNoaXBzIGZvbGxvd3MgYW5kIG5vdCBqdXN0IGEgcGFydCBvZiB0aGUgc2hpcFxuLy8gaSBjYW4gY3JlYXRlIGEgaXNWYWxpZENvb3JkaW5hdGVzIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIGEgY29vcmRpbmF0ZSBpcyB2YWxpZCwgXG4vLyBpIGNhbiBjaGVjayBpZiBpdCdzIHZhbGlkIGJ5IHVzaW5nIHRoZSBjb25kaXRpb25hbHMgaW4gZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMgZnVuY3Rpb25cbi8vIGlmIGl0IGlzIHZhbGlkLFxuLy8gdGhlbiBpIG5lZWQgdG8gcGxhY2UgdGhlIHNoaXAgYXQgdGhhdCBjb29yZGluYXRlXG5cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBbXTtcbiAgY29uc3Qgc2hpcHNDb29yZGluYXRlcyA9IFtdO1xuICBjb25zdCBtaXNzZWRBdHRhY2tzID0gW107XG5cbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT4gZ2FtZWJvYXJkO1xuICBjb25zdCBnZXRTaGlwc0Nvb3JkaW5hdGVzID0gKCkgPT4gc2hpcHNDb29yZGluYXRlcztcbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goXCItXCIpO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZUdhbWVib2FyZCgpO1xuICBcbiAgLy8gaG93IGRvIGkgbWFrZSBpdCBzbyB0aGF0IHNoaXBzIHdvbid0IG92ZXJsYXAgYW5kIHNoaXBzIHdvbid0IGdvIG91dCBvZiBib2FyZD9cbiAgLy8gdG8gbWFrZSBzaGlwcyBub3Qgb3ZlcmxhcCwgc2luY2Ugd2UncmUgb25seSBkb2luZyB0aGluZ3MgaG9yaXpvbnRhbGx5LCBcbiAgLy8gaWYgcm93IGlzIGluIHNoaXBzQ29vcmRpbmF0ZXMgY2hlY2sgaWYgY29sdW1uIGlzIGdyZWF0ZXIgdGhhbiB0aGF0IGNvcnJlc3BvbmRpbmcgY29sdW1uIGFuZCBsZXNzIHRoYW4gY29sdW1uICsgc2hpcCBsZW5ndGhcbiAgLy8gaWYgaXQgaXMgdGhlbiB0aGF0IGlzIGFuIGludmFsaWQgcm93L2NvbHVtblxuICAvLyB0byBtYWtlIHNoaXBzIG5vdCBnbyBvdXQgb2YgYm9hcmQsIFxuICAvLyBpZiBjb2x1bW4gKHNpbmNlIHNoaXBzIGFyZSBvbmx5IGdvaW5nIGhvcml6b250YWxseSkgKyBzaGlwIGxlbmd0aCA+IDEwICh3aGljaCBpcyB0aGUgbGVuZ3RoIG9mIGJvYXJkKSBcbiAgLy8gdGhlbiBzYXkgc29tZXRoaW5nIGFib3V0IGhvdyBpdCdzIGludmFsaWRcbiAgLy8gYW5kIHdoYXQgZG8gaSBkbyBpZiBpIGRvIGdldCByb3cvY29sdW1uL3NoaXAgbGVuZ3RoIHRoYXQgYXJlIGludmFsaWQ/IFxuICAvLyBtYXliZSB3b3JyeSBhYm91dCB0aGlzIGxhdGVyLCBiZWNhdXNlIGl0J3Mgbm90IHRoYXQgdXJnZW50XG4gIC8vIG1heWJlIHJlZmFjdG9yIGl0IGluIGEgd2F5IHdoZXJlIG9ubHkgdmFsaWQgY29vcmRpbmF0ZXMgYXJlIGdpdmVuP1xuICAvLyBtYXliZSB0aGlzIGlzIGEgZnVuY3Rpb24gZm9yIGRyYWcgYW5kIGRyb3A/XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChyb3csIGNvbHVtbiwgc2hpcCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAvLyBcIm9cIiBtZWFucyB0aGVyZSBpcyBhIHNoaXAvcGFydCBvZiBhIHNoaXAgb24gdGhvc2UgY29vcmRzXG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW4raV0gPSBcIm9cIjtcbiAgICB9XG4gICAgc2hpcHNDb29yZGluYXRlcy5wdXNoKHtyb3csIGNvbHVtbiwgc2hpcH0pOyBcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib1wiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2JqID0gc2hpcHNDb29yZGluYXRlc1tpXTtcbiAgICAgICAgaWYgKHJvdyA9PT0gb2JqLnJvdyAmJiAoY29sdW1uID49IG9iai5jb2x1bW4gJiYgY29sdW1uIDwgb2JqLmNvbHVtbiArIG9iai5zaGlwLmdldExlbmd0aCgpKSkge1xuICAgICAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcInhcIjtcbiAgICAgICAgICBvYmouc2hpcC5oaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICBzaGlwc1N1bmsgPSBzaGlwc0Nvb3JkaW5hdGVzLnJlZHVjZSggKGFjYywgY3VyKSA9PiB7XG4gICAgICBpZiAoY3VyLnNoaXAuaXNTdW5rKCkpIHJldHVybiBhY2MgKyAxO1xuICAgICAgcmV0dXJuIGFjYyArIDA7XG4gICAgfSwgMCk7XG4gICAgXG4gICAgcmV0dXJuIHNoaXBzU3VuayA9PT0gc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgaGFzU2hvdENvb3Jkc0JlZm9yZSA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgaWYgKGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwibVwiIHx8IGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwieFwiKSBmbGFnID0gdHJ1ZTtcbiAgICByZXR1cm4gZmxhZztcbiAgfTtcblxuICBjb25zdCBnZXRSYW5kb21TaGlwUGxhY2VtZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwQ29vcmRzID0gW107XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgNCkge1xuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IHNoaXAgPSBTaGlwKGkrMik7XG4gICAgICAvLyBtYXliZSBjaGVjayBpZiBjb2x1bW4gKyBzaGlwIGxlbmd0aCBpcyBncmVhdGVyIHRoYW4gMTAgaGVyZSBhbHJlYWR5IHNvIHdlIGNhbiBqdXN0IGNvbnRpbnVlXG4gICAgICBzaGlwQ29vcmRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAocm93ID09PSBlbC5yb3cgJiYgKGNvbHVtbiA+PSBlbC5jb2x1bW4gJiYgY29sdW1uIDwgKGVsLmNvbHVtbiArIGVsLnNoaXAuZ2V0TGVuZ3RoKCkpKSkge1xuICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHJvdyA9PT0gZWwucm93KSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzaGlwLmdldExlbmd0aCgpOyBrKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0NvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgICAgIGlmICgoKG5ld0NvbHVtbiArIGsgKyAxKSA+PSBlbC5jb2x1bW4pICYmICgobmV3Q29sdW1uICsgayArIDEpIDwgKGVsLmNvbHVtbiArIGVsLnNoaXAuZ2V0TGVuZ3RoKCkpKSkgZmxhZyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgfSk7XG4gICAgICBpZiAoZmxhZyB8fCBjb2x1bW4gKyBzaGlwLmdldExlbmd0aCgpID4gMTApIHtcbiAgICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgICAvLyBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwQ29vcmRzLnB1c2goe3JvdywgY29sdW1uLCBzaGlwfSk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNoaXBDb29yZHM7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VBaVNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBBcnIgPSBnZXRSYW5kb21TaGlwUGxhY2VtZW50cygpO1xuICAgIHNoaXBBcnIuZm9yRWFjaChvYmogPT4gcGxhY2VTaGlwKG9iai5yb3csIG9iai5jb2x1bW4sIG9iai5zaGlwKSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlR2FtZWJvYXJkLCBnZXRHYW1lYm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgXG4gICAgZ2V0TWlzc2VkQXR0YWNrcywgYXJlQWxsU2hpcHNTdW5rLCBoYXNTaG90Q29vcmRzQmVmb3JlLCBwbGFjZUFpU2hpcHMsIGdldFNoaXBzQ29vcmRpbmF0ZXMgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCJjb25zdCBwbGF5ZXIgPSAobmFtZSwgZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZDtcbiAgY29uc3Qgc2hvdHMgPSBbXTtcblxuICBjb25zdCBnZXRQbGF5ZXJOYW1lID0gKCkgPT4gcGxheWVyTmFtZTtcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcbiAgY29uc3QgZ2V0U2hvdHMgPSAoKSA9PiBzaG90cztcblxuICBjb25zdCBoYXNTaG90Q29vcmRzQmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBzaG90cy5mb3JFYWNoKChzaG90KSA9PiB7XG4gICAgICBpZiAoc2hvdFswXSA9PT0gcm93ICYmIHNob3RbMV0gPT09IGNvbHVtbikge1xuICAgICAgICBmbGFnID0gIHRydWU7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBmbGFnO1xuICB9O1xuICBcbiAgY29uc3QgY2hvb3NlUmFuZG9tU2hvdCA9ICgpID0+IHtcbiAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBcbiAgICBpZiAoIWhhc1Nob3RDb29yZHNCZWZvcmUocm93LCBjb2x1bW4pKSB7XG4gICAgICBzaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgcmV0dXJuVmFsdWUgPSBbcm93LCBjb2x1bW5dO1xuICAgIH0gZWxzZSBpZiAoaGFzU2hvdENvb3Jkc0JlZm9yZShyb3csIGNvbHVtbikpIHtcbiAgICAgIHJldHVyblZhbHVlID0gY2hvb3NlUmFuZG9tU2hvdCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0UGxheWVyTmFtZSwgZ2V0Qm9hcmQsIGdldFNob3RzLCBjaG9vc2VSYW5kb21TaG90IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3QgbGVuZ3RoT2ZTaGlwID0gbGVuZ3RoO1xuICBsZXQgbnVtT2ZIaXRzID0gMDtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGhPZlNoaXA7XG4gIC8vIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gIGNvbnN0IGdldE51bU9mSGl0cyA9ICgpID0+IG51bU9mSGl0cztcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgbnVtT2ZIaXRzKys7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gKGxlbmd0aE9mU2hpcCAtIG51bU9mSGl0cykgPT09IDA7XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmssIGdldExlbmd0aCwgZ2V0TnVtT2ZIaXRzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImxldCBzaGlwTGVuZ3RoO1xuXG5jb25zdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkID0gKHBsYXllciwgZ2FtZWJvYXJkKSA9PiB7XG4gIGxldCBwYXJlbnRDb250YWluZXI7XG4gIGlmIChwbGF5ZXIuZ2V0UGxheWVyTmFtZSgpID09PSBcImFpXCIpIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmlnaHRcIik7XG4gIGVsc2UgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0XCIpO1xuIFxuICAvLyBjbGVhcnMgaXQgZmlyc3QgdGhlbiBhZGRzIHRoZSBnYW1lYm9hcmQgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBwYXJlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3Qgcm93TnVtID0gaTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY29sdW1uTnVtID0gajtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93TnVtO1xuICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbk51bTtcblxuICAgICAgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJ4XCIpIGNlbGwudGV4dENvbnRlbnQgPSBcInhcIjtcbiAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJvXCIpIHtcbiAgICAgICAgY2VsbC50ZXh0Q29udGVudCA9IFwib1wiO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm1cIikgY2VsbC50ZXh0Q29udGVudCA9IFwibVwiO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUVuZEdhbWVEaXNwbGF5ID0gKHdpbm5lciwgY2IpID0+IHtcbiAgY29uc3QgZGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHdpbm5lckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBwbGF5QWdhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIHdpbm5lckRpc3BsYXkudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9IGhhcyB3b24hYDtcbiAgcGxheUFnYWluLnRleHRDb250ZW50ID0gXCJQbGF5IEFnYWluXCI7XG4gIHBsYXlBZ2Fpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2IpO1xuXG4gIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQod2lubmVyRGlzcGxheSk7XG4gIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheUFnYWluKTtcblxuICByZXR1cm4gZGlzcGxheUNvbnRhaW5lcjtcbn07XG5cbmNvbnN0IGRpc3BsYXlFbmRHYW1lRGlzcGxheSA9ICh3aW5uZXIsIGNiKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgZW5kR2FtZURpc3BsYXkgPSBjcmVhdGVFbmRHYW1lRGlzcGxheSh3aW5uZXIsIGNiKTtcbiAgYm9keS5hcHBlbmRDaGlsZChlbmRHYW1lRGlzcGxheSk7XG59O1xuXG5jb25zdCBjcmVhdGVNb2RhbCA9IChnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICBjb25zdCBib2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICBtZXNzYWdlLnRleHRDb250ZW50ID0gXCJQbGFjZSBZb3VyIFNoaXBzXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKCkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHJvd051bSA9IGk7XG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbk51bSA9IGo7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvd051bTtcbiAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW5OdW07XG5cbiAgICAgIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwieFwiKSBjZWxsLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgICBlbHNlIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwib1wiKSBjZWxsLnRleHRDb250ZW50ID0gXCJvXCI7XG4gICAgICBlbHNlIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwibVwiKSBjZWxsLnRleHRDb250ZW50ID0gXCJtXCI7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGkrMTsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICBzaGlwLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgICBzaGlwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwKTtcbiAgfVxuICBzaGlwc0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNoaXBzLWNvbnRhaW5lclwiKTtcbiAgbW9kYWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtb2RhbFwiKTtcblxuICBtb2RhbC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcbiAgbW9kYWwuYXBwZW5kQ2hpbGQoYm9hcmRDb250YWluZXIpO1xuICBtb2RhbC5hcHBlbmRDaGlsZChzaGlwc0NvbnRhaW5lcik7XG4gIHJldHVybiBtb2RhbDtcbn07XG5cbmNvbnN0IGRpc3BsYXlNb2RhbCA9IChnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgbW9kYWwgPSBjcmVhdGVNb2RhbChnYW1lYm9hcmQpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcbn07XG5cbmNvbnN0IGRyYWdTdGFydEV2ZW50SGFuZGxlciA9IChlLCBnYW1lYm9hcmQpID0+IHtcbiAgLy8gZS5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIClcbiAgLy8gbWF5YmUgdXNlIGUuZGF0YVRyYW5zZmVyLnNldERhdGEgdG8gdHJhbnNmZXIgdGhlIGRhdGEgb2YgdGhlIGxlbmd0aCB0aGUgc2hpcD8/XG4gIC8vIG1heWJlIHVzZSB0aGF0IGZ1bmN0aW9uIHRvIGdldCB0aGUgbGVuZ3RoIG9mIHRoZSBzaGlwLCBhbmQgbWF5YmUgaGF2ZSBjZWxsLmFkZEV2ZW50TGlzdGVuZXIgaW4gZGlzcGxheSBmdW5jdGlvblxuICAvLyBzbyB3aGVuIGRyYWdTdGFydHMsIHdlIGp1c3QgY2FsbCB0aGlzIGZ1bmN0aW9uIGFuZCBpdCB3aWxsIHJldHVybiB0aGUgY29ycmVjdCBsZW5ndGggb2YgdGhlIHNoaXBcbiAgLy8gbWF5YmUgd2UgY291bGQgaGF2ZSBhIGdsb2JhbCB2YXJpYWJsZSBhbmQgaXQgd2lsbCBqdXN0IGNoYW5nZSB0aGF0IGdsb2JhbCB2YXJpYWJsZVxuICAvLyBzbyB0aGF0IHdoZW4gdGhleSBzdGFydCBkcmFnZ2luZyB0aGUgc2hpcCwgd2UgY2FuIGhhdmUgdGhlIGNvcnJlY3QgbGVuZ3RoIG9mIHRoZSBzaGlwIGJlaW5nIGRyYWdnZWRcbiAgY29uc29sZS5sb2coXCJkcmFnIHN0YXJ0XCIpO1xuICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApO1xuICBjb25zdCBjb2x1bW4gPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKCkubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZ2FtZWJvYXJkLmdldFNoaXBzQ29vcmRpbmF0ZXMoKVtpXS5yb3cgPT09IHJvdyAmJiAoY29sdW1uID49IGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKClbaV0uY29sdW1uICYmIChjb2x1bW4gPCAoZ2FtZWJvYXJkLmdldFNoaXBzQ29vcmRpbmF0ZXMoKVtpXS5jb2x1bW4gKyBnYW1lYm9hcmQuZ2V0U2hpcHNDb29yZGluYXRlcygpW2ldLnNoaXAuZ2V0TGVuZ3RoKCkpKSkpIHtcbiAgICAgIHNoaXBMZW5ndGggPSBnYW1lYm9hcmQuZ2V0U2hpcHNDb29yZGluYXRlcygpW2ldLnNoaXAuZ2V0TGVuZ3RoKCk7XG4gICAgICBjb25zb2xlLmxvZyhzaGlwTGVuZ3RoKTtcbiAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIGUudGFyZ2V0LnRleHRDb250ZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGRyYWdFdmVudEhhbmRsZXIgPSAoZSkgPT4ge1xuICBjb25zb2xlLmxvZyhcImRyYWdnZWRcIik7XG4gIC8vIG1heWJlIHJlZmFjdG9yIGRpc3BsYXlHYW1ib2FyZCBmdW5jdGlvblxuICAvLyBpIGRvbid0IG5lY2Vzc2FyaWx5IG5lZWQgdG8gbG9vcCB0aHJvdWdoIGVhY2ggY2VsbCBvbiB0aGUgYm9hcmQsIFxuICAvLyBidXQgaWYgaSBkb24ndCBsb29wIHRocm91Z2ggZWFjaCBjZWxsIG9uIHRoZSBib2FyZCwgXG4gIC8vIHRoZW4gaSB3b3VsZCBoYXZlIHRvIGFscmVhZHkgaGF2ZSBhIDEweDEwIGJvYXJkLCBcbiAgLy8gYW5kIGkgd291bGQganVzdCBwbGFjZS9zdHlsZSBpbmRpdmlkdWFsIGNlbGxzIHRoYXQgYXJlIHNoaXAgcGFydHNcblxuICAvLyBvciBtYXliZSBmb3IgZWFjaCBpbmRpdmlkdWFsIGNlbGwgcmVwcmVzZW50aW5nIGEgcGFydCBvZiBhIHNoaXAsIFxuICAvLyBhZGQgYSBjbGFzcyBsaWtlIHNoaXAuJHtzaGlwbGVuZ3RofSB0byBlYWNoIG9mIHRob3NlIGluZGl2aWR1YWwgcGFydHMsIFxuICAvLyB0aGVuIHdoZW4gd2UgZHJhZyBzdGFydCwgXG4gIC8vIHdlIGNvdWxkIHNlbGVjdCBhbGwgdGhvc2UgaW5kaXZpZHVhbCBzaGlwIHBhcnRzIChtYXliZT8pIGFuZCB1c2UgdGhlIGRhdGFUcmFuc2Zlci5zZXREYXRhIGZ1bmN0aW9uIG9uIGl0P1xuXG4gIC8vIG9yIG1heWJlIHdlIGNvdWxkIGdldCB0aGUgZGVmYXVsdCBpbWFnZSBzaG93biBhbmQgbXVsdGlwbHkgaXQgb3Igc29tZXRoaW5nXG59O1xuXG5jb25zdCBkcm9wRXZlbnRIYW5kbGVyID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zb2xlLmxvZyhcImRyb3BwZWRcIik7XG4gIGNvbnN0IGRhdGEgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dC9wbGFpblwiKTtcbiAgZS50YXJnZXQudGV4dENvbnRlbnQgPSBkYXRhO1xufTtcblxuZXhwb3J0IHsgZGlzcGxheVBsYXllckdhbWVib2FyZCwgZGlzcGxheUVuZEdhbWVEaXNwbGF5LCBkaXNwbGF5TW9kYWwgfTtcblxuLy8gYWNjb3JkaW5nIHRvIHdlYmRldiBzaW1wbGlmaWVkJ3MgdmlkZW8sIHRoZXJlIGFyZSBkcmFnIGFuZCBkcm9wIGV2ZW50cywgc28gaSBzaG91bGQgYmUgYWJsZSB0byBkcmFnXG4vLyB0aGUgc2hpcHMgYW5kIGRyb3AgdGhlbSBpbiB0aGUgY29udGFpbmVyXG4vLyBzbyBpIG5lZWQgdG8ga25vdyBob3cgaSBjYW4gZGlmZmVyZW50aWF0ZSBlYWNoIGluZGl2aWR1YWwgc2hpcFxuLy8gbWF5YmUgaSBjYW4gb25seSBkcmFnIGFuZCBkcm9wIGFmdGVyIGNsaWNraW5nIGVhY2ggc2hpcCBvbmNlLCBcbi8vIHNvIGNsaWNraW5nIGl0IG9uY2UgYWxsb3dzIGZvciBkcmFnIGFuZCBkcm9wXG4vLyBhbmQgdGhhdCBjbGljayB3aWxsIGlkZW50aWZ5IHRoZSBzaGlwIGJ5IGdvaW5nIHRocm91Z2ggdGhlIHNoaXAgY29vcmRzIGFuZCBpZGVudGlmeWluZyB3aGljaCBlbGVtZW50IGl0IGlzXG4vLyBhbmQgdGhlbiB3aGVuIHRoZXkncmUgZHJhZ2dpbmcgYW5kIGFib3V0IHRvIGRyb3AsIGl0IHNob3VsZCBjaGVjayBpZiBpdCBpcyBhIHZhbGlkIGNvb3JkXG4vLyBpZiBpdCBpcyB0aGVuIGRyb3AgaXQsIGlmIG5vdCB0aGVuIHB1dCB0aGUgc2hpcCBiYWNrIHRvIHdoZXJlIGl0IHdhc1xuXG4vLyB3aGVuIGltIHRyeWluZyB0byBkcmFnIGFuZCBkcm9wLCB0byBiZSBhYmxlIHRvICdkcmFnJyBhbmQgJ2Ryb3AnIHRoZSBzaGlwLCBvbmNlIGkgY2xpY2svc3RhcnQgZHJhZ2dpbmdcbi8vIGl0IHNob3VsZCBmaW5kIHRoZSByaWdodCBzaGlwIGluIHRoZSBzaGlwIGNvb3Jkc1xuLy8gc28gdGhhdCB3aGVuIGkgZHJvcCBpdCwgaXQgd2lsbCBkaXNwbGF5IGNvcnJlY3RseTsgaXQgd2lsbCBkaXNwbGF5IHRoZSBjb3JyZWN0IHNoaXAgbGVuZ3RoXG4vLyBvbmNlIGkgZmluZCB0aGUgcmlnaHQgc2hpcCBsZW5ndGggZnJvbSBzdGFydGluZyB0aGUgZHJhZ1xuLy8gd2hpbGUgZHJhZ2dpbmcgaXQgb3ZlciwgaSBzaG91bGQgYmUgY2hlY2sgaWYgaXQgaXMgYSB2YWxpZCBjb29yZGluYXRlLCBvbmx5IHRoZW4gY2FuIGl0IGJlIGRyb3BwZWRcbi8vIG9uY2UgaXQncyBkcm9wcGVkIGl0IHNob3VsZCBqdXN0IGNoYW5nZSB0aGUgY29ycmVjdCBlbGVtZW50IGZyb20gdGhlIGFycmF5LCBjaGFuZ2UgdGhlIHJvdy9jb2x1bW5cbi8vIGFuZCB0aGVuIHNpbmNlIHdlJ3JlIHZhbGlkaW5nIGNvb3JkcyBhbmQgcGxhY2luZyBzaGlwLCBpdCBzaG91bGQgcGxhY2UgaXQgY29ycmVjdGx5XG5cbi8vIHVzZSBzZXREcmFnSW1hZ2UgZnVuY3Rpb24gdG8gbWFrZSBpdCBsb29rIGxpa2UgeW91J3JlIGRyYWdnaW50IHRoZSB3aG9sZSB0aGluZ1xuLy8gaSBmaXJzdCBuZWVkIHRvIHVuZGVyc3RhbmQgZWFjaCBkcmFnL2Ryb3AgZXZlbnQgYW5kIHRoZW4gZmlndXJlIG91dCB3aGF0IGkgbmVlZCB0byBwdXQgaW4gZWFjaCBvZiB0aG9zZVxuXG4vLyBsb29rIGF0IG15IG5vdGVzIG9uIG5vdGVib29rLCBJIGdvdCB0aGUgZHJhZ3N0YXJ0IGRvbmUgbm93IGkgdGhpbmtcbi8vIGkgc2hvdWxkIGltcGxlbWVudCBzaG93aW5nIGFsbCB0aGUgc2hpcCBiZWluZyBkcmFnZ2VkIGJ1dCByblxuLy8gb3IgbWF5YmUgaSBkbyBuZWVkIHRvIHVzZSB0aGUgZGF0YVRyYW5zZmVyLnNldERhdGEgc28gdGhhdCBpdCBrbm93cyBob3cgJ2xvbmcnIHRoZSBzaGlwIGlzP1xuLy8gaSBjYW4ganVzdCBmb2N1cyBvbiBmaXJzdCBkcm9wcGluZyB0aGUgdGhpbmcgaSBhbSBkcmFnZ2luZywgaXQgbWlnaHQgYmUgZWFzaWVyIGxhdGVyIG9uIGlmIGkgZG8gdGhpcyBmaXJzdFxuXG4vLyBmcm9tIGRyYWcgYW5kIGRyb3AgbWRuIGRvY3Ncbi8vIEVhY2ggRGF0YVRyYW5zZmVyIG9iamVjdCBjb250YWlucyBhbiBpdGVtcyBwcm9wZXJ0eSwgXG4vLyB3aGljaCBpcyBhIGxpc3Qgb2YgRGF0YVRyYW5zZmVySXRlbSBvYmplY3RzLiBcbi8vIEEgRGF0YVRyYW5zZmVySXRlbSBvYmplY3QgcmVwcmVzZW50cyBhIHNpbmdsZSBkcmFnIGl0ZW0sIGVhY2ggd2l0aCBhIGtpbmQgcHJvcGVydHkgKGVpdGhlciBzdHJpbmcgb3IgZmlsZSkgXG4vLyBhbmQgYSB0eXBlIHByb3BlcnR5IGZvciB0aGUgZGF0YSBpdGVtJ3MgTUlNRSB0eXBlLiBcbi8vIFRoZSBEYXRhVHJhbnNmZXJJdGVtIG9iamVjdCBhbHNvIGhhcyBtZXRob2RzIHRvIGdldCB0aGUgZHJhZyBpdGVtJ3MgZGF0YS4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBHYW1lLmNyZWF0ZU5ld0dhbWUoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9