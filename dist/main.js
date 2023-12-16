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

    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__["default"])(player1, gameboard1);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__["default"])(player2, gameboard2);

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

  return { createNewGame, playGame };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

// maybe when i implement drag and drop, i can have a function that checks if the ship will overlap/go out of board
// if that's true then dont' place else place it
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
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");


window.addEventListener("load", () => {
  _modules_game__WEBPACK_IMPORTED_MODULE_0__["default"].createNewGame();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsc0JBQXNCLEVBQUM7QUFDdEMsWUFBWTs7Ozs7O1VDN0JaO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0M7O0FBRWxDO0FBQ0EsRUFBRSxxREFBSTtBQUNOLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vdWkuanNcIjtcblxuY29uc3QgR2FtZSA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXIxO1xuICBsZXQgcGxheWVyMjtcbiAgbGV0IGdhbWVib2FyZDE7XG4gIGxldCBnYW1lYm9hcmQyO1xuICBsZXQgYWN0aXZlUGxheWVyO1xuICBsZXQgb3Bwb3NpbmdQbGF5ZXI7XG5cbiAgY29uc3QgY3JlYXRlTmV3R2FtZSA9ICgpID0+IHtcbiAgICBnYW1lYm9hcmQxID0gR2FtZWJvYXJkKCk7XG4gICAgZ2FtZWJvYXJkMiA9IEdhbWVib2FyZCgpO1xuICAgIHBsYXllcjEgPSBwbGF5ZXIoXCJKb2huXCIsIGdhbWVib2FyZDEpO1xuICAgIHBsYXllcjIgPSBwbGF5ZXIoXCJhaVwiLCBnYW1lYm9hcmQyKTtcbiAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMjtcblxuICAgIC8vIHRlc3RcbiAgICBjb25zdCBzaGlwMSA9IFNoaXAoMyk7XG4gICAgY29uc3Qgc2hpcDIgPSBTaGlwKDMpO1xuICAgIGdhbWVib2FyZDEucGxhY2VTaGlwKDAsIDAsIHNoaXAxKTtcbiAgICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgxLCAwLCBzaGlwMik7XG4gICAgZ2FtZWJvYXJkMi5wbGFjZUFpU2hpcHMoKTtcblxuICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQocGxheWVyMSwgZ2FtZWJvYXJkMSk7XG4gICAgZGlzcGxheVBsYXllckdhbWVib2FyZChwbGF5ZXIyLCBnYW1lYm9hcmQyKTtcblxuICAgIGNvbnN0IHN0YXJ0R2FtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgc3RhcnRHYW1lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5R2FtZSk7XG4gIH07XG4gIFxuICBjb25zdCBzd2l0Y2hBY3RpdmVQbGF5ZXIgPSAoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSkge1xuICAgICAgYWN0aXZlUGxheWVyID0gcGxheWVyMjtcbiAgICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSkge1xuICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3JpZ2h0IC5jZWxsXCIpO1xuICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG5cbiAgICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuaGFzU2hvdENvb3Jkc0JlZm9yZShwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGFzIHNob3QgdGhlcmUgYmVmb3JlXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCksIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uLCAxMCkpO1xuXG4gICAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYGFsbCBzaGlwcyBhcmUgc3VuayBmb3IgcGxheWVyICR7b3Bwb3NpbmdQbGF5ZXIuZ2V0UGxheWVyTmFtZSgpfWApO1xuICAgICAgICAgIC8vIGFkZCBzb21lIGVuZCBnYW1lIHN0dWZmXG4gICAgICAgIH1cblxuICAgICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICAgICAgc3dpdGNoQWN0aXZlUGxheWVyKCk7XG4gICAgICAgIHBsYXlHYW1lKCk7XG4gICAgICB9KSk7XG4gICAgfSBcbiAgICBcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHNob3QgPSBhY3RpdmVQbGF5ZXIuY2hvb3NlUmFuZG9tU2hvdCgpO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKHNob3RbMF0sIHNob3RbMV0pO1xuICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuYXJlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGFsbCBzaGlwcyBhcmUgc3VuayBmb3IgcGxheWVybWlra28gJHtvcHBvc2luZ1BsYXllci5nZXRQbGF5ZXJOYW1lKCl9YCk7XG4gICAgICAgIC8vIGFkZCBzb21lIGVuZCBnYW1lIHN0dWZmXG4gICAgICB9XG4gICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICAgIHN3aXRjaEFjdGl2ZVBsYXllcigpO1xuICAgICAgcGxheUdhbWUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlTmV3R2FtZSwgcGxheUdhbWUgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG5cbi8vIG1heWJlIHdoZW4gaSBpbXBsZW1lbnQgZHJhZyBhbmQgZHJvcCwgaSBjYW4gaGF2ZSBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZSBzaGlwIHdpbGwgb3ZlcmxhcC9nbyBvdXQgb2YgYm9hcmRcbi8vIGlmIHRoYXQncyB0cnVlIHRoZW4gZG9udCcgcGxhY2UgZWxzZSBwbGFjZSBpdFxuLy8gbWF5YmUgaWYgY29vcmRpbmF0ZXMgaXMgaW4gc2hpcHMgY29vcmRpbmF0ZXMsIHRoZW4gcmV0dXJuPz8/XG4vLyBhZnRlciBpIGdldCBhaSB0byBwbGFjZSBpdHMgc2hpcHMgcmFuZG9tbHksIGkgbmVlZCB0byBjaGVjayB0aGUgZ2FtZWJvYXJkIGZ1bmN0aW9uc1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiBnYW1lYm9hcmQ7XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goXCItXCIpO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZUdhbWVib2FyZCgpO1xuICBcbiAgLy8gaG93IGRvIGkgbWFrZSBpdCBzbyB0aGF0IHNoaXBzIHdvbid0IG92ZXJsYXAgYW5kIHNoaXBzIHdvbid0IGdvIG91dCBvZiBib2FyZD9cbiAgLy8gdG8gbWFrZSBzaGlwcyBub3Qgb3ZlcmxhcCwgc2luY2Ugd2UncmUgb25seSBkb2luZyB0aGluZ3MgaG9yaXpvbnRhbGx5LCBcbiAgLy8gaWYgcm93IGlzIGluIHNoaXBzQ29vcmRpbmF0ZXMgY2hlY2sgaWYgY29sdW1uIGlzIGdyZWF0ZXIgdGhhbiB0aGF0IGNvcnJlc3BvbmRpbmcgY29sdW1uIGFuZCBsZXNzIHRoYW4gY29sdW1uICsgc2hpcCBsZW5ndGhcbiAgLy8gaWYgaXQgaXMgdGhlbiB0aGF0IGlzIGFuIGludmFsaWQgcm93L2NvbHVtblxuICAvLyB0byBtYWtlIHNoaXBzIG5vdCBnbyBvdXQgb2YgYm9hcmQsIFxuICAvLyBpZiBjb2x1bW4gKHNpbmNlIHNoaXBzIGFyZSBvbmx5IGdvaW5nIGhvcml6b250YWxseSkgKyBzaGlwIGxlbmd0aCA+IDEwICh3aGljaCBpcyB0aGUgbGVuZ3RoIG9mIGJvYXJkKSBcbiAgLy8gdGhlbiBzYXkgc29tZXRoaW5nIGFib3V0IGhvdyBpdCdzIGludmFsaWRcbiAgLy8gYW5kIHdoYXQgZG8gaSBkbyBpZiBpIGRvIGdldCByb3cvY29sdW1uL3NoaXAgbGVuZ3RoIHRoYXQgYXJlIGludmFsaWQ/IFxuICAvLyBtYXliZSB3b3JyeSBhYm91dCB0aGlzIGxhdGVyLCBiZWNhdXNlIGl0J3Mgbm90IHRoYXQgdXJnZW50XG4gIC8vIG1heWJlIHJlZmFjdG9yIGl0IGluIGEgd2F5IHdoZXJlIG9ubHkgdmFsaWQgY29vcmRpbmF0ZXMgYXJlIGdpdmVuP1xuICAvLyBtYXliZSB0aGlzIGlzIGEgZnVuY3Rpb24gZm9yIGRyYWcgYW5kIGRyb3A/XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChyb3csIGNvbHVtbiwgc2hpcCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAvLyBcIm9cIiBtZWFucyB0aGVyZSBpcyBhIHNoaXAvcGFydCBvZiBhIHNoaXAgb24gdGhvc2UgY29vcmRzXG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW4raV0gPSBcIm9cIjtcbiAgICB9XG4gICAgc2hpcHNDb29yZGluYXRlcy5wdXNoKHtyb3csIGNvbHVtbiwgc2hpcH0pOyBcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib1wiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2JqID0gc2hpcHNDb29yZGluYXRlc1tpXTtcbiAgICAgICAgaWYgKHJvdyA9PT0gb2JqLnJvdyAmJiAoY29sdW1uID49IG9iai5jb2x1bW4gJiYgY29sdW1uIDwgb2JqLmNvbHVtbiArIG9iai5zaGlwLmdldExlbmd0aCgpKSkge1xuICAgICAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcInhcIjtcbiAgICAgICAgICBvYmouc2hpcC5oaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICBzaGlwc1N1bmsgPSBzaGlwc0Nvb3JkaW5hdGVzLnJlZHVjZSggKGFjYywgY3VyKSA9PiB7XG4gICAgICBpZiAoY3VyLnNoaXAuaXNTdW5rKCkpIHJldHVybiBhY2MgKyAxO1xuICAgICAgcmV0dXJuIGFjYyArIDA7XG4gICAgfSwgMCk7XG4gICAgXG4gICAgcmV0dXJuIHNoaXBzU3VuayA9PT0gc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgaGFzU2hvdENvb3Jkc0JlZm9yZSA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgaWYgKGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwibVwiIHx8IGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwieFwiKSBmbGFnID0gdHJ1ZTtcbiAgICByZXR1cm4gZmxhZztcbiAgfTtcblxuICBjb25zdCBnZXRSYW5kb21TaGlwUGxhY2VtZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBzaGlwQ29vcmRzID0gW107XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgNCkge1xuICAgICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgIGNvbnN0IHNoaXAgPSBTaGlwKGkrMik7XG4gICAgICAvLyBtYXliZSBjaGVjayBpZiBjb2x1bW4gKyBzaGlwIGxlbmd0aCBpcyBncmVhdGVyIHRoYW4gMTAgaGVyZSBhbHJlYWR5IHNvIHdlIGNhbiBqdXN0IGNvbnRpbnVlXG4gICAgICBzaGlwQ29vcmRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICBpZiAocm93ID09PSBlbC5yb3cgJiYgKGNvbHVtbiA+PSBlbC5jb2x1bW4gJiYgY29sdW1uIDwgKGVsLmNvbHVtbiArIGVsLnNoaXAuZ2V0TGVuZ3RoKCkpKSkge1xuICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHJvdyA9PT0gZWwucm93KSB7XG4gICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBzaGlwLmdldExlbmd0aCgpOyBrKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0NvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgICAgIGlmICgoKG5ld0NvbHVtbiArIGsgKyAxKSA+PSBlbC5jb2x1bW4pICYmICgobmV3Q29sdW1uICsgayArIDEpIDwgKGVsLmNvbHVtbiArIGVsLnNoaXAuZ2V0TGVuZ3RoKCkpKSkgZmxhZyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgfSk7XG4gICAgICBpZiAoZmxhZyB8fCBjb2x1bW4gKyBzaGlwLmdldExlbmd0aCgpID4gMTApIHtcbiAgICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgICAvLyBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzaGlwQ29vcmRzLnB1c2goe3JvdywgY29sdW1uLCBzaGlwfSk7XG4gICAgICAgIGkrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNoaXBDb29yZHM7XG4gIH07XG5cbiAgY29uc3QgcGxhY2VBaVNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBBcnIgPSBnZXRSYW5kb21TaGlwUGxhY2VtZW50cygpO1xuICAgIHNoaXBBcnIuZm9yRWFjaChvYmogPT4gcGxhY2VTaGlwKG9iai5yb3csIG9iai5jb2x1bW4sIG9iai5zaGlwKSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlR2FtZWJvYXJkLCBnZXRHYW1lYm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgXG4gICAgZ2V0TWlzc2VkQXR0YWNrcywgYXJlQWxsU2hpcHNTdW5rLCBoYXNTaG90Q29vcmRzQmVmb3JlLCBwbGFjZUFpU2hpcHMgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDsiLCJjb25zdCBwbGF5ZXIgPSAobmFtZSwgZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZDtcbiAgY29uc3Qgc2hvdHMgPSBbXTtcblxuICBjb25zdCBnZXRQbGF5ZXJOYW1lID0gKCkgPT4gcGxheWVyTmFtZTtcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcbiAgY29uc3QgZ2V0U2hvdHMgPSAoKSA9PiBzaG90cztcblxuICBjb25zdCBoYXNTaG90Q29vcmRzQmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBzaG90cy5mb3JFYWNoKChzaG90KSA9PiB7XG4gICAgICBpZiAoc2hvdFswXSA9PT0gcm93ICYmIHNob3RbMV0gPT09IGNvbHVtbikge1xuICAgICAgICBmbGFnID0gIHRydWU7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBmbGFnO1xuICB9O1xuICBcbiAgY29uc3QgY2hvb3NlUmFuZG9tU2hvdCA9ICgpID0+IHtcbiAgICBsZXQgcmV0dXJuVmFsdWU7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBcbiAgICBpZiAoIWhhc1Nob3RDb29yZHNCZWZvcmUocm93LCBjb2x1bW4pKSB7XG4gICAgICBzaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgcmV0dXJuVmFsdWUgPSBbcm93LCBjb2x1bW5dO1xuICAgIH0gZWxzZSBpZiAoaGFzU2hvdENvb3Jkc0JlZm9yZShyb3csIGNvbHVtbikpIHtcbiAgICAgIHJldHVyblZhbHVlID0gY2hvb3NlUmFuZG9tU2hvdCgpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0UGxheWVyTmFtZSwgZ2V0Qm9hcmQsIGdldFNob3RzLCBjaG9vc2VSYW5kb21TaG90IH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiY29uc3QgU2hpcCA9IChsZW5ndGgpID0+IHtcbiAgY29uc3QgbGVuZ3RoT2ZTaGlwID0gbGVuZ3RoO1xuICBsZXQgbnVtT2ZIaXRzID0gMDtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGhPZlNoaXA7XG4gIC8vIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gIGNvbnN0IGdldE51bU9mSGl0cyA9ICgpID0+IG51bU9mSGl0cztcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgbnVtT2ZIaXRzKys7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gKGxlbmd0aE9mU2hpcCAtIG51bU9mSGl0cykgPT09IDA7XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmssIGdldExlbmd0aCwgZ2V0TnVtT2ZIaXRzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwOyIsImNvbnN0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgPSAocGxheWVyLCBnYW1lYm9hcmQpID0+IHtcbiAgbGV0IHBhcmVudENvbnRhaW5lcjtcbiAgaWYgKHBsYXllci5nZXRQbGF5ZXJOYW1lKCkgPT09IFwiYWlcIikgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyaWdodFwiKTtcbiAgZWxzZSBwYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xlZnRcIik7XG4gXG4gIC8vIGNsZWFycyBpdCBmaXJzdCB0aGVuIGFkZHMgdGhlIGdhbWVib2FyZCB0byBwcmV2ZW50IGR1cGxpY2F0aW9uXG4gIHBhcmVudENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByb3dOdW0gPSBpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjb2x1bW5OdW0gPSBqO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwieFwiKSBjZWxsLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgICBlbHNlIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwib1wiKSBjZWxsLnRleHRDb250ZW50ID0gXCJvXCI7XG4gICAgICBlbHNlIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwibVwiKSBjZWxsLnRleHRDb250ZW50ID0gXCJtXCI7XG4gICAgICAgIFxuICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvd051bTtcbiAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW5OdW07XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheVBsYXllckdhbWVib2FyZDtcbi8vIGV4cG9ydCB7IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQsIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgR2FtZS5jcmVhdGVOZXdHYW1lKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==