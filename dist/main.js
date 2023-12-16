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
    const ship1 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
    const ship2 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
    gameboard1.placeShip(0, 0, ship1);
    gameboard1.placeShip(1, 0, ship2);
    gameboard2.placeAiShips();

    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(player1, gameboard1);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(player2, gameboard2);

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
    getMissedAttacks, areAllShipsSunk, hasShotCoordsBefore, placeAiShips };
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
/* harmony export */   displayPlayerGameboard: () => (/* binding */ displayPlayerGameboard)
/* harmony export */ });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxrQkFBa0IscUNBQXFDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3Q0FBd0M7QUFDNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUMvQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rQzs7QUFFbEM7QUFDQSxFQUFFLHFEQUFJO0FBQ04sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCBkaXNwbGF5RW5kR2FtZURpc3BsYXl9IGZyb20gXCIuL3VpLmpzXCI7XG5cbmNvbnN0IEdhbWUgPSAoKCkgPT4ge1xuICBsZXQgcGxheWVyMTtcbiAgbGV0IHBsYXllcjI7XG4gIGxldCBnYW1lYm9hcmQxO1xuICBsZXQgZ2FtZWJvYXJkMjtcbiAgbGV0IGFjdGl2ZVBsYXllcjtcbiAgbGV0IG9wcG9zaW5nUGxheWVyO1xuXG4gIGNvbnN0IGNyZWF0ZU5ld0dhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZWJvYXJkMSA9IEdhbWVib2FyZCgpO1xuICAgIGdhbWVib2FyZDIgPSBHYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXIxID0gcGxheWVyKFwiSm9oblwiLCBnYW1lYm9hcmQxKTtcbiAgICBwbGF5ZXIyID0gcGxheWVyKFwiYWlcIiwgZ2FtZWJvYXJkMik7XG4gICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG5cbiAgICAvLyB0ZXN0XG4gICAgY29uc3Qgc2hpcDEgPSBTaGlwKDMpO1xuICAgIGNvbnN0IHNoaXAyID0gU2hpcCgzKTtcbiAgICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgwLCAwLCBzaGlwMSk7XG4gICAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoMSwgMCwgc2hpcDIpO1xuICAgIGdhbWVib2FyZDIucGxhY2VBaVNoaXBzKCk7XG5cbiAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKHBsYXllcjEsIGdhbWVib2FyZDEpO1xuICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQocGxheWVyMiwgZ2FtZWJvYXJkMik7XG5cbiAgICBjb25zdCBzdGFydEdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIHN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheUdhbWUpO1xuICB9O1xuICBcbiAgY29uc3Qgc3dpdGNoQWN0aXZlUGxheWVyID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjI7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjE7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNyaWdodCAuY2VsbFwiKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItYXJyb3ctY2FsbGJhY2tcbiAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiBldmVudEhhbmRsZXIoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuXG4gICAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmhhc1Nob3RDb29yZHNCZWZvcmUocGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKSwgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKSkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhhcyBzaG90IHRoZXJlIGJlZm9yZVwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKTtcbiAgICAgICAgZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG5cbiAgICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuYXJlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgYWxsIHNoaXBzIGFyZSBzdW5rIGZvciBwbGF5ZXIgJHtvcHBvc2luZ1BsYXllci5nZXRQbGF5ZXJOYW1lKCl9YCk7XG4gICAgICAgICAgLy8gYWRkIHNvbWUgZW5kIGdhbWUgc3R1ZmZcbiAgICAgICAgICBkaXNwbGF5RW5kR2FtZURpc3BsYXkoYWN0aXZlUGxheWVyLmdldFBsYXllck5hbWUoKSwgY3JlYXRlTmV3R2FtZSk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXIpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQob3Bwb3NpbmdQbGF5ZXIsIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkpO1xuICAgICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcbiAgICAgICAgcGxheUdhbWUoKTtcbiAgICAgIH0pKTtcbiAgICB9IFxuICAgIFxuICAgIGVsc2Uge1xuICAgICAgY29uc3Qgc2hvdCA9IGFjdGl2ZVBsYXllci5jaG9vc2VSYW5kb21TaG90KCk7XG4gICAgICBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLnJlY2VpdmVBdHRhY2soc2hvdFswXSwgc2hvdFsxXSk7XG4gICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICBcbiAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBhbGwgc2hpcHMgYXJlIHN1bmsgZm9yIHBsYXllcm1pa2tvICR7b3Bwb3NpbmdQbGF5ZXIuZ2V0UGxheWVyTmFtZSgpfWApO1xuICAgICAgICAvLyBhZGQgc29tZSBlbmQgZ2FtZSBzdHVmZlxuICAgICAgICBkaXNwbGF5RW5kR2FtZURpc3BsYXkoYWN0aXZlUGxheWVyLmdldFBsYXllck5hbWUoKSwgY3JlYXRlTmV3R2FtZSk7XG4gICAgICB9XG4gICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcbiAgICAgIHBsYXlHYW1lKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGNyZWF0ZU5ld0dhbWUsIHBsYXlHYW1lIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuXG4vLyBtYXliZSB3aGVuIGkgaW1wbGVtZW50IGRyYWcgYW5kIGRyb3AsIGkgY2FuIGhhdmUgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGUgc2hpcCB3aWxsIG92ZXJsYXAvZ28gb3V0IG9mIGJvYXJkXG4vLyBpZiB0aGF0J3MgdHJ1ZSB0aGVuIGRvbnQnIHBsYWNlIGVsc2UgcGxhY2UgaXRcbi8vIG1heWJlIGlmIGNvb3JkaW5hdGVzIGlzIGluIHNoaXBzIGNvb3JkaW5hdGVzLCB0aGVuIHJldHVybj8/P1xuLy8gYWZ0ZXIgaSBnZXQgYWkgdG8gcGxhY2UgaXRzIHNoaXBzIHJhbmRvbWx5LCBpIG5lZWQgdG8gY2hlY2sgdGhlIGdhbWVib2FyZCBmdW5jdGlvbnNcbi8vIG5vdyBpIGNhbiBjcmVhdGUgYSBuZXcgZ2FtZSBvbiBsb2FkLCB0aGVuIHN0YXJ0IGEgZ2FtZSBpZiBpIGhpdCBidXR0b24sIHRoZW4gaSBjYW4gZW5kIHRoZSBnYW1lIGFmdGVyIHNvbWVvbmUgd2lucyIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBbXTtcbiAgY29uc3Qgc2hpcHNDb29yZGluYXRlcyA9IFtdO1xuICBjb25zdCBtaXNzZWRBdHRhY2tzID0gW107XG5cbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT4gZ2FtZWJvYXJkO1xuXG4gIGNvbnN0IGdldE1pc3NlZEF0dGFja3MgPSAoKSA9PiBtaXNzZWRBdHRhY2tzO1xuXG4gIGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKFwiLVwiKTtcbiAgICAgIH1cbiAgICAgIGdhbWVib2FyZC5wdXNoKHJvdyk7XG4gICAgfVxuICB9O1xuICBjcmVhdGVHYW1lYm9hcmQoKTtcbiAgXG4gIC8vIGhvdyBkbyBpIG1ha2UgaXQgc28gdGhhdCBzaGlwcyB3b24ndCBvdmVybGFwIGFuZCBzaGlwcyB3b24ndCBnbyBvdXQgb2YgYm9hcmQ/XG4gIC8vIHRvIG1ha2Ugc2hpcHMgbm90IG92ZXJsYXAsIHNpbmNlIHdlJ3JlIG9ubHkgZG9pbmcgdGhpbmdzIGhvcml6b250YWxseSwgXG4gIC8vIGlmIHJvdyBpcyBpbiBzaGlwc0Nvb3JkaW5hdGVzIGNoZWNrIGlmIGNvbHVtbiBpcyBncmVhdGVyIHRoYW4gdGhhdCBjb3JyZXNwb25kaW5nIGNvbHVtbiBhbmQgbGVzcyB0aGFuIGNvbHVtbiArIHNoaXAgbGVuZ3RoXG4gIC8vIGlmIGl0IGlzIHRoZW4gdGhhdCBpcyBhbiBpbnZhbGlkIHJvdy9jb2x1bW5cbiAgLy8gdG8gbWFrZSBzaGlwcyBub3QgZ28gb3V0IG9mIGJvYXJkLCBcbiAgLy8gaWYgY29sdW1uIChzaW5jZSBzaGlwcyBhcmUgb25seSBnb2luZyBob3Jpem9udGFsbHkpICsgc2hpcCBsZW5ndGggPiAxMCAod2hpY2ggaXMgdGhlIGxlbmd0aCBvZiBib2FyZCkgXG4gIC8vIHRoZW4gc2F5IHNvbWV0aGluZyBhYm91dCBob3cgaXQncyBpbnZhbGlkXG4gIC8vIGFuZCB3aGF0IGRvIGkgZG8gaWYgaSBkbyBnZXQgcm93L2NvbHVtbi9zaGlwIGxlbmd0aCB0aGF0IGFyZSBpbnZhbGlkPyBcbiAgLy8gbWF5YmUgd29ycnkgYWJvdXQgdGhpcyBsYXRlciwgYmVjYXVzZSBpdCdzIG5vdCB0aGF0IHVyZ2VudFxuICAvLyBtYXliZSByZWZhY3RvciBpdCBpbiBhIHdheSB3aGVyZSBvbmx5IHZhbGlkIGNvb3JkaW5hdGVzIGFyZSBnaXZlbj9cbiAgLy8gbWF5YmUgdGhpcyBpcyBhIGZ1bmN0aW9uIGZvciBkcmFnIGFuZCBkcm9wP1xuICBjb25zdCBwbGFjZVNoaXAgPSAocm93LCBjb2x1bW4sIHNoaXApID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgLy8gXCJvXCIgbWVhbnMgdGhlcmUgaXMgYSBzaGlwL3BhcnQgb2YgYSBzaGlwIG9uIHRob3NlIGNvb3Jkc1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uK2ldID0gXCJvXCI7XG4gICAgfVxuICAgIHNoaXBzQ29vcmRpbmF0ZXMucHVzaCh7cm93LCBjb2x1bW4sIHNoaXB9KTsgXG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9cIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHNoaXBzQ29vcmRpbmF0ZXNbaV07XG4gICAgICAgIGlmIChyb3cgPT09IG9iai5yb3cgJiYgKGNvbHVtbiA+PSBvYmouY29sdW1uICYmIGNvbHVtbiA8IG9iai5jb2x1bW4gKyBvYmouc2hpcC5nZXRMZW5ndGgoKSkpIHtcbiAgICAgICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJ4XCI7XG4gICAgICAgICAgb2JqLnNoaXAuaGl0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWlzc2VkQXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9IFwibVwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhcmVBbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgc2hpcHNTdW5rID0gc2hpcHNDb29yZGluYXRlcy5yZWR1Y2UoIChhY2MsIGN1cikgPT4ge1xuICAgICAgaWYgKGN1ci5zaGlwLmlzU3VuaygpKSByZXR1cm4gYWNjICsgMTtcbiAgICAgIHJldHVybiBhY2MgKyAwO1xuICAgIH0sIDApO1xuICAgIFxuICAgIHJldHVybiBzaGlwc1N1bmsgPT09IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGhhc1Nob3RDb29yZHNCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm1cIiB8fCBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcInhcIikgZmxhZyA9IHRydWU7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IDQpIHtcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBzaGlwID0gU2hpcChpKzIpO1xuICAgICAgLy8gbWF5YmUgY2hlY2sgaWYgY29sdW1uICsgc2hpcCBsZW5ndGggaXMgZ3JlYXRlciB0aGFuIDEwIGhlcmUgYWxyZWFkeSBzbyB3ZSBjYW4ganVzdCBjb250aW51ZVxuICAgICAgc2hpcENvb3Jkcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKHJvdyA9PT0gZWwucm93ICYmIChjb2x1bW4gPj0gZWwuY29sdW1uICYmIGNvbHVtbiA8IChlbC5jb2x1bW4gKyBlbC5zaGlwLmdldExlbmd0aCgpKSkpIHtcbiAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChyb3cgPT09IGVsLnJvdykge1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc2hpcC5nZXRMZW5ndGgoKTsgaysrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb2x1bW4gPSBjb2x1bW47XG4gICAgICAgICAgICBpZiAoKChuZXdDb2x1bW4gKyBrICsgMSkgPj0gZWwuY29sdW1uKSAmJiAoKG5ld0NvbHVtbiArIGsgKyAxKSA8IChlbC5jb2x1bW4gKyBlbC5zaGlwLmdldExlbmd0aCgpKSkpIGZsYWcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgIH0pO1xuICAgICAgaWYgKGZsYWcgfHwgY29sdW1uICsgc2hpcC5nZXRMZW5ndGgoKSA+IDEwKSB7XG4gICAgICAgIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgLy8gaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcENvb3Jkcy5wdXNoKHtyb3csIGNvbHVtbiwgc2hpcH0pO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaGlwQ29vcmRzO1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlQWlTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwQXJyID0gZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMoKTtcbiAgICBzaGlwQXJyLmZvckVhY2gob2JqID0+IHBsYWNlU2hpcChvYmoucm93LCBvYmouY29sdW1uLCBvYmouc2hpcCkpO1xuICB9O1xuXG4gIHJldHVybiB7IGNyZWF0ZUdhbWVib2FyZCwgZ2V0R2FtZWJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIFxuICAgIGdldE1pc3NlZEF0dGFja3MsIGFyZUFsbFNoaXBzU3VuaywgaGFzU2hvdENvb3Jkc0JlZm9yZSwgcGxhY2VBaVNoaXBzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7IiwiY29uc3QgcGxheWVyID0gKG5hbWUsIGdhbWVib2FyZCkgPT4ge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQ7XG4gIGNvbnN0IHNob3RzID0gW107XG5cbiAgY29uc3QgZ2V0UGxheWVyTmFtZSA9ICgpID0+IHBsYXllck5hbWU7XG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG4gIGNvbnN0IGdldFNob3RzID0gKCkgPT4gc2hvdHM7XG5cbiAgY29uc3QgaGFzU2hvdENvb3Jkc0JlZm9yZSA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgc2hvdHMuZm9yRWFjaCgoc2hvdCkgPT4ge1xuICAgICAgaWYgKHNob3RbMF0gPT09IHJvdyAmJiBzaG90WzFdID09PSBjb2x1bW4pIHtcbiAgICAgICAgZmxhZyA9ICB0cnVlO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmxhZztcbiAgfTtcbiAgXG4gIGNvbnN0IGNob29zZVJhbmRvbVNob3QgPSAoKSA9PiB7XG4gICAgbGV0IHJldHVyblZhbHVlO1xuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgXG4gICAgaWYgKCFoYXNTaG90Q29vcmRzQmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgc2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHJldHVyblZhbHVlID0gW3JvdywgY29sdW1uXTtcbiAgICB9IGVsc2UgaWYgKGhhc1Nob3RDb29yZHNCZWZvcmUocm93LCBjb2x1bW4pKSB7XG4gICAgICByZXR1cm5WYWx1ZSA9IGNob29zZVJhbmRvbVNob3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xuXG4gIHJldHVybiB7IGdldFBsYXllck5hbWUsIGdldEJvYXJkLCBnZXRTaG90cywgY2hvb3NlUmFuZG9tU2hvdCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IGxlbmd0aE9mU2hpcCA9IGxlbmd0aDtcbiAgbGV0IG51bU9mSGl0cyA9IDA7XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoT2ZTaGlwO1xuICAvLyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICBjb25zdCBnZXROdW1PZkhpdHMgPSAoKSA9PiBudW1PZkhpdHM7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIG51bU9mSGl0cysrO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IChsZW5ndGhPZlNoaXAgLSBudW1PZkhpdHMpID09PSAwO1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rLCBnZXRMZW5ndGgsIGdldE51bU9mSGl0cyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJjb25zdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkID0gKHBsYXllciwgZ2FtZWJvYXJkKSA9PiB7XG4gIGxldCBwYXJlbnRDb250YWluZXI7XG4gIGlmIChwbGF5ZXIuZ2V0UGxheWVyTmFtZSgpID09PSBcImFpXCIpIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmlnaHRcIik7XG4gIGVsc2UgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0XCIpO1xuIFxuICAvLyBjbGVhcnMgaXQgZmlyc3QgdGhlbiBhZGRzIHRoZSBnYW1lYm9hcmQgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBwYXJlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3Qgcm93TnVtID0gaTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY29sdW1uTnVtID0gajtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcInhcIikgY2VsbC50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm9cIikgY2VsbC50ZXh0Q29udGVudCA9IFwib1wiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm1cIikgY2VsbC50ZXh0Q29udGVudCA9IFwibVwiO1xuICAgICAgICBcbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dOdW07XG4gICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uTnVtO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZUVuZEdhbWVEaXNwbGF5ID0gKHdpbm5lciwgY2IpID0+IHtcbiAgY29uc3QgZGlzcGxheUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHdpbm5lckRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBwbGF5QWdhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gIHdpbm5lckRpc3BsYXkudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9IGhhcyB3b24hYDtcbiAgcGxheUFnYWluLnRleHRDb250ZW50ID0gXCJQbGF5IEFnYWluXCI7XG4gIHBsYXlBZ2Fpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2IpO1xuXG4gIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQod2lubmVyRGlzcGxheSk7XG4gIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheUFnYWluKTtcblxuICByZXR1cm4gZGlzcGxheUNvbnRhaW5lcjtcbn07XG5cbmNvbnN0IGRpc3BsYXlFbmRHYW1lRGlzcGxheSA9ICh3aW5uZXIsIGNiKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgZW5kR2FtZURpc3BsYXkgPSBjcmVhdGVFbmRHYW1lRGlzcGxheSh3aW5uZXIsIGNiKTtcbiAgYm9keS5hcHBlbmRDaGlsZChlbmRHYW1lRGlzcGxheSk7XG59O1xuXG5leHBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCBkaXNwbGF5RW5kR2FtZURpc3BsYXl9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWUgZnJvbSBcIi4vbW9kdWxlcy9nYW1lXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIEdhbWUuY3JlYXRlTmV3R2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=