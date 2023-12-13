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
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/modules/ui.js");





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
    gameboard1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    gameboard2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])("John", gameboard1);
    player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])("ai", gameboard2);
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
  const ship1 = (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  const ship2 = (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  gameboard1.placeShip(0, 0, ship1);
  gameboard1.placeShip(1, 0, ship2);


  const ship3 = (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  const ship4 = (0,_ship__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
  gameboard2.placeShip(0, 0, ship3);
  gameboard2.placeShip(2, 0, ship4);

  // maybe i can refactor this, i can add an eventListener for each cell, 
  // but it will only receive attack, and display player gameboard if it's that person's turn
  // instead of adding an eventListener again
  // but i might need to keep it like this because display the board removes the eventlisteners

  // i can refactor this to have a condtional for active player, then just declare cells before and 
  // initialize cells inside the conditional depending on the active player
  const playGame = () => {
    let cells;

    if (activePlayer === player1) cells = document.querySelectorAll("#right .cell");
    else cells = document.querySelectorAll("#left .cell");

    cells.forEach(cell => cell.addEventListener("click", (e) => {
      console.log(e.target.dataset.row, e.target.dataset.column);
      opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));
      (0,_ui__WEBPACK_IMPORTED_MODULE_3__["default"])(opposingPlayer, opposingPlayer.getBoard());
      
      if (opposingPlayer.getBoard().areAllShipsSunk()) console.log(`all ships are sunk for player ${opposingPlayer.getPlayerName()}`);
      switchActivePlayer();
      playGame();
    }));
  };

  return { createNewGame, getPlayer1, getPlayer2, playGame };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

// NOW I NEED TO CHECK IF ALL SHIPS ARE SUNK AND END THE GAME AND DISPLAY THE WINNER
// maybe check after each attack and after each displayGameboard if all ships are sunk on the gameboard, 
// if all ships are sunk on that gameboard, i can just return without doing playGame again
// and then for now just do a console.log message to say who has won and i shouldn't be able to click anymore

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

  // I think I have to test placeship, receiveAttack, and a
  return { createGameboard, getGameboard, placeShip, receiveAttack, getMissedAttacks, areAllShipsSunk };
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
const player = (name, gameboard) => {
  const playerName = name;
  const board = gameboard;
  const shots = [];

  const getPlayerName = () => playerName;
  const getBoard = () => board;
  const getShots = () => shots;

  const hasShotBefore = (row, column) => {
    let flag = false;
    shots.forEach((shot) => {
      if (shot[0] === row && shot[1] === column) {
        flag =  true;
      };
    });
    return flag;
  };
  
  const chooseRandomShot = () => {
    let returnValue = null;
    const row = Math.round(Math.random() * 10);
    const column = Math.round(Math.random() * 10);
    
    if (!hasShotBefore(row, column)) {
      shots.push([row, column]);
      returnValue = { row, column };
    }
    return returnValue;
  };

  return { getPlayerName, getBoard, getShots, chooseRandomShot, };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZUFBZSxxREFBSTtBQUNoRCxFQUFFLHFEQUFJO0FBQ04sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgZGlzcGxheVBsYXllckdhbWVib2FyZCBmcm9tIFwiLi91aVwiO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjE7XG4gIGxldCBwbGF5ZXIyO1xuICBsZXQgZ2FtZWJvYXJkMTtcbiAgbGV0IGdhbWVib2FyZDI7XG4gIGxldCBhY3RpdmVQbGF5ZXI7XG4gIGxldCBvcHBvc2luZ1BsYXllcjtcblxuICBjb25zdCBnZXRQbGF5ZXIxID0gKCkgPT4gcGxheWVyMTtcbiAgY29uc3QgZ2V0UGxheWVyMiA9ICgpID0+IHBsYXllcjI7XG4gIC8vIHdpbGwgcHJvYmFibHkgaGF2ZSB0byBhZGQgbmFtZSBwYXJhbWV0ZXJzIGxhdGVyIHNvIHRoYXQgcGxheWVycyBjYW4gc2V0IHRoZWlyIG5hbWVzXG4gIGNvbnN0IGNyZWF0ZU5ld0dhbWUgPSAoKSA9PiB7XG4gICAgZ2FtZWJvYXJkMSA9IEdhbWVib2FyZCgpO1xuICAgIGdhbWVib2FyZDIgPSBHYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXIxID0gcGxheWVyKFwiSm9oblwiLCBnYW1lYm9hcmQxKTtcbiAgICBwbGF5ZXIyID0gcGxheWVyKFwiYWlcIiwgZ2FtZWJvYXJkMik7XG4gICAgLy8gcGxheWVyMi5nZXRCb2FyZCgpLnJlY2VpdmVBdHRhY2soMCw5KTtcbiAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMjtcbiAgICAvLyBtaWdodCBuZWVkIHRvIGRpc3BsYXkgdGhlIGJvYXJkcyBoZXJlIGluc3RlYWQgb2YgY2FsbGluZyBzb21ld2hlcmUgZWxzZVxuICB9O1xuICBcbiAgY29uc3Qgc3dpdGNoQWN0aXZlUGxheWVyID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjI7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjE7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gICAgfVxuICB9O1xuICBjcmVhdGVOZXdHYW1lKCk7XG4gIGNvbnN0IHNoaXAxID0gU2hpcCgzKTtcbiAgY29uc3Qgc2hpcDIgPSBTaGlwKDMpO1xuICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgwLCAwLCBzaGlwMSk7XG4gIGdhbWVib2FyZDEucGxhY2VTaGlwKDEsIDAsIHNoaXAyKTtcblxuXG4gIGNvbnN0IHNoaXAzID0gU2hpcCgzKTtcbiAgY29uc3Qgc2hpcDQgPSBTaGlwKDMpO1xuICBnYW1lYm9hcmQyLnBsYWNlU2hpcCgwLCAwLCBzaGlwMyk7XG4gIGdhbWVib2FyZDIucGxhY2VTaGlwKDIsIDAsIHNoaXA0KTtcblxuICAvLyBtYXliZSBpIGNhbiByZWZhY3RvciB0aGlzLCBpIGNhbiBhZGQgYW4gZXZlbnRMaXN0ZW5lciBmb3IgZWFjaCBjZWxsLCBcbiAgLy8gYnV0IGl0IHdpbGwgb25seSByZWNlaXZlIGF0dGFjaywgYW5kIGRpc3BsYXkgcGxheWVyIGdhbWVib2FyZCBpZiBpdCdzIHRoYXQgcGVyc29uJ3MgdHVyblxuICAvLyBpbnN0ZWFkIG9mIGFkZGluZyBhbiBldmVudExpc3RlbmVyIGFnYWluXG4gIC8vIGJ1dCBpIG1pZ2h0IG5lZWQgdG8ga2VlcCBpdCBsaWtlIHRoaXMgYmVjYXVzZSBkaXNwbGF5IHRoZSBib2FyZCByZW1vdmVzIHRoZSBldmVudGxpc3RlbmVyc1xuXG4gIC8vIGkgY2FuIHJlZmFjdG9yIHRoaXMgdG8gaGF2ZSBhIGNvbmR0aW9uYWwgZm9yIGFjdGl2ZSBwbGF5ZXIsIHRoZW4ganVzdCBkZWNsYXJlIGNlbGxzIGJlZm9yZSBhbmQgXG4gIC8vIGluaXRpYWxpemUgY2VsbHMgaW5zaWRlIHRoZSBjb25kaXRpb25hbCBkZXBlbmRpbmcgb24gdGhlIGFjdGl2ZSBwbGF5ZXJcbiAgY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgbGV0IGNlbGxzO1xuXG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSkgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3JpZ2h0IC5jZWxsXCIpO1xuICAgIGVsc2UgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2xlZnQgLmNlbGxcIik7XG5cbiAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKSwgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKSk7XG4gICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICAgIFxuICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuYXJlQWxsU2hpcHNTdW5rKCkpIGNvbnNvbGUubG9nKGBhbGwgc2hpcHMgYXJlIHN1bmsgZm9yIHBsYXllciAke29wcG9zaW5nUGxheWVyLmdldFBsYXllck5hbWUoKX1gKTtcbiAgICAgIHN3aXRjaEFjdGl2ZVBsYXllcigpO1xuICAgICAgcGxheUdhbWUoKTtcbiAgICB9KSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlTmV3R2FtZSwgZ2V0UGxheWVyMSwgZ2V0UGxheWVyMiwgcGxheUdhbWUgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG5cbi8vIE5PVyBJIE5FRUQgVE8gQ0hFQ0sgSUYgQUxMIFNISVBTIEFSRSBTVU5LIEFORCBFTkQgVEhFIEdBTUUgQU5EIERJU1BMQVkgVEhFIFdJTk5FUlxuLy8gbWF5YmUgY2hlY2sgYWZ0ZXIgZWFjaCBhdHRhY2sgYW5kIGFmdGVyIGVhY2ggZGlzcGxheUdhbWVib2FyZCBpZiBhbGwgc2hpcHMgYXJlIHN1bmsgb24gdGhlIGdhbWVib2FyZCwgXG4vLyBpZiBhbGwgc2hpcHMgYXJlIHN1bmsgb24gdGhhdCBnYW1lYm9hcmQsIGkgY2FuIGp1c3QgcmV0dXJuIHdpdGhvdXQgZG9pbmcgcGxheUdhbWUgYWdhaW5cbi8vIGFuZCB0aGVuIGZvciBub3cganVzdCBkbyBhIGNvbnNvbGUubG9nIG1lc3NhZ2UgdG8gc2F5IHdobyBoYXMgd29uIGFuZCBpIHNob3VsZG4ndCBiZSBhYmxlIHRvIGNsaWNrIGFueW1vcmUiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiBnYW1lYm9hcmQ7XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goXCItXCIpO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZUdhbWVib2FyZCgpO1xuXG4gIC8vIG5lZWQgdG8gYWRkIGNvbmRpdGlvbmFscyB0byBjaGVjayBpZiBzaGlwcyBnbyBvdXQgb2YgcGFnZVxuICAvLyBhbHNvIGZvciBybiwgc2hpcHMgYXJlIG9ubHkgcGxhY2VkIGhvcml6b250YWxseVxuICBjb25zdCBwbGFjZVNoaXAgPSAocm93LCBjb2x1bW4sIHNoaXApID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uK2ldID0gXCJvXCI7XG4gICAgfVxuICAgXG4gICAgc2hpcHNDb29yZGluYXRlcy5wdXNoKHtyb3csIGNvbHVtbiwgc2hpcH0pOyBcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib1wiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2JqID0gc2hpcHNDb29yZGluYXRlc1tpXTtcbiAgICAgICAgaWYgKHJvdyA9PT0gb2JqLnJvdyAmJiAoY29sdW1uID49IG9iai5jb2x1bW4gJiYgY29sdW1uIDwgb2JqLmNvbHVtbiArIG9iai5zaGlwLmdldExlbmd0aCgpKSkge1xuICAgICAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcInhcIjtcbiAgICAgICAgICBvYmouc2hpcC5oaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICBzaGlwc1N1bmsgPSBzaGlwc0Nvb3JkaW5hdGVzLnJlZHVjZSggKGFjYywgY3VyKSA9PiB7XG4gICAgICBpZiAoY3VyLnNoaXAuaXNTdW5rKCkpIHJldHVybiBhY2MgKyAxO1xuICAgICAgcmV0dXJuIGFjYyArIDA7XG4gICAgfSwgMCk7XG4gICAgXG4gICAgcmV0dXJuIHNoaXBzU3VuayA9PT0gc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7XG4gIH07XG5cbiAgLy8gSSB0aGluayBJIGhhdmUgdG8gdGVzdCBwbGFjZXNoaXAsIHJlY2VpdmVBdHRhY2ssIGFuZCBhXG4gIHJldHVybiB7IGNyZWF0ZUdhbWVib2FyZCwgZ2V0R2FtZWJvYXJkLCBwbGFjZVNoaXAsIHJlY2VpdmVBdHRhY2ssIGdldE1pc3NlZEF0dGFja3MsIGFyZUFsbFNoaXBzU3VuayB9O1xufVxuXG4iLCJjb25zdCBwbGF5ZXIgPSAobmFtZSwgZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZDtcbiAgY29uc3Qgc2hvdHMgPSBbXTtcblxuICBjb25zdCBnZXRQbGF5ZXJOYW1lID0gKCkgPT4gcGxheWVyTmFtZTtcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcbiAgY29uc3QgZ2V0U2hvdHMgPSAoKSA9PiBzaG90cztcblxuICBjb25zdCBoYXNTaG90QmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBzaG90cy5mb3JFYWNoKChzaG90KSA9PiB7XG4gICAgICBpZiAoc2hvdFswXSA9PT0gcm93ICYmIHNob3RbMV0gPT09IGNvbHVtbikge1xuICAgICAgICBmbGFnID0gIHRydWU7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBmbGFnO1xuICB9O1xuICBcbiAgY29uc3QgY2hvb3NlUmFuZG9tU2hvdCA9ICgpID0+IHtcbiAgICBsZXQgcmV0dXJuVmFsdWUgPSBudWxsO1xuICAgIGNvbnN0IHJvdyA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgXG4gICAgaWYgKCFoYXNTaG90QmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgc2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHJldHVyblZhbHVlID0geyByb3csIGNvbHVtbiB9O1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0UGxheWVyTmFtZSwgZ2V0Qm9hcmQsIGdldFNob3RzLCBjaG9vc2VSYW5kb21TaG90LCB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG4gIGNvbnN0IGxlbmd0aE9mU2hpcCA9IGxlbmd0aDtcbiAgbGV0IG51bU9mSGl0cyA9IDA7XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoT2ZTaGlwO1xuICAvLyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICBjb25zdCBnZXROdW1PZkhpdHMgPSAoKSA9PiBudW1PZkhpdHM7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIG51bU9mSGl0cysrO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IChsZW5ndGhPZlNoaXAgLSBudW1PZkhpdHMpID09PSAwO1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rLCBnZXRMZW5ndGgsIGdldE51bU9mSGl0cyB9O1xufVxuIiwiY29uc3QgZGlzcGxheVBsYXllckdhbWVib2FyZCA9IChwbGF5ZXIsIGdhbWVib2FyZCkgPT4ge1xuICBsZXQgcGFyZW50Q29udGFpbmVyO1xuICBpZiAocGxheWVyLmdldFBsYXllck5hbWUoKSA9PT0gXCJhaVwiKSBwYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JpZ2h0XCIpO1xuICBlbHNlIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGVmdFwiKTtcbiBcbiAgLy8gY2xlYXJzIGl0IGZpcnN0IHRoZW4gYWRkcyB0aGUgZ2FtZWJvYXJkIHRvIHByZXZlbnQgZHVwbGljYXRpb25cbiAgcGFyZW50Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKCkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHJvd051bSA9IGk7XG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbk51bSA9IGo7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJ4XCIpIGNlbGwudGV4dENvbnRlbnQgPSBcInhcIjtcbiAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJvXCIpIGNlbGwudGV4dENvbnRlbnQgPSBcIm9cIjtcbiAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJtXCIpIGNlbGwudGV4dENvbnRlbnQgPSBcIm1cIjtcbiAgICAgICAgXG4gICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93TnVtO1xuICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbk51bTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICAgIHBhcmVudENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkO1xuLy8gZXhwb3J0IHsgZGlzcGxheVBsYXllckdhbWVib2FyZCwgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkIGZyb20gXCIuL21vZHVsZXMvdWlcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKEdhbWUuZ2V0UGxheWVyMSgpLCBHYW1lLmdldFBsYXllcjEoKS5nZXRCb2FyZCgpKTtcbiAgZGlzcGxheVBsYXllckdhbWVib2FyZChHYW1lLmdldFBsYXllcjIoKSwgR2FtZS5nZXRQbGF5ZXIyKCkuZ2V0Qm9hcmQoKSk7XG4gIEdhbWUucGxheUdhbWUoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9