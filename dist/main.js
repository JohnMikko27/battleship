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
        (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__["default"])(opposingPlayer, opposingPlayer.getBoard());

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
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
function Gameboard() {
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

  // need to add conditionals to check if ships go out of page
  // also for rn, ships are only placed horizontally
  const placeShip = (row, column, ship) => {
    for (let i = 0; i < ship.getLength(); i++) {
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
}



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
    
    const ship1 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4);
    const ship2 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4);
    // const ship3 = Ship(4);

    const shipCoords = [
      {row: 1, column: 3, ship: ship1}, 
      {row: 2, column: 4, ship: ship2}, 
      // {row: 3, column: 5, ship: ship3}, 
    ];
    return shipCoords;
  };

  return { getPlayerName, getBoard, getShots, chooseRandomShot, getRandomShipPlacements };
};
// const ship1 = Ship(4);
// const ship2 = Ship(2);
// const ship3 = Ship(3);
// const ship4 = Ship(4);

// const ships = [ship1, ship2, ship3, ship4];
// console.log(ships[2].getLength());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function Ship(length) {
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
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNoQjs7QUFFbEM7QUFDQSxFQUFFLHVEQUFzQixDQUFDLHFEQUFJLGVBQWUscURBQUk7QUFDaEQsRUFBRSx1REFBc0IsQ0FBQyxxREFBSSxlQUFlLHFEQUFJO0FBQ2hELEVBQUUscURBQUk7QUFDTixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmQuanNcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcbmltcG9ydCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkIGZyb20gXCIuL3VpLmpzXCI7XG5cbmNvbnN0IEdhbWUgPSAoKCkgPT4ge1xuICBsZXQgcGxheWVyMTtcbiAgbGV0IHBsYXllcjI7XG4gIGxldCBnYW1lYm9hcmQxO1xuICBsZXQgZ2FtZWJvYXJkMjtcbiAgbGV0IGFjdGl2ZVBsYXllcjtcbiAgbGV0IG9wcG9zaW5nUGxheWVyO1xuXG4gIGNvbnN0IGdldFBsYXllcjEgPSAoKSA9PiBwbGF5ZXIxO1xuICBjb25zdCBnZXRQbGF5ZXIyID0gKCkgPT4gcGxheWVyMjtcbiAgLy8gd2lsbCBwcm9iYWJseSBoYXZlIHRvIGFkZCBuYW1lIHBhcmFtZXRlcnMgbGF0ZXIgc28gdGhhdCBwbGF5ZXJzIGNhbiBzZXQgdGhlaXIgbmFtZXNcbiAgY29uc3QgY3JlYXRlTmV3R2FtZSA9ICgpID0+IHtcbiAgICBnYW1lYm9hcmQxID0gR2FtZWJvYXJkKCk7XG4gICAgZ2FtZWJvYXJkMiA9IEdhbWVib2FyZCgpO1xuICAgIHBsYXllcjEgPSBwbGF5ZXIoXCJKb2huXCIsIGdhbWVib2FyZDEpO1xuICAgIHBsYXllcjIgPSBwbGF5ZXIoXCJhaVwiLCBnYW1lYm9hcmQyKTtcbiAgICAvLyBwbGF5ZXIyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjaygwLDkpO1xuICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjE7XG4gICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgIC8vIG1pZ2h0IG5lZWQgdG8gZGlzcGxheSB0aGUgYm9hcmRzIGhlcmUgaW5zdGVhZCBvZiBjYWxsaW5nIHNvbWV3aGVyZSBlbHNlXG4gIH07XG4gIFxuICBjb25zdCBzd2l0Y2hBY3RpdmVQbGF5ZXIgPSAoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSkge1xuICAgICAgYWN0aXZlUGxheWVyID0gcGxheWVyMjtcbiAgICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMjtcbiAgICB9XG4gIH07XG5cbiAgY3JlYXRlTmV3R2FtZSgpO1xuICBjb25zdCBzaGlwMSA9IFNoaXAoMyk7XG4gIGNvbnN0IHNoaXAyID0gU2hpcCgzKTtcbiAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoMCwgMCwgc2hpcDEpO1xuICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgxLCAwLCBzaGlwMik7XG5cblxuICBjb25zdCBzaGlwMyA9IFNoaXAoMyk7XG4gIGNvbnN0IHNoaXA0ID0gU2hpcCgzKTtcbiAgZ2FtZWJvYXJkMi5wbGFjZVNoaXAoMCwgMCwgc2hpcDMpO1xuICBnYW1lYm9hcmQyLnBsYWNlU2hpcCgyLCAwLCBzaGlwNCk7XG5cbiAgLy8gbWF5YmUgaSBjYW4gcmVmYWN0b3IgdGhpcywgaSBjYW4gYWRkIGFuIGV2ZW50TGlzdGVuZXIgZm9yIGVhY2ggY2VsbCwgXG4gIC8vIGJ1dCBpdCB3aWxsIG9ubHkgcmVjZWl2ZSBhdHRhY2ssIGFuZCBkaXNwbGF5IHBsYXllciBnYW1lYm9hcmQgaWYgaXQncyB0aGF0IHBlcnNvbidzIHR1cm5cbiAgLy8gaW5zdGVhZCBvZiBhZGRpbmcgYW4gZXZlbnRMaXN0ZW5lciBhZ2FpblxuICAvLyBidXQgaSBtaWdodCBuZWVkIHRvIGtlZXAgaXQgbGlrZSB0aGlzIGJlY2F1c2UgZGlzcGxheSB0aGUgYm9hcmQgcmVtb3ZlcyB0aGUgZXZlbnRsaXN0ZW5lcnNcbiAgY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgbGV0IGNlbGxzO1xuXG4gICAgXG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSkge1xuICAgICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3JpZ2h0IC5jZWxsXCIpO1xuICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG5cbiAgICAgICAgLy8gdG8gbWFrZSBzdXJlIHRoYXQgd2UgY2FuJ3QgY2hvb3NlIHRoZSBzYW1lIGNvb3JkaW5hdGVzXG4gICAgICAgIC8vIGkgc2hvdWxkIGhhdmUgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBwbGF5ZXIxLmdhbWVib2FyZCBhbmQgZ2V0cyBhbGwgdGhlIGNvb3JkaW5hdGVzIHRoYXQgaGF2ZSBiZWVuIHNob3RcbiAgICAgICAgLy8gaWYgdGhlIGUuZGF0YXNldC5yb3cvY29sIG1hdGNoIHRoYXQsIHRoZW4ganVzdCBydW4gcGxheUdhbWUgYWdhaW4gKGFkZCBhIGRpc3BsYXkgbGF0ZXIpXG4gICAgICAgIC8vIHNob3VsZCBpIGNyZWF0ZSBhIGNvb3JkaW5hdGVzU2hvdCBhcnJheSBpbiBnYW1lYm9hcmQ/IHRvIGtlZXAgdHJhY2sgb2YgYWxsIHRoZSBjb29yaWRpbmF0ZXMgdGhhdCBoYXZlIGJlZW4gc2hvdFxuICAgICAgICAvLyBvciBqdXN0IGEgZnVuY3Rpb24gaGFzU2hvdENvb3JkcyBiZWZvcmUgdGhhdCBqdXN0IGNoZWNrcyB0aGUgZ2FtZWJvYXJkJ3MgZWxlbWVudCBhdCB0aGF0IGNvb3JkXG4gICAgICAgIC8vIGlmIGl0J3MgXCJtXCIgb3IgXCJ4XCIgdGhhdCBtZWFucyBpdCBoYXMgYmVlbiBzaG90IGJlZm9yZSBcbiAgICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuaGFzU2hvdENvb3Jkc0JlZm9yZShwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGFzIHNob3QgdGhlaXIgYmVmb3JlXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKTtcbiAgICAgICAgZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG5cbiAgICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuYXJlQWxsU2hpcHNTdW5rKCkpIGNvbnNvbGUubG9nKGBhbGwgc2hpcHMgYXJlIHN1bmsgZm9yIHBsYXllciAke29wcG9zaW5nUGxheWVyLmdldFBsYXllck5hbWUoKX1gKTtcbiAgICAgICAgc3dpdGNoQWN0aXZlUGxheWVyKCk7XG4gICAgICAgIHBsYXlHYW1lKCk7XG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgLy8gc28gY2hvb3NlUmFuZG9tU2hvdCBjYW4gZ28gb3V0c2lkZSB0aGUgYm9hcmQsIGdvdHRhIGZpeCB0aGF0XG4gICAgZWxzZSB7XG4gICAgICBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjbGVmdCAuY2VsbFwiKTtcbiAgICAgIGNvbnN0IHNob3QgPSBhY3RpdmVQbGF5ZXIuY2hvb3NlUmFuZG9tU2hvdCgpO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKHNob3RbMF0sIHNob3RbMV0pO1xuICAgICAgZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG4gICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcbiAgICAgIHBsYXlHYW1lKCk7XG4gICAgfVxuXG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlTmV3R2FtZSwgZ2V0UGxheWVyMSwgZ2V0UGxheWVyMiwgcGxheUdhbWUgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG5cbi8vIG5vdyBpIGhhdmUgYSBib3RoIGJvYXJkcyB3b3JraW5nIHdpdGggdGhlIHJlY2VpdmVBdHRhY2ssIHBsYWNlU2hpcCwgYW5kIGFsbFNoaXBzU3VuayBmdW5jdGlvbnNcbi8vIG5vdyBpIG5lZWQgdG8gbWFrZSBhaSBwbGFjZSBpdHMgc2hpcHMgcmFuZG9tbHlcbi8vIGkgcHJvYmFibHkgYWxzbyBuZWVkIHRvIHJlZmFjdG9yIHBsYWNlc2hpcHMgYW5kIG1ha2Ugc3VyZSB0aGF0IGl0IG9ubHkgdGFrZXMgdmFsaWQgY29vcmRpbmF0ZXNcbi8vIGhvdyBkbyBpIG1ha2UgcGxhY2VTaGlwcyBrbm93IGlmIGl0cyBhIHZhbGlkIGNvb3JkaW5hdGVcbi8vIG1heWJlIGlmIGNvb3JkaW5hdGVzIGlzIGluIHNoaXBzIGNvb3JkaW5hdGVzLCB0aGVuIHJldHVybj8/P1xuLy8gYWZ0ZXIgaSBnZXQgYWkgdG8gcGxhY2UgaXRzIHNoaXBzIHJhbmRvbWx5LCBpIG5lZWQgdG8gY2hlY2sgdGhlIGdhbWVib2FyZCBmdW5jdGlvbnNcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gW107XG4gIGNvbnN0IHNoaXBzQ29vcmRpbmF0ZXMgPSBbXTtcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+IGdhbWVib2FyZDtcblxuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4gbWlzc2VkQXR0YWNrcztcblxuICBjb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICByb3cucHVzaChcIi1cIik7XG4gICAgICB9XG4gICAgICBnYW1lYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgfTtcbiAgY3JlYXRlR2FtZWJvYXJkKCk7XG5cbiAgLy8gbmVlZCB0byBhZGQgY29uZGl0aW9uYWxzIHRvIGNoZWNrIGlmIHNoaXBzIGdvIG91dCBvZiBwYWdlXG4gIC8vIGFsc28gZm9yIHJuLCBzaGlwcyBhcmUgb25seSBwbGFjZWQgaG9yaXpvbnRhbGx5XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChyb3csIGNvbHVtbiwgc2hpcCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW4raV0gPSBcIm9cIjtcbiAgICB9XG4gICBcbiAgICBzaGlwc0Nvb3JkaW5hdGVzLnB1c2goe3JvdywgY29sdW1uLCBzaGlwfSk7IFxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBpZiAoZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJvXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBvYmogPSBzaGlwc0Nvb3JkaW5hdGVzW2ldO1xuICAgICAgICBpZiAocm93ID09PSBvYmoucm93ICYmIChjb2x1bW4gPj0gb2JqLmNvbHVtbiAmJiBjb2x1bW4gPCBvYmouY29sdW1uICsgb2JqLnNoaXAuZ2V0TGVuZ3RoKCkpKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9IFwieFwiO1xuICAgICAgICAgIG9iai5zaGlwLmhpdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZEF0dGFja3MucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcIm1cIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXJlQWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIHNoaXBzU3VuayA9IHNoaXBzQ29vcmRpbmF0ZXMucmVkdWNlKCAoYWNjLCBjdXIpID0+IHtcbiAgICAgIGlmIChjdXIuc2hpcC5pc1N1bmsoKSkgcmV0dXJuIGFjYyArIDE7XG4gICAgICByZXR1cm4gYWNjICsgMDtcbiAgICB9LCAwKTtcbiAgICBcbiAgICByZXR1cm4gc2hpcHNTdW5rID09PSBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBoYXNTaG90Q29vcmRzQmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBpZiAoZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJtXCIgfHwgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJ4XCIpIGZsYWcgPSB0cnVlO1xuICAgIHJldHVybiBmbGFnO1xuICB9O1xuXG4gIHJldHVybiB7IGNyZWF0ZUdhbWVib2FyZCwgZ2V0R2FtZWJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGdldE1pc3NlZEF0dGFja3MsIGFyZUFsbFNoaXBzU3VuaywgaGFzU2hvdENvb3Jkc0JlZm9yZSB9O1xufVxuXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5cbmNvbnN0IHBsYXllciA9IChuYW1lLCBnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkO1xuICBjb25zdCBzaG90cyA9IFtdO1xuXG4gIGNvbnN0IGdldFBsYXllck5hbWUgPSAoKSA9PiBwbGF5ZXJOYW1lO1xuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuICBjb25zdCBnZXRTaG90cyA9ICgpID0+IHNob3RzO1xuXG4gIGNvbnN0IGhhc1Nob3RDb29yZHNCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIHNob3RzLmZvckVhY2goKHNob3QpID0+IHtcbiAgICAgIGlmIChzaG90WzBdID09PSByb3cgJiYgc2hvdFsxXSA9PT0gY29sdW1uKSB7XG4gICAgICAgIGZsYWcgPSAgdHJ1ZTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG4gIFxuICBjb25zdCBjaG9vc2VSYW5kb21TaG90ID0gKCkgPT4ge1xuICAgIGxldCByZXR1cm5WYWx1ZTtcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIFxuICAgIGlmICghaGFzU2hvdENvb3Jkc0JlZm9yZShyb3csIGNvbHVtbikpIHtcbiAgICAgIHNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICByZXR1cm5WYWx1ZSA9IFtyb3csIGNvbHVtbl07XG4gICAgfSBlbHNlIGlmIChoYXNTaG90Q29vcmRzQmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgcmV0dXJuVmFsdWUgPSBjaG9vc2VSYW5kb21TaG90KCk7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfTtcblxuICBjb25zdCBnZXRSYW5kb21TaGlwUGxhY2VtZW50cyA9ICgpID0+IHtcbiAgICBcbiAgICBjb25zdCBzaGlwMSA9IFNoaXAoNCk7XG4gICAgY29uc3Qgc2hpcDIgPSBTaGlwKDQpO1xuICAgIC8vIGNvbnN0IHNoaXAzID0gU2hpcCg0KTtcblxuICAgIGNvbnN0IHNoaXBDb29yZHMgPSBbXG4gICAgICB7cm93OiAxLCBjb2x1bW46IDMsIHNoaXA6IHNoaXAxfSwgXG4gICAgICB7cm93OiAyLCBjb2x1bW46IDQsIHNoaXA6IHNoaXAyfSwgXG4gICAgICAvLyB7cm93OiAzLCBjb2x1bW46IDUsIHNoaXA6IHNoaXAzfSwgXG4gICAgXTtcbiAgICByZXR1cm4gc2hpcENvb3JkcztcbiAgfTtcblxuICByZXR1cm4geyBnZXRQbGF5ZXJOYW1lLCBnZXRCb2FyZCwgZ2V0U2hvdHMsIGNob29zZVJhbmRvbVNob3QsIGdldFJhbmRvbVNoaXBQbGFjZW1lbnRzIH07XG59O1xuLy8gY29uc3Qgc2hpcDEgPSBTaGlwKDQpO1xuLy8gY29uc3Qgc2hpcDIgPSBTaGlwKDIpO1xuLy8gY29uc3Qgc2hpcDMgPSBTaGlwKDMpO1xuLy8gY29uc3Qgc2hpcDQgPSBTaGlwKDQpO1xuXG4vLyBjb25zdCBzaGlwcyA9IFtzaGlwMSwgc2hpcDIsIHNoaXAzLCBzaGlwNF07XG4vLyBjb25zb2xlLmxvZyhzaGlwc1syXS5nZXRMZW5ndGgoKSk7XG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgY29uc3QgbGVuZ3RoT2ZTaGlwID0gbGVuZ3RoO1xuICBsZXQgbnVtT2ZIaXRzID0gMDtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGhPZlNoaXA7XG4gIC8vIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gIGNvbnN0IGdldE51bU9mSGl0cyA9ICgpID0+IG51bU9mSGl0cztcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgbnVtT2ZIaXRzKys7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gKGxlbmd0aE9mU2hpcCAtIG51bU9mSGl0cykgPT09IDA7XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmssIGdldExlbmd0aCwgZ2V0TnVtT2ZIaXRzIH07XG59XG4iLCJjb25zdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkID0gKHBsYXllciwgZ2FtZWJvYXJkKSA9PiB7XG4gIGxldCBwYXJlbnRDb250YWluZXI7XG4gIGlmIChwbGF5ZXIuZ2V0UGxheWVyTmFtZSgpID09PSBcImFpXCIpIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmlnaHRcIik7XG4gIGVsc2UgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0XCIpO1xuIFxuICAvLyBjbGVhcnMgaXQgZmlyc3QgdGhlbiBhZGRzIHRoZSBnYW1lYm9hcmQgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBwYXJlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3Qgcm93TnVtID0gaTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY29sdW1uTnVtID0gajtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcInhcIikgY2VsbC50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm9cIikgY2VsbC50ZXh0Q29udGVudCA9IFwib1wiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm1cIikgY2VsbC50ZXh0Q29udGVudCA9IFwibVwiO1xuICAgICAgICBcbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dOdW07XG4gICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uTnVtO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQ7XG4vLyBleHBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vbW9kdWxlcy91aVwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vbW9kdWxlcy9nYW1lXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQoR2FtZS5nZXRQbGF5ZXIxKCksIEdhbWUuZ2V0UGxheWVyMSgpLmdldEJvYXJkKCkpO1xuICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKEdhbWUuZ2V0UGxheWVyMigpLCBHYW1lLmdldFBsYXllcjIoKS5nZXRCb2FyZCgpKTtcbiAgR2FtZS5wbGF5R2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=