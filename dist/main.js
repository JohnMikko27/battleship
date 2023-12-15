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

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;
  // will probably have to add name parameters later so that players can set their names
  const createNewGame = () => {
    gameboard1 = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    gameboard2 = (0,_gameboard_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
    player1 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("John", gameboard1);
    player2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("ai", gameboard2);
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
  const ship1 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  const ship2 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  gameboard1.placeShip(0, 0, ship1);
  gameboard1.placeShip(1, 0, ship2);


  const ship3 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  const ship4 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  gameboard2.placeShip(0, 0, ship3);
  gameboard2.placeShip(2, 0, ship4);

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

        (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__["default"])(opposingPlayer, opposingPlayer.getBoard());
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
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__["default"])(opposingPlayer, opposingPlayer.getBoard());
      switchActivePlayer();
      playGame();
    }
  };

  return { createNewGame, getPlayer1, getPlayer2, playGame };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

// now i have a both boards working with the receiveAttack, placeShip, and allShipsSunk functions
// now i need to make ai place its ships randomly
// i probably also need to refactor placeships and make sure that it only takes valid coordinates
// how do i make placeShips know if its a valid coordinate
// maybe if coordinates is in ships coordinates, then return???
// after i get ai to place its ships randomly, i need to check the gameboard functions


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

  return { createGameboard, getGameboard, placeShip, receiveAttack, getMissedAttacks, areAllShipsSunk, hasShotCoordsBefore };
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
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/modules/ship.js");


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

  const getRandomShipPlacements = () => {
    const shipCoords = [];
    let i = 0;
    while (i < 4) {
      let flag = false;
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const ship = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i+1);
      // maybe check if column + ship length is greater than 10 here already so we can just continue
      shipCoords.forEach(el => {
        // this doesn't check for the whole ship 
        // bc it only checks for that specific column coordinate and it doesn't check the whole ship
        // so we need to compare the new column + new ship length 
        // with each ship col + ship length in ship Coords
        if (row === el.row && column >= el.column && column < el.column + el.ship.getLength()) {
          flag = true;
        } else if (row === el.row) {
          for (let k = 0; k < ship.getLength(); k++) {
            const newColumn = column;
            if ((newColumn + 1 >= el.column) && (newColumn + 1 < el.column + el.ship.getLength())) flag = true;
          }
        } 
      });
      if (flag || column + ship.getLength() < 10) {
        flag = false;
        // eslint-disable-next-line no-continue
        continue;
      }
      shipCoords.push({row, column, ship});
      i++;
    }
    return shipCoords;
  };

  return { getPlayerName, getBoard, getShots, chooseRandomShot, getRandomShipPlacements };
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayPlayerGameboard);
// export { displayPlayerGameboard, };

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
/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ "./src/modules/ui.js");
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");



window.addEventListener("load", () => {
  (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"])(_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer1(), _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer1().getBoard());
  (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"])(_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer2(), _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer2().getBoard());
  _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].playGame();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0Esb0JBQW9CLHdDQUF3QztBQUM1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxzQkFBc0IsRUFBQztBQUN0QyxZQUFZOzs7Ozs7VUM3Qlo7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOa0Q7QUFDaEI7O0FBRWxDO0FBQ0EsRUFBRSx1REFBc0IsQ0FBQyxxREFBSSxlQUFlLHFEQUFJO0FBQ2hELEVBQUUsdURBQXNCLENBQUMscURBQUksZUFBZSxxREFBSTtBQUNoRCxFQUFFLHFEQUFJO0FBQ04sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgZGlzcGxheVBsYXllckdhbWVib2FyZCBmcm9tIFwiLi91aS5qc1wiO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjE7XG4gIGxldCBwbGF5ZXIyO1xuICBsZXQgZ2FtZWJvYXJkMTtcbiAgbGV0IGdhbWVib2FyZDI7XG4gIGxldCBhY3RpdmVQbGF5ZXI7XG4gIGxldCBvcHBvc2luZ1BsYXllcjtcblxuICBjb25zdCBnZXRQbGF5ZXIxID0gKCkgPT4gcGxheWVyMTtcbiAgY29uc3QgZ2V0UGxheWVyMiA9ICgpID0+IHBsYXllcjI7XG4gIC8vIHdpbGwgcHJvYmFibHkgaGF2ZSB0byBhZGQgbmFtZSBwYXJhbWV0ZXJzIGxhdGVyIHNvIHRoYXQgcGxheWVycyBjYW4gc2V0IHRoZWlyIG5hbWVzXG4gIGNvbnN0IGNyZWF0ZU5ld0dhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZWJvYXJkMSA9IEdhbWVib2FyZCgpO1xuICAgIGdhbWVib2FyZDIgPSBHYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXIxID0gcGxheWVyKFwiSm9oblwiLCBnYW1lYm9hcmQxKTtcbiAgICBwbGF5ZXIyID0gcGxheWVyKFwiYWlcIiwgZ2FtZWJvYXJkMik7XG4gICAgLy8gcGxheWVyMi5nZXRCb2FyZCgpLnJlY2VpdmVBdHRhY2soMCw5KTtcbiAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMjtcbiAgICAvLyBtaWdodCBuZWVkIHRvIGRpc3BsYXkgdGhlIGJvYXJkcyBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBzb21ld2hlcmUgZWxzZVxuICB9O1xuICBcbiAgY29uc3Qgc3dpdGNoQWN0aXZlUGxheWVyID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjI7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjE7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gICAgfVxuICB9O1xuXG4gIGNyZWF0ZU5ld0dhbWUoKTtcbiAgY29uc3Qgc2hpcDEgPSBTaGlwKDMpO1xuICBjb25zdCBzaGlwMiA9IFNoaXAoMyk7XG4gIGdhbWVib2FyZDEucGxhY2VTaGlwKDAsIDAsIHNoaXAxKTtcbiAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoMSwgMCwgc2hpcDIpO1xuXG5cbiAgY29uc3Qgc2hpcDMgPSBTaGlwKDMpO1xuICBjb25zdCBzaGlwNCA9IFNoaXAoMyk7XG4gIGdhbWVib2FyZDIucGxhY2VTaGlwKDAsIDAsIHNoaXAzKTtcbiAgZ2FtZWJvYXJkMi5wbGFjZVNoaXAoMiwgMCwgc2hpcDQpO1xuXG4gIC8vIG1heWJlIGkgY2FuIHJlZmFjdG9yIHRoaXMsIGkgY2FuIGFkZCBhbiBldmVudExpc3RlbmVyIGZvciBlYWNoIGNlbGwsIFxuICAvLyBidXQgaXQgd2lsbCBvbmx5IHJlY2VpdmUgYXR0YWNrLCBhbmQgZGlzcGxheSBwbGF5ZXIgZ2FtZWJvYXJkIGlmIGl0J3MgdGhhdCBwZXJzb24ncyB0dXJuXG4gIC8vIGluc3RlYWQgb2YgYWRkaW5nIGFuIGV2ZW50TGlzdGVuZXIgYWdhaW5cbiAgLy8gYnV0IGkgbWlnaHQgbmVlZCB0byBrZWVwIGl0IGxpa2UgdGhpcyBiZWNhdXNlIGRpc3BsYXkgdGhlIGJvYXJkIHJlbW92ZXMgdGhlIGV2ZW50bGlzdGVuZXJzXG4gIGNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNyaWdodCAuY2VsbFwiKTtcbiAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuXG4gICAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmhhc1Nob3RDb29yZHNCZWZvcmUocGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKSwgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKSkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhhcyBzaG90IHRoZXJlIGJlZm9yZVwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKTtcblxuICAgICAgICBpZiAob3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5hcmVBbGxTaGlwc1N1bmsoKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBhbGwgc2hpcHMgYXJlIHN1bmsgZm9yIHBsYXllciAke29wcG9zaW5nUGxheWVyLmdldFBsYXllck5hbWUoKX1gKTtcbiAgICAgICAgICAvLyBhZGQgc29tZSBlbmQgZ2FtZSBzdHVmZlxuICAgICAgICB9XG5cbiAgICAgICAgZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG4gICAgICAgIHN3aXRjaEFjdGl2ZVBsYXllcigpO1xuICAgICAgICBwbGF5R2FtZSgpO1xuICAgICAgfSkpO1xuICAgIH0gXG4gICAgXG4gICAgZWxzZSB7XG4gICAgICBjb25zdCBzaG90ID0gYWN0aXZlUGxheWVyLmNob29zZVJhbmRvbVNob3QoKTtcbiAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhzaG90WzBdLCBzaG90WzFdKTtcbiAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBhbGwgc2hpcHMgYXJlIHN1bmsgZm9yIHBsYXllcm1pa2tvICR7b3Bwb3NpbmdQbGF5ZXIuZ2V0UGxheWVyTmFtZSgpfWApO1xuICAgICAgICAvLyBhZGQgc29tZSBlbmQgZ2FtZSBzdHVmZlxuICAgICAgfVxuICAgICAgZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG4gICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcbiAgICAgIHBsYXlHYW1lKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGNyZWF0ZU5ld0dhbWUsIGdldFBsYXllcjEsIGdldFBsYXllcjIsIHBsYXlHYW1lIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuXG4vLyBub3cgaSBoYXZlIGEgYm90aCBib2FyZHMgd29ya2luZyB3aXRoIHRoZSByZWNlaXZlQXR0YWNrLCBwbGFjZVNoaXAsIGFuZCBhbGxTaGlwc1N1bmsgZnVuY3Rpb25zXG4vLyBub3cgaSBuZWVkIHRvIG1ha2UgYWkgcGxhY2UgaXRzIHNoaXBzIHJhbmRvbWx5XG4vLyBpIHByb2JhYmx5IGFsc28gbmVlZCB0byByZWZhY3RvciBwbGFjZXNoaXBzIGFuZCBtYWtlIHN1cmUgdGhhdCBpdCBvbmx5IHRha2VzIHZhbGlkIGNvb3JkaW5hdGVzXG4vLyBob3cgZG8gaSBtYWtlIHBsYWNlU2hpcHMga25vdyBpZiBpdHMgYSB2YWxpZCBjb29yZGluYXRlXG4vLyBtYXliZSBpZiBjb29yZGluYXRlcyBpcyBpbiBzaGlwcyBjb29yZGluYXRlcywgdGhlbiByZXR1cm4/Pz9cbi8vIGFmdGVyIGkgZ2V0IGFpIHRvIHBsYWNlIGl0cyBzaGlwcyByYW5kb21seSwgaSBuZWVkIHRvIGNoZWNrIHRoZSBnYW1lYm9hcmQgZnVuY3Rpb25zXG4iLCJjb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiBnYW1lYm9hcmQ7XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goXCItXCIpO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZUdhbWVib2FyZCgpO1xuXG4gIFxuICAvLyBob3cgZG8gaSBtYWtlIGl0IHNvIHRoYXQgc2hpcHMgd29uJ3Qgb3ZlcmxhcCBhbmQgc2hpcHMgd29uJ3QgZ28gb3V0IG9mIGJvYXJkP1xuICAvLyB0byBtYWtlIHNoaXBzIG5vdCBvdmVybGFwLCBzaW5jZSB3ZSdyZSBvbmx5IGRvaW5nIHRoaW5ncyBob3Jpem9udGFsbHksIFxuICAvLyBpZiByb3cgaXMgaW4gc2hpcHNDb29yZGluYXRlcyBjaGVjayBpZiBjb2x1bW4gaXMgZ3JlYXRlciB0aGFuIHRoYXQgY29ycmVzcG9uZGluZyBjb2x1bW4gYW5kIGxlc3MgdGhhbiBjb2x1bW4gKyBzaGlwIGxlbmd0aFxuICAvLyBpZiBpdCBpcyB0aGVuIHRoYXQgaXMgYW4gaW52YWxpZCByb3cvY29sdW1uXG4gIC8vIHRvIG1ha2Ugc2hpcHMgbm90IGdvIG91dCBvZiBib2FyZCwgXG4gIC8vIGlmIGNvbHVtbiAoc2luY2Ugc2hpcHMgYXJlIG9ubHkgZ29pbmcgaG9yaXpvbnRhbGx5KSArIHNoaXAgbGVuZ3RoID4gMTAgKHdoaWNoIGlzIHRoZSBsZW5ndGggb2YgYm9hcmQpIFxuICAvLyB0aGVuIHNheSBzb21ldGhpbmcgYWJvdXQgaG93IGl0J3MgaW52YWxpZFxuICAvLyBhbmQgd2hhdCBkbyBpIGRvIGlmIGkgZG8gZ2V0IHJvdy9jb2x1bW4vc2hpcCBsZW5ndGggdGhhdCBhcmUgaW52YWxpZD8gXG4gIC8vIG1heWJlIHdvcnJ5IGFib3V0IHRoaXMgbGF0ZXIsIGJlY2F1c2UgaXQncyBub3QgdGhhdCB1cmdlbnRcbiAgLy8gbWF5YmUgcmVmYWN0b3IgaXQgaW4gYSB3YXkgd2hlcmUgb25seSB2YWxpZCBjb29yZGluYXRlcyBhcmUgZ2l2ZW4/XG4gIC8vIG1heWJlIHRoaXMgaXMgYSBmdW5jdGlvbiBmb3IgZHJhZyBhbmQgZHJvcD9cbiAgY29uc3QgcGxhY2VTaGlwID0gKHJvdywgY29sdW1uLCBzaGlwKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIC8vIFwib1wiIG1lYW5zIHRoZXJlIGlzIGEgc2hpcC9wYXJ0IG9mIGEgc2hpcCBvbiB0aG9zZSBjb29yZHNcbiAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbitpXSA9IFwib1wiO1xuICAgIH1cbiAgIFxuICAgIHNoaXBzQ29vcmRpbmF0ZXMucHVzaCh7cm93LCBjb2x1bW4sIHNoaXB9KTsgXG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9cIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHNoaXBzQ29vcmRpbmF0ZXNbaV07XG4gICAgICAgIGlmIChyb3cgPT09IG9iai5yb3cgJiYgKGNvbHVtbiA+PSBvYmouY29sdW1uICYmIGNvbHVtbiA8IG9iai5jb2x1bW4gKyBvYmouc2hpcC5nZXRMZW5ndGgoKSkpIHtcbiAgICAgICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJ4XCI7XG4gICAgICAgICAgb2JqLnNoaXAuaGl0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWlzc2VkQXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9IFwibVwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhcmVBbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgc2hpcHNTdW5rID0gc2hpcHNDb29yZGluYXRlcy5yZWR1Y2UoIChhY2MsIGN1cikgPT4ge1xuICAgICAgaWYgKGN1ci5zaGlwLmlzU3VuaygpKSByZXR1cm4gYWNjICsgMTtcbiAgICAgIHJldHVybiBhY2MgKyAwO1xuICAgIH0sIDApO1xuICAgIFxuICAgIHJldHVybiBzaGlwc1N1bmsgPT09IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGhhc1Nob3RDb29yZHNCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm1cIiB8fCBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcInhcIikgZmxhZyA9IHRydWU7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlR2FtZWJvYXJkLCBnZXRHYW1lYm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgZ2V0TWlzc2VkQXR0YWNrcywgYXJlQWxsU2hpcHNTdW5rLCBoYXNTaG90Q29vcmRzQmVmb3JlIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7IiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5jb25zdCBwbGF5ZXIgPSAobmFtZSwgZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZDtcbiAgY29uc3Qgc2hvdHMgPSBbXTtcblxuICBjb25zdCBnZXRQbGF5ZXJOYW1lID0gKCkgPT4gcGxheWVyTmFtZTtcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcbiAgY29uc3QgZ2V0U2hvdHMgPSAoKSA9PiBzaG90cztcblxuICBjb25zdCBoYXNTaG90Q29vcmRzQmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBzaG90cy5mb3JFYWNoKChzaG90KSA9PiB7XG4gICAgICBpZiAoc2hvdFswXSA9PT0gcm93ICYmIHNob3RbMV0gPT09IGNvbHVtbikge1xuICAgICAgICBmbGFnID0gIHRydWU7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBmbGFnO1xuICB9O1xuICBcbiAgY29uc3QgY2hvb3NlUmFuZG9tU2hvdCA9ICgpID0+IHtcbiAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBcbiAgICBpZiAoIWhhc1Nob3RDb29yZHNCZWZvcmUocm93LCBjb2x1bW4pKSB7XG4gICAgICBzaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgcmV0dXJuVmFsdWUgPSBbcm93LCBjb2x1bW5dO1xuICAgIH0gZWxzZSBpZiAoaGFzU2hvdENvb3Jkc0JlZm9yZShyb3csIGNvbHVtbikpIHtcbiAgICAgIHJldHVyblZhbHVlID0gY2hvb3NlUmFuZG9tU2hvdCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH07XG5cbiAgY29uc3QgZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IDQpIHtcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBzaGlwID0gU2hpcChpKzEpO1xuICAgICAgLy8gbWF5YmUgY2hlY2sgaWYgY29sdW1uICsgc2hpcCBsZW5ndGggaXMgZ3JlYXRlciB0aGFuIDEwIGhlcmUgYWxyZWFkeSBzbyB3ZSBjYW4ganVzdCBjb250aW51ZVxuICAgICAgc2hpcENvb3Jkcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgLy8gdGhpcyBkb2Vzbid0IGNoZWNrIGZvciB0aGUgd2hvbGUgc2hpcCBcbiAgICAgICAgLy8gYmMgaXQgb25seSBjaGVja3MgZm9yIHRoYXQgc3BlY2lmaWMgY29sdW1uIGNvb3JkaW5hdGUgYW5kIGl0IGRvZXNuJ3QgY2hlY2sgdGhlIHdob2xlIHNoaXBcbiAgICAgICAgLy8gc28gd2UgbmVlZCB0byBjb21wYXJlIHRoZSBuZXcgY29sdW1uICsgbmV3IHNoaXAgbGVuZ3RoIFxuICAgICAgICAvLyB3aXRoIGVhY2ggc2hpcCBjb2wgKyBzaGlwIGxlbmd0aCBpbiBzaGlwIENvb3Jkc1xuICAgICAgICBpZiAocm93ID09PSBlbC5yb3cgJiYgY29sdW1uID49IGVsLmNvbHVtbiAmJiBjb2x1bW4gPCBlbC5jb2x1bW4gKyBlbC5zaGlwLmdldExlbmd0aCgpKSB7XG4gICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAocm93ID09PSBlbC5yb3cpIHtcbiAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGsrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29sdW1uID0gY29sdW1uO1xuICAgICAgICAgICAgaWYgKChuZXdDb2x1bW4gKyAxID49IGVsLmNvbHVtbikgJiYgKG5ld0NvbHVtbiArIDEgPCBlbC5jb2x1bW4gKyBlbC5zaGlwLmdldExlbmd0aCgpKSkgZmxhZyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgfSk7XG4gICAgICBpZiAoZmxhZyB8fCBjb2x1bW4gKyBzaGlwLmdldExlbmd0aCgpIDwgMTApIHtcbiAgICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBzaGlwQ29vcmRzLnB1c2goe3JvdywgY29sdW1uLCBzaGlwfSk7XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBzaGlwQ29vcmRzO1xuICB9O1xuXG4gIHJldHVybiB7IGdldFBsYXllck5hbWUsIGdldEJvYXJkLCBnZXRTaG90cywgY2hvb3NlUmFuZG9tU2hvdCwgZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMgfTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IGxlbmd0aE9mU2hpcCA9IGxlbmd0aDtcbiAgbGV0IG51bU9mSGl0cyA9IDA7XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoT2ZTaGlwO1xuICAvLyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICBjb25zdCBnZXROdW1PZkhpdHMgPSAoKSA9PiBudW1PZkhpdHM7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIG51bU9mSGl0cysrO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IChsZW5ndGhPZlNoaXAgLSBudW1PZkhpdHMpID09PSAwO1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rLCBnZXRMZW5ndGgsIGdldE51bU9mSGl0cyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJjb25zdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkID0gKHBsYXllciwgZ2FtZWJvYXJkKSA9PiB7XG4gIGxldCBwYXJlbnRDb250YWluZXI7XG4gIGlmIChwbGF5ZXIuZ2V0UGxheWVyTmFtZSgpID09PSBcImFpXCIpIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmlnaHRcIik7XG4gIGVsc2UgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0XCIpO1xuIFxuICAvLyBjbGVhcnMgaXQgZmlyc3QgdGhlbiBhZGRzIHRoZSBnYW1lYm9hcmQgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBwYXJlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3Qgcm93TnVtID0gaTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY29sdW1uTnVtID0gajtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcInhcIikgY2VsbC50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm9cIikgY2VsbC50ZXh0Q29udGVudCA9IFwib1wiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm1cIikgY2VsbC50ZXh0Q29udGVudCA9IFwibVwiO1xuICAgICAgICBcbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dOdW07XG4gICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uTnVtO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQ7XG4vLyBleHBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vbW9kdWxlcy91aVwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vbW9kdWxlcy9nYW1lXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQoR2FtZS5nZXRQbGF5ZXIxKCksIEdhbWUuZ2V0UGxheWVyMSgpLmdldEJvYXJkKCkpO1xuICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKEdhbWUuZ2V0UGxheWVyMigpLCBHYW1lLmdldFBsYXllcjIoKS5nZXRCb2FyZCgpKTtcbiAgR2FtZS5wbGF5R2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=