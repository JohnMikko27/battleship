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

    // displayPlayerGameboard(player1, gameboard1);
    // displayPlayerGameboard(player2, gameboard2);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayModal)(gameboard1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDcExBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7O0FBRWxDO0FBQ0EsRUFBRSxxREFBSTtBQUNOLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IHsgZGlzcGxheVBsYXllckdhbWVib2FyZCwgZGlzcGxheUVuZEdhbWVEaXNwbGF5LCBkaXNwbGF5TW9kYWwgfSBmcm9tIFwiLi91aS5qc1wiO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjE7XG4gIGxldCBwbGF5ZXIyO1xuICBsZXQgZ2FtZWJvYXJkMTtcbiAgbGV0IGdhbWVib2FyZDI7XG4gIGxldCBhY3RpdmVQbGF5ZXI7XG4gIGxldCBvcHBvc2luZ1BsYXllcjtcblxuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIkpvaG5cIiwgZ2FtZWJvYXJkMSk7XG4gICAgcGxheWVyMiA9IHBsYXllcihcImFpXCIsIGdhbWVib2FyZDIpO1xuICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjE7XG4gICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIyO1xuXG4gICAgLy8gdGVzdFxuICAgIGNvbnN0IHNoaXA0ID0gU2hpcCg1KTtcbiAgICBjb25zdCBzaGlwMyA9IFNoaXAoNCk7XG4gICAgY29uc3Qgc2hpcDIgPSBTaGlwKDMpO1xuICAgIGNvbnN0IHNoaXAxID0gU2hpcCgyKTtcblxuICAgIGdhbWVib2FyZDEucGxhY2VTaGlwKDAsIDAsIHNoaXAxKTtcbiAgICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgxLCAwLCBzaGlwMik7XG4gICAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoOCwgNiwgc2hpcDMpO1xuICAgIGdhbWVib2FyZDEucGxhY2VTaGlwKDYsIDQsIHNoaXA0KTtcblxuICAgIGdhbWVib2FyZDIucGxhY2VBaVNoaXBzKCk7XG5cbiAgICAvLyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKHBsYXllcjEsIGdhbWVib2FyZDEpO1xuICAgIC8vIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQocGxheWVyMiwgZ2FtZWJvYXJkMik7XG4gICAgZGlzcGxheU1vZGFsKGdhbWVib2FyZDEpO1xuICAgIGNvbnN0IHN0YXJ0R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XG4gICAgc3RhcnRHYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5R2FtZSk7XG4gIH07XG4gIFxuICBjb25zdCBzd2l0Y2hBY3RpdmVQbGF5ZXIgPSAoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSkge1xuICAgICAgYWN0aXZlUGxheWVyID0gcGxheWVyMjtcbiAgICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSkge1xuICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3JpZ2h0IC5jZWxsXCIpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1hcnJvdy1jYWxsYmFja1xuICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIGV2ZW50SGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG5cbiAgICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuaGFzU2hvdENvb3Jkc0JlZm9yZShwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGFzIHNob3QgdGhlcmUgYmVmb3JlXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCksIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uLCAxMCkpO1xuICAgICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcblxuICAgICAgICBpZiAob3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5hcmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBhbGwgc2hpcHMgYXJlIHN1bmsgZm9yIHBsYXllciAke29wcG9zaW5nUGxheWVyLmdldFBsYXllck5hbWUoKX1gKTtcbiAgICAgICAgICAvLyBhZGQgc29tZSBlbmQgZ2FtZSBzdHVmZlxuICAgICAgICAgIGRpc3BsYXlFbmRHYW1lRGlzcGxheShhY3RpdmVQbGF5ZXIuZ2V0UGxheWVyTmFtZSgpLCBjcmVhdGVOZXdHYW1lKTtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93XG4gICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGV2ZW50SGFuZGxlcikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG4gICAgICAgIHN3aXRjaEFjdGl2ZVBsYXllcigpO1xuICAgICAgICBwbGF5R2FtZSgpO1xuICAgICAgfSkpO1xuICAgIH0gXG4gICAgXG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBzaG90ID0gYWN0aXZlUGxheWVyLmNob29zZVJhbmRvbVNob3QoKTtcbiAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhzaG90WzBdLCBzaG90WzFdKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQob3Bwb3NpbmdQbGF5ZXIsIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkpO1xuICAgIFxuICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuYXJlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGFsbCBzaGlwcyBhcmUgc3VuayBmb3IgcGxheWVybWlra28gJHtvcHBvc2luZ1BsYXllci5nZXRQbGF5ZXJOYW1lKCl9YCk7XG4gICAgICAgIC8vIGFkZCBzb21lIGVuZCBnYW1lIHN0dWZmXG4gICAgICAgIGRpc3BsYXlFbmRHYW1lRGlzcGxheShhY3RpdmVQbGF5ZXIuZ2V0UGxheWVyTmFtZSgpLCBjcmVhdGVOZXdHYW1lKTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaEFjdGl2ZVBsYXllcigpO1xuICAgICAgcGxheUdhbWUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlTmV3R2FtZSwgcGxheUdhbWUgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG5cbi8vIG1heWJlIHdoZW4gaSBpbXBsZW1lbnQgZHJhZyBhbmQgZHJvcCwgaSBjYW4gaGF2ZSBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZSBzaGlwIHdpbGwgb3ZlcmxhcC9nbyBvdXQgb2YgYm9hcmRcbi8vIGlmIHRoYXQncyB0cnVlIHRoZW4gZG9udCcgcGxhY2UgZWxzZSBwbGFjZSBpdFxuLy8gbWF5YmUgaWYgY29vcmRpbmF0ZXMgaXMgaW4gc2hpcHMgY29vcmRpbmF0ZXMsIHRoZW4gcmV0dXJuPz8/XG4vLyBhZnRlciBpIGdldCBhaSB0byBwbGFjZSBpdHMgc2hpcHMgcmFuZG9tbHksIGkgbmVlZCB0byBjaGVjayB0aGUgZ2FtZWJvYXJkIGZ1bmN0aW9uc1xuLy8gbm93IGkgY2FuIGNyZWF0ZSBhIG5ldyBnYW1lIG9uIGxvYWQsIHRoZW4gc3RhcnQgYSBnYW1lIGlmIGkgaGl0IGJ1dHRvbiwgdGhlbiBpIGNhbiBlbmQgdGhlIGdhbWUgYWZ0ZXIgc29tZW9uZSB3aW5zXG5cbi8vIHNvIHRoZSBwbGFuIGlzIHRvIGludGlhbGx5IGRpc3BsYXkgYm90aCBwbGF5ZXIgYW5kIGFpIGJvYXJkcywgXG4vLyB0aGVuIGhhdmUgYSBzdGFydCBnYW1lIGJ1dHRvbiB3aGVyZSB0aGV5IGNhbiBzdGFydCBnYW1lXG4vLyBidXQgYmVmb3JlIHRoYXQgdGhlIHBsYXllciBoYXMgcHJlcGxhY2VkIHNoaXBzIG9uIHRoZWlyIGJvYXJkIGFuZCBjYW4gZHJhZyBhbmQgZHJvcCB0aGVtIHRvIGFueXdoZXJlIHRoZXkgd2FudFxuLy8gc28gaSBuZWVkIHRvIGJlIGFibGUgdG8gaW1wbGVtZW50IGRyYWcgYW5kIGRyb3Bcbi8vIGkgbmVlZCB0byBiZSBhYmxlIHRvIGRpZmZlcmVudGlhdGUvaW5kaXZpZHVhbGl6ZSBlYWNoIHNoaXAgc28gdGhhdCB3aGVuIGkgdHJ5IHRvIGRyYWcgb25lLCBcbi8vIHRoZSB3aG9sZSBzaGlwcyBmb2xsb3dzIGFuZCBub3QganVzdCBhIHBhcnQgb2YgdGhlIHNoaXBcbi8vIGkgY2FuIGNyZWF0ZSBhIGlzVmFsaWRDb29yZGluYXRlcyBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiBhIGNvb3JkaW5hdGUgaXMgdmFsaWQsIFxuLy8gaSBjYW4gY2hlY2sgaWYgaXQncyB2YWxpZCBieSB1c2luZyB0aGUgY29uZGl0aW9uYWxzIGluIGdldFJhbmRvbVNoaXBQbGFjZW1lbnRzIGZ1bmN0aW9uXG4vLyBpZiBpdCBpcyB2YWxpZCxcbi8vIHRoZW4gaSBuZWVkIHRvIHBsYWNlIHRoZSBzaGlwIGF0IHRoYXQgY29vcmRpbmF0ZVxuXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5cbmNvbnN0IEdhbWVib2FyZCA9ICgpID0+IHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gW107XG4gIGNvbnN0IHNoaXBzQ29vcmRpbmF0ZXMgPSBbXTtcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+IGdhbWVib2FyZDtcbiAgY29uc3QgZ2V0U2hpcHNDb29yZGluYXRlcyA9ICgpID0+IHNoaXBzQ29vcmRpbmF0ZXM7XG4gIGNvbnN0IGdldE1pc3NlZEF0dGFja3MgPSAoKSA9PiBtaXNzZWRBdHRhY2tzO1xuXG4gIGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKFwiLVwiKTtcbiAgICAgIH1cbiAgICAgIGdhbWVib2FyZC5wdXNoKHJvdyk7XG4gICAgfVxuICB9O1xuICBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgXG4gIC8vIGhvdyBkbyBpIG1ha2UgaXQgc28gdGhhdCBzaGlwcyB3b24ndCBvdmVybGFwIGFuZCBzaGlwcyB3b24ndCBnbyBvdXQgb2YgYm9hcmQ/XG4gIC8vIHRvIG1ha2Ugc2hpcHMgbm90IG92ZXJsYXAsIHNpbmNlIHdlJ3JlIG9ubHkgZG9pbmcgdGhpbmdzIGhvcml6b250YWxseSwgXG4gIC8vIGlmIHJvdyBpcyBpbiBzaGlwc0Nvb3JkaW5hdGVzIGNoZWNrIGlmIGNvbHVtbiBpcyBncmVhdGVyIHRoYW4gdGhhdCBjb3JyZXNwb25kaW5nIGNvbHVtbiBhbmQgbGVzcyB0aGFuIGNvbHVtbiArIHNoaXAgbGVuZ3RoXG4gIC8vIGlmIGl0IGlzIHRoZW4gdGhhdCBpcyBhbiBpbnZhbGlkIHJvdy9jb2x1bW5cbiAgLy8gdG8gbWFrZSBzaGlwcyBub3QgZ28gb3V0IG9mIGJvYXJkLCBcbiAgLy8gaWYgY29sdW1uIChzaW5jZSBzaGlwcyBhcmUgb25seSBnb2luZyBob3Jpem9udGFsbHkpICsgc2hpcCBsZW5ndGggPiAxMCAod2hpY2ggaXMgdGhlIGxlbmd0aCBvZiBib2FyZCkgXG4gIC8vIHRoZW4gc2F5IHNvbWV0aGluZyBhYm91dCBob3cgaXQncyBpbnZhbGlkXG4gIC8vIGFuZCB3aGF0IGRvIGkgZG8gaWYgaSBkbyBnZXQgcm93L2NvbHVtbi9zaGlwIGxlbmd0aCB0aGF0IGFyZSBpbnZhbGlkPyBcbiAgLy8gbWF5YmUgd29ycnkgYWJvdXQgdGhpcyBsYXRlciwgYmVjYXVzZSBpdCdzIG5vdCB0aGF0IHVyZ2VudFxuICAvLyBtYXliZSByZWZhY3RvciBpdCBpbiBhIHdheSB3aGVyZSBvbmx5IHZhbGlkIGNvb3JkaW5hdGVzIGFyZSBnaXZlbj9cbiAgLy8gbWF5YmUgdGhpcyBpcyBhIGZ1bmN0aW9uIGZvciBkcmFnIGFuZCBkcm9wP1xuICBjb25zdCBwbGFjZVNoaXAgPSAocm93LCBjb2x1bW4sIHNoaXApID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgLy8gXCJvXCIgbWVhbnMgdGhlcmUgaXMgYSBzaGlwL3BhcnQgb2YgYSBzaGlwIG9uIHRob3NlIGNvb3Jkc1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uK2ldID0gXCJvXCI7XG4gICAgfVxuICAgIHNoaXBzQ29vcmRpbmF0ZXMucHVzaCh7cm93LCBjb2x1bW4sIHNoaXB9KTsgXG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9cIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHNoaXBzQ29vcmRpbmF0ZXNbaV07XG4gICAgICAgIGlmIChyb3cgPT09IG9iai5yb3cgJiYgKGNvbHVtbiA+PSBvYmouY29sdW1uICYmIGNvbHVtbiA8IG9iai5jb2x1bW4gKyBvYmouc2hpcC5nZXRMZW5ndGgoKSkpIHtcbiAgICAgICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJ4XCI7XG4gICAgICAgICAgb2JqLnNoaXAuaGl0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWlzc2VkQXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9IFwibVwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhcmVBbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgc2hpcHNTdW5rID0gc2hpcHNDb29yZGluYXRlcy5yZWR1Y2UoIChhY2MsIGN1cikgPT4ge1xuICAgICAgaWYgKGN1ci5zaGlwLmlzU3VuaygpKSByZXR1cm4gYWNjICsgMTtcbiAgICAgIHJldHVybiBhY2MgKyAwO1xuICAgIH0sIDApO1xuICAgIFxuICAgIHJldHVybiBzaGlwc1N1bmsgPT09IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGhhc1Nob3RDb29yZHNCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm1cIiB8fCBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcInhcIikgZmxhZyA9IHRydWU7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IDQpIHtcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBzaGlwID0gU2hpcChpKzIpO1xuICAgICAgLy8gbWF5YmUgY2hlY2sgaWYgY29sdW1uICsgc2hpcCBsZW5ndGggaXMgZ3JlYXRlciB0aGFuIDEwIGhlcmUgYWxyZWFkeSBzbyB3ZSBjYW4ganVzdCBjb250aW51ZVxuICAgICAgc2hpcENvb3Jkcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKHJvdyA9PT0gZWwucm93ICYmIChjb2x1bW4gPj0gZWwuY29sdW1uICYmIGNvbHVtbiA8IChlbC5jb2x1bW4gKyBlbC5zaGlwLmdldExlbmd0aCgpKSkpIHtcbiAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChyb3cgPT09IGVsLnJvdykge1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc2hpcC5nZXRMZW5ndGgoKTsgaysrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb2x1bW4gPSBjb2x1bW47XG4gICAgICAgICAgICBpZiAoKChuZXdDb2x1bW4gKyBrICsgMSkgPj0gZWwuY29sdW1uKSAmJiAoKG5ld0NvbHVtbiArIGsgKyAxKSA8IChlbC5jb2x1bW4gKyBlbC5zaGlwLmdldExlbmd0aCgpKSkpIGZsYWcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgIH0pO1xuICAgICAgaWYgKGZsYWcgfHwgY29sdW1uICsgc2hpcC5nZXRMZW5ndGgoKSA+IDEwKSB7XG4gICAgICAgIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgLy8gaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcENvb3Jkcy5wdXNoKHtyb3csIGNvbHVtbiwgc2hpcH0pO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaGlwQ29vcmRzO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlQWlTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwQXJyID0gZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMoKTtcbiAgICBzaGlwQXJyLmZvckVhY2gob2JqID0+IHBsYWNlU2hpcChvYmoucm93LCBvYmouY29sdW1uLCBvYmouc2hpcCkpO1xuICB9O1xuXG4gIHJldHVybiB7IGNyZWF0ZUdhbWVib2FyZCwgZ2V0R2FtZWJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIFxuICAgIGdldE1pc3NlZEF0dGFja3MsIGFyZUFsbFNoaXBzU3VuaywgaGFzU2hvdENvb3Jkc0JlZm9yZSwgcGxhY2VBaVNoaXBzLCBnZXRTaGlwc0Nvb3JkaW5hdGVzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7IiwiY29uc3QgcGxheWVyID0gKG5hbWUsIGdhbWVib2FyZCkgPT4ge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQ7XG4gIGNvbnN0IHNob3RzID0gW107XG5cbiAgY29uc3QgZ2V0UGxheWVyTmFtZSA9ICgpID0+IHBsYXllck5hbWU7XG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG4gIGNvbnN0IGdldFNob3RzID0gKCkgPT4gc2hvdHM7XG5cbiAgY29uc3QgaGFzU2hvdENvb3Jkc0JlZm9yZSA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgc2hvdHMuZm9yRWFjaCgoc2hvdCkgPT4ge1xuICAgICAgaWYgKHNob3RbMF0gPT09IHJvdyAmJiBzaG90WzFdID09PSBjb2x1bW4pIHtcbiAgICAgICAgZmxhZyA9ICB0cnVlO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmxhZztcbiAgfTtcbiAgXG4gIGNvbnN0IGNob29zZVJhbmRvbVNob3QgPSAoKSA9PiB7XG4gICAgbGV0IHJldHVyblZhbHVlO1xuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgXG4gICAgaWYgKCFoYXNTaG90Q29vcmRzQmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgc2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHJldHVyblZhbHVlID0gW3JvdywgY29sdW1uXTtcbiAgICB9IGVsc2UgaWYgKGhhc1Nob3RDb29yZHNCZWZvcmUocm93LCBjb2x1bW4pKSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IGNob29zZVJhbmRvbVNob3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xuXG4gIHJldHVybiB7IGdldFBsYXllck5hbWUsIGdldEJvYXJkLCBnZXRTaG90cywgY2hvb3NlUmFuZG9tU2hvdCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IGxlbmd0aE9mU2hpcCA9IGxlbmd0aDtcbiAgbGV0IG51bU9mSGl0cyA9IDA7XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoT2ZTaGlwO1xuICAvLyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICBjb25zdCBnZXROdW1PZkhpdHMgPSAoKSA9PiBudW1PZkhpdHM7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIG51bU9mSGl0cysrO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IChsZW5ndGhPZlNoaXAgLSBudW1PZkhpdHMpID09PSAwO1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rLCBnZXRMZW5ndGgsIGdldE51bU9mSGl0cyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJsZXQgc2hpcExlbmd0aDtcblxuY29uc3QgZGlzcGxheVBsYXllckdhbWVib2FyZCA9IChwbGF5ZXIsIGdhbWVib2FyZCkgPT4ge1xuICBsZXQgcGFyZW50Q29udGFpbmVyO1xuICBpZiAocGxheWVyLmdldFBsYXllck5hbWUoKSA9PT0gXCJhaVwiKSBwYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JpZ2h0XCIpO1xuICBlbHNlIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGVmdFwiKTtcbiBcbiAgLy8gY2xlYXJzIGl0IGZpcnN0IHRoZW4gYWRkcyB0aGUgZ2FtZWJvYXJkIHRvIHByZXZlbnQgZHVwbGljYXRpb25cbiAgcGFyZW50Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKCkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHJvd051bSA9IGk7XG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbk51bSA9IGo7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvd051bTtcbiAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW5OdW07XG5cbiAgICAgIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwieFwiKSBjZWxsLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgICBlbHNlIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwib1wiKSB7XG4gICAgICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIm9cIjtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJtXCIpIGNlbGwudGV4dENvbnRlbnQgPSBcIm1cIjtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICAgIHBhcmVudENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG59O1xuXG5jb25zdCBjcmVhdGVFbmRHYW1lRGlzcGxheSA9ICh3aW5uZXIsIGNiKSA9PiB7XG4gIGNvbnN0IGRpc3BsYXlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCB3aW5uZXJEaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgcGxheUFnYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICB3aW5uZXJEaXNwbGF5LnRleHRDb250ZW50ID0gYCR7d2lubmVyfSBoYXMgd29uIWA7XG4gIHBsYXlBZ2Fpbi50ZXh0Q29udGVudCA9IFwiUGxheSBBZ2FpblwiO1xuICBwbGF5QWdhaW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNiKTtcblxuICBkaXNwbGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHdpbm5lckRpc3BsYXkpO1xuICBkaXNwbGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXlBZ2Fpbik7XG5cbiAgcmV0dXJuIGRpc3BsYXlDb250YWluZXI7XG59O1xuXG5jb25zdCBkaXNwbGF5RW5kR2FtZURpc3BsYXkgPSAod2lubmVyLCBjYikgPT4ge1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG4gIGNvbnN0IGVuZEdhbWVEaXNwbGF5ID0gY3JlYXRlRW5kR2FtZURpc3BsYXkod2lubmVyLCBjYik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoZW5kR2FtZURpc3BsYXkpO1xufTtcblxuY29uc3QgY3JlYXRlTW9kYWwgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgbWVzc2FnZS50ZXh0Q29udGVudCA9IFwiUGxhY2UgWW91ciBTaGlwc1wiO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByb3dOdW0gPSBpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjb2x1bW5OdW0gPSBqO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dOdW07XG4gICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uTnVtO1xuXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcInhcIikgY2VsbC50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm9cIikgY2VsbC50ZXh0Q29udGVudCA9IFwib1wiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm1cIikgY2VsbC50ZXh0Q29udGVudCA9IFwibVwiO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBpKzE7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgc2hpcC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcCk7XG4gIH1cbiAgc2hpcHNDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzaGlwcy1jb250YWluZXJcIik7XG4gIG1vZGFsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9kYWxcIik7XG5cbiAgbW9kYWwuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XG4gIG1vZGFsLmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcbiAgbW9kYWwuYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICByZXR1cm4gbW9kYWw7XG59O1xuXG5jb25zdCBkaXNwbGF5TW9kYWwgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IG1vZGFsID0gY3JlYXRlTW9kYWwoZ2FtZWJvYXJkKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG59O1xuXG5jb25zdCBkcmFnU3RhcnRFdmVudEhhbmRsZXIgPSAoZSwgZ2FtZWJvYXJkKSA9PiB7XG4gIC8vIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCApXG4gIC8vIG1heWJlIHVzZSBlLmRhdGFUcmFuc2Zlci5zZXREYXRhIHRvIHRyYW5zZmVyIHRoZSBkYXRhIG9mIHRoZSBsZW5ndGggdGhlIHNoaXA/P1xuICAvLyBtYXliZSB1c2UgdGhhdCBmdW5jdGlvbiB0byBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgc2hpcCwgYW5kIG1heWJlIGhhdmUgY2VsbC5hZGRFdmVudExpc3RlbmVyIGluIGRpc3BsYXkgZnVuY3Rpb25cbiAgLy8gc28gd2hlbiBkcmFnU3RhcnRzLCB3ZSBqdXN0IGNhbGwgdGhpcyBmdW5jdGlvbiBhbmQgaXQgd2lsbCByZXR1cm4gdGhlIGNvcnJlY3QgbGVuZ3RoIG9mIHRoZSBzaGlwXG4gIC8vIG1heWJlIHdlIGNvdWxkIGhhdmUgYSBnbG9iYWwgdmFyaWFibGUgYW5kIGl0IHdpbGwganVzdCBjaGFuZ2UgdGhhdCBnbG9iYWwgdmFyaWFibGVcbiAgLy8gc28gdGhhdCB3aGVuIHRoZXkgc3RhcnQgZHJhZ2dpbmcgdGhlIHNoaXAsIHdlIGNhbiBoYXZlIHRoZSBjb3JyZWN0IGxlbmd0aCBvZiB0aGUgc2hpcCBiZWluZyBkcmFnZ2VkXG4gIGNvbnNvbGUubG9nKFwiZHJhZyBzdGFydFwiKTtcbiAgY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbiAgY29uc3QgY29sdW1uID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0U2hpcHNDb29yZGluYXRlcygpLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKClbaV0ucm93ID09PSByb3cgJiYgKGNvbHVtbiA+PSBnYW1lYm9hcmQuZ2V0U2hpcHNDb29yZGluYXRlcygpW2ldLmNvbHVtbiAmJiAoY29sdW1uIDwgKGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKClbaV0uY29sdW1uICsgZ2FtZWJvYXJkLmdldFNoaXBzQ29vcmRpbmF0ZXMoKVtpXS5zaGlwLmdldExlbmd0aCgpKSkpKSB7XG4gICAgICBzaGlwTGVuZ3RoID0gZ2FtZWJvYXJkLmdldFNoaXBzQ29vcmRpbmF0ZXMoKVtpXS5zaGlwLmdldExlbmd0aCgpO1xuICAgICAgY29uc29sZS5sb2coc2hpcExlbmd0aCk7XG4gICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBlLnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBkcmFnRXZlbnRIYW5kbGVyID0gKGUpID0+IHtcbiAgY29uc29sZS5sb2coXCJkcmFnZ2VkXCIpO1xuICAvLyBtYXliZSByZWZhY3RvciBkaXNwbGF5R2FtYm9hcmQgZnVuY3Rpb25cbiAgLy8gaSBkb24ndCBuZWNlc3NhcmlseSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBlYWNoIGNlbGwgb24gdGhlIGJvYXJkLCBcbiAgLy8gYnV0IGlmIGkgZG9uJ3QgbG9vcCB0aHJvdWdoIGVhY2ggY2VsbCBvbiB0aGUgYm9hcmQsIFxuICAvLyB0aGVuIGkgd291bGQgaGF2ZSB0byBhbHJlYWR5IGhhdmUgYSAxMHgxMCBib2FyZCwgXG4gIC8vIGFuZCBpIHdvdWxkIGp1c3QgcGxhY2Uvc3R5bGUgaW5kaXZpZHVhbCBjZWxscyB0aGF0IGFyZSBzaGlwIHBhcnRzXG5cbiAgLy8gb3IgbWF5YmUgZm9yIGVhY2ggaW5kaXZpZHVhbCBjZWxsIHJlcHJlc2VudGluZyBhIHBhcnQgb2YgYSBzaGlwLCBcbiAgLy8gYWRkIGEgY2xhc3MgbGlrZSBzaGlwLiR7c2hpcGxlbmd0aH0gdG8gZWFjaCBvZiB0aG9zZSBpbmRpdmlkdWFsIHBhcnRzLCBcbiAgLy8gdGhlbiB3aGVuIHdlIGRyYWcgc3RhcnQsIFxuICAvLyB3ZSBjb3VsZCBzZWxlY3QgYWxsIHRob3NlIGluZGl2aWR1YWwgc2hpcCBwYXJ0cyAobWF5YmU/KSBhbmQgdXNlIHRoZSBkYXRhVHJhbnNmZXIuc2V0RGF0YSBmdW5jdGlvbiBvbiBpdD9cblxuICAvLyBvciBtYXliZSB3ZSBjb3VsZCBnZXQgdGhlIGRlZmF1bHQgaW1hZ2Ugc2hvd24gYW5kIG11bHRpcGx5IGl0IG9yIHNvbWV0aGluZ1xufTtcblxuY29uc3QgZHJvcEV2ZW50SGFuZGxlciA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc29sZS5sb2coXCJkcm9wcGVkXCIpO1xuICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gIGUudGFyZ2V0LnRleHRDb250ZW50ID0gZGF0YTtcbn07XG5cbmV4cG9ydCB7IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQsIGRpc3BsYXlFbmRHYW1lRGlzcGxheSwgZGlzcGxheU1vZGFsIH07XG5cbi8vIGFjY29yZGluZyB0byB3ZWJkZXYgc2ltcGxpZmllZCdzIHZpZGVvLCB0aGVyZSBhcmUgZHJhZyBhbmQgZHJvcCBldmVudHMsIHNvIGkgc2hvdWxkIGJlIGFibGUgdG8gZHJhZ1xuLy8gdGhlIHNoaXBzIGFuZCBkcm9wIHRoZW0gaW4gdGhlIGNvbnRhaW5lclxuLy8gc28gaSBuZWVkIHRvIGtub3cgaG93IGkgY2FuIGRpZmZlcmVudGlhdGUgZWFjaCBpbmRpdmlkdWFsIHNoaXBcbi8vIG1heWJlIGkgY2FuIG9ubHkgZHJhZyBhbmQgZHJvcCBhZnRlciBjbGlja2luZyBlYWNoIHNoaXAgb25jZSwgXG4vLyBzbyBjbGlja2luZyBpdCBvbmNlIGFsbG93cyBmb3IgZHJhZyBhbmQgZHJvcFxuLy8gYW5kIHRoYXQgY2xpY2sgd2lsbCBpZGVudGlmeSB0aGUgc2hpcCBieSBnb2luZyB0aHJvdWdoIHRoZSBzaGlwIGNvb3JkcyBhbmQgaWRlbnRpZnlpbmcgd2hpY2ggZWxlbWVudCBpdCBpc1xuLy8gYW5kIHRoZW4gd2hlbiB0aGV5J3JlIGRyYWdnaW5nIGFuZCBhYm91dCB0byBkcm9wLCBpdCBzaG91bGQgY2hlY2sgaWYgaXQgaXMgYSB2YWxpZCBjb29yZFxuLy8gaWYgaXQgaXMgdGhlbiBkcm9wIGl0LCBpZiBub3QgdGhlbiBwdXQgdGhlIHNoaXAgYmFjayB0byB3aGVyZSBpdCB3YXNcblxuLy8gd2hlbiBpbSB0cnlpbmcgdG8gZHJhZyBhbmQgZHJvcCwgdG8gYmUgYWJsZSB0byAnZHJhZycgYW5kICdkcm9wJyB0aGUgc2hpcCwgb25jZSBpIGNsaWNrL3N0YXJ0IGRyYWdnaW5nXG4vLyBpdCBzaG91bGQgZmluZCB0aGUgcmlnaHQgc2hpcCBpbiB0aGUgc2hpcCBjb29yZHNcbi8vIHNvIHRoYXQgd2hlbiBpIGRyb3AgaXQsIGl0IHdpbGwgZGlzcGxheSBjb3JyZWN0bHk7IGl0IHdpbGwgZGlzcGxheSB0aGUgY29ycmVjdCBzaGlwIGxlbmd0aFxuLy8gb25jZSBpIGZpbmQgdGhlIHJpZ2h0IHNoaXAgbGVuZ3RoIGZyb20gc3RhcnRpbmcgdGhlIGRyYWdcbi8vIHdoaWxlIGRyYWdnaW5nIGl0IG92ZXIsIGkgc2hvdWxkIGJlIGNoZWNrIGlmIGl0IGlzIGEgdmFsaWQgY29vcmRpbmF0ZSwgb25seSB0aGVuIGNhbiBpdCBiZSBkcm9wcGVkXG4vLyBvbmNlIGl0J3MgZHJvcHBlZCBpdCBzaG91bGQganVzdCBjaGFuZ2UgdGhlIGNvcnJlY3QgZWxlbWVudCBmcm9tIHRoZSBhcnJheSwgY2hhbmdlIHRoZSByb3cvY29sdW1uXG4vLyBhbmQgdGhlbiBzaW5jZSB3ZSdyZSB2YWxpZGluZyBjb29yZHMgYW5kIHBsYWNpbmcgc2hpcCwgaXQgc2hvdWxkIHBsYWNlIGl0IGNvcnJlY3RseVxuXG4vLyB1c2Ugc2V0RHJhZ0ltYWdlIGZ1bmN0aW9uIHRvIG1ha2UgaXQgbG9vayBsaWtlIHlvdSdyZSBkcmFnZ2ludCB0aGUgd2hvbGUgdGhpbmdcbi8vIGkgZmlyc3QgbmVlZCB0byB1bmRlcnN0YW5kIGVhY2ggZHJhZy9kcm9wIGV2ZW50IGFuZCB0aGVuIGZpZ3VyZSBvdXQgd2hhdCBpIG5lZWQgdG8gcHV0IGluIGVhY2ggb2YgdGhvc2VcblxuLy8gbG9vayBhdCBteSBub3RlcyBvbiBub3RlYm9vaywgSSBnb3QgdGhlIGRyYWdzdGFydCBkb25lIG5vdyBpIHRoaW5rXG4vLyBpIHNob3VsZCBpbXBsZW1lbnQgc2hvd2luZyBhbGwgdGhlIHNoaXAgYmVpbmcgZHJhZ2dlZCBidXQgcm5cbi8vIG9yIG1heWJlIGkgZG8gbmVlZCB0byB1c2UgdGhlIGRhdGFUcmFuc2Zlci5zZXREYXRhIHNvIHRoYXQgaXQga25vd3MgaG93ICdsb25nJyB0aGUgc2hpcCBpcz9cbi8vIGkgY2FuIGp1c3QgZm9jdXMgb24gZmlyc3QgZHJvcHBpbmcgdGhlIHRoaW5nIGkgYW0gZHJhZ2dpbmcsIGl0IG1pZ2h0IGJlIGVhc2llciBsYXRlciBvbiBpZiBpIGRvIHRoaXMgZmlyc3RcblxuLy8gZnJvbSBkcmFnIGFuZCBkcm9wIG1kbiBkb2NzXG4vLyBFYWNoIERhdGFUcmFuc2ZlciBvYmplY3QgY29udGFpbnMgYW4gaXRlbXMgcHJvcGVydHksIFxuLy8gd2hpY2ggaXMgYSBsaXN0IG9mIERhdGFUcmFuc2Zlckl0ZW0gb2JqZWN0cy4gXG4vLyBBIERhdGFUcmFuc2Zlckl0ZW0gb2JqZWN0IHJlcHJlc2VudHMgYSBzaW5nbGUgZHJhZyBpdGVtLCBlYWNoIHdpdGggYSBraW5kIHByb3BlcnR5IChlaXRoZXIgc3RyaW5nIG9yIGZpbGUpIFxuLy8gYW5kIGEgdHlwZSBwcm9wZXJ0eSBmb3IgdGhlIGRhdGEgaXRlbSdzIE1JTUUgdHlwZS4gXG4vLyBUaGUgRGF0YVRyYW5zZmVySXRlbSBvYmplY3QgYWxzbyBoYXMgbWV0aG9kcyB0byBnZXQgdGhlIGRyYWcgaXRlbSdzIGRhdGEuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgR2FtZS5jcmVhdGVOZXdHYW1lKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==