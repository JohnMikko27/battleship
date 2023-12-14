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
    const row = Math.round(Math.random() * 10);
    const column = Math.round(Math.random() * 10);
    
    if (!hasShotCoordsBefore(row, column)) {
      shots.push([row, column]);
      returnValue = [row, column];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ2hCOztBQUVsQztBQUNBLEVBQUUsdURBQXNCLENBQUMscURBQUksZUFBZSxxREFBSTtBQUNoRCxFQUFFLHVEQUFzQixDQUFDLHFEQUFJLGVBQWUscURBQUk7QUFDaEQsRUFBRSxxREFBSTtBQUNOLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vdWkuanNcIjtcblxuY29uc3QgR2FtZSA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXIxO1xuICBsZXQgcGxheWVyMjtcbiAgbGV0IGdhbWVib2FyZDE7XG4gIGxldCBnYW1lYm9hcmQyO1xuICBsZXQgYWN0aXZlUGxheWVyO1xuICBsZXQgb3Bwb3NpbmdQbGF5ZXI7XG5cbiAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+IHBsYXllcjE7XG4gIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PiBwbGF5ZXIyO1xuICAvLyB3aWxsIHByb2JhYmx5IGhhdmUgdG8gYWRkIG5hbWUgcGFyYW1ldGVycyBsYXRlciBzbyB0aGF0IHBsYXllcnMgY2FuIHNldCB0aGVpciBuYW1lc1xuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIkpvaG5cIiwgZ2FtZWJvYXJkMSk7XG4gICAgcGxheWVyMiA9IHBsYXllcihcImFpXCIsIGdhbWVib2FyZDIpO1xuICAgIC8vIHBsYXllcjIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKDAsOSk7XG4gICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gICAgLy8gbWlnaHQgbmVlZCB0byBkaXNwbGF5IHRoZSBib2FyZHMgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgc29tZXdoZXJlIGVsc2VcbiAgfTtcbiAgXG4gIGNvbnN0IHN3aXRjaEFjdGl2ZVBsYXllciA9ICgpID0+IHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgIH1cbiAgfTtcblxuICBjcmVhdGVOZXdHYW1lKCk7XG4gIGNvbnN0IHNoaXAxID0gU2hpcCgzKTtcbiAgY29uc3Qgc2hpcDIgPSBTaGlwKDMpO1xuICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgwLCAwLCBzaGlwMSk7XG4gIGdhbWVib2FyZDEucGxhY2VTaGlwKDEsIDAsIHNoaXAyKTtcblxuXG4gIGNvbnN0IHNoaXAzID0gU2hpcCgzKTtcbiAgY29uc3Qgc2hpcDQgPSBTaGlwKDMpO1xuICBnYW1lYm9hcmQyLnBsYWNlU2hpcCgwLCAwLCBzaGlwMyk7XG4gIGdhbWVib2FyZDIucGxhY2VTaGlwKDIsIDAsIHNoaXA0KTtcblxuICAvLyBtYXliZSBpIGNhbiByZWZhY3RvciB0aGlzLCBpIGNhbiBhZGQgYW4gZXZlbnRMaXN0ZW5lciBmb3IgZWFjaCBjZWxsLCBcbiAgLy8gYnV0IGl0IHdpbGwgb25seSByZWNlaXZlIGF0dGFjaywgYW5kIGRpc3BsYXkgcGxheWVyIGdhbWVib2FyZCBpZiBpdCdzIHRoYXQgcGVyc29uJ3MgdHVyblxuICAvLyBpbnN0ZWFkIG9mIGFkZGluZyBhbiBldmVudExpc3RlbmVyIGFnYWluXG4gIC8vIGJ1dCBpIG1pZ2h0IG5lZWQgdG8ga2VlcCBpdCBsaWtlIHRoaXMgYmVjYXVzZSBkaXNwbGF5IHRoZSBib2FyZCByZW1vdmVzIHRoZSBldmVudGxpc3RlbmVyc1xuICBjb25zdCBwbGF5R2FtZSA9ICgpID0+IHtcbiAgICBsZXQgY2VsbHM7XG5cbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcmlnaHQgLmNlbGxcIik7XG4gICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcblxuICAgICAgICBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKSwgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKSk7XG4gICAgICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQob3Bwb3NpbmdQbGF5ZXIsIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkpO1xuXG4gICAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmFyZUFsbFNoaXBzU3VuaygpKSBjb25zb2xlLmxvZyhgYWxsIHNoaXBzIGFyZSBzdW5rIGZvciBwbGF5ZXIgJHtvcHBvc2luZ1BsYXllci5nZXRQbGF5ZXJOYW1lKCl9YCk7XG4gICAgICAgIHN3aXRjaEFjdGl2ZVBsYXllcigpO1xuICAgICAgICBwbGF5R2FtZSgpO1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8vIHNvIGNob29zZVJhbmRvbVNob3QgY2FuIGdvIG91dHNpZGUgdGhlIGJvYXJkLCBnb3R0YSBmaXggdGhhdFxuICAgIGVsc2Uge1xuICAgICAgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI2xlZnQgLmNlbGxcIik7XG4gICAgICBjb25zdCBzaG90ID0gYWN0aXZlUGxheWVyLmNob29zZVJhbmRvbVNob3QoKTtcbiAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhzaG90WzBdLCBzaG90WzFdKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQob3Bwb3NpbmdQbGF5ZXIsIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkpO1xuICAgICAgc3dpdGNoQWN0aXZlUGxheWVyKCk7XG4gICAgICBwbGF5R2FtZSgpO1xuICAgIH1cblxuICB9O1xuXG4gIHJldHVybiB7IGNyZWF0ZU5ld0dhbWUsIGdldFBsYXllcjEsIGdldFBsYXllcjIsIHBsYXlHYW1lIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuXG4vLyBub3cgaSBoYXZlIGEgYm90aCBib2FyZHMgd29ya2luZyB3aXRoIHRoZSByZWNlaXZlQXR0YWNrLCBwbGFjZVNoaXAsIGFuZCBhbGxTaGlwc1N1bmsgZnVuY3Rpb25zXG4vLyBub3cgaSBuZWVkIHRvIG1ha2UgYWkgcGxhY2UgaXRzIHNoaXBzIHJhbmRvbWx5XG4vLyBpIHByb2JhYmx5IGFsc28gbmVlZCB0byByZWZhY3RvciBwbGFjZXNoaXBzIGFuZCBtYWtlIHN1cmUgdGhhdCBpdCBvbmx5IHRha2VzIHZhbGlkIGNvb3JkaW5hdGVzXG4vLyBob3cgZG8gaSBtYWtlIHBsYWNlU2hpcHMga25vdyBpZiBpdHMgYSB2YWxpZCBjb29yZGluYXRlXG4vLyBtYXliZSBpZiBjb29yZGluYXRlcyBpcyBpbiBzaGlwcyBjb29yZGluYXRlcywgdGhlbiByZXR1cm4/Pz9cbi8vIGFmdGVyIGkgZ2V0IGFpIHRvIHBsYWNlIGl0cyBzaGlwcyByYW5kb21seSwgaSBuZWVkIHRvIGNoZWNrIHRoZSBnYW1lYm9hcmQgZnVuY3Rpb25zXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiBnYW1lYm9hcmQ7XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goXCItXCIpO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZUdhbWVib2FyZCgpO1xuXG4gIC8vIG5lZWQgdG8gYWRkIGNvbmRpdGlvbmFscyB0byBjaGVjayBpZiBzaGlwcyBnbyBvdXQgb2YgcGFnZVxuICAvLyBhbHNvIGZvciBybiwgc2hpcHMgYXJlIG9ubHkgcGxhY2VkIGhvcml6b250YWxseVxuICBjb25zdCBwbGFjZVNoaXAgPSAocm93LCBjb2x1bW4sIHNoaXApID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uK2ldID0gXCJvXCI7XG4gICAgfVxuICAgXG4gICAgc2hpcHNDb29yZGluYXRlcy5wdXNoKHtyb3csIGNvbHVtbiwgc2hpcH0pOyBcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib1wiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2JqID0gc2hpcHNDb29yZGluYXRlc1tpXTtcbiAgICAgICAgaWYgKHJvdyA9PT0gb2JqLnJvdyAmJiAoY29sdW1uID49IG9iai5jb2x1bW4gJiYgY29sdW1uIDwgb2JqLmNvbHVtbiArIG9iai5zaGlwLmdldExlbmd0aCgpKSkge1xuICAgICAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcInhcIjtcbiAgICAgICAgICBvYmouc2hpcC5oaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICBzaGlwc1N1bmsgPSBzaGlwc0Nvb3JkaW5hdGVzLnJlZHVjZSggKGFjYywgY3VyKSA9PiB7XG4gICAgICBpZiAoY3VyLnNoaXAuaXNTdW5rKCkpIHJldHVybiBhY2MgKyAxO1xuICAgICAgcmV0dXJuIGFjYyArIDA7XG4gICAgfSwgMCk7XG4gICAgXG4gICAgcmV0dXJuIHNoaXBzU3VuayA9PT0gc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlR2FtZWJvYXJkLCBnZXRHYW1lYm9hcmQsIHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgZ2V0TWlzc2VkQXR0YWNrcywgYXJlQWxsU2hpcHNTdW5rIH07XG59XG5cbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcblxuY29uc3QgcGxheWVyID0gKG5hbWUsIGdhbWVib2FyZCkgPT4ge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQ7XG4gIGNvbnN0IHNob3RzID0gW107XG5cbiAgY29uc3QgZ2V0UGxheWVyTmFtZSA9ICgpID0+IHBsYXllck5hbWU7XG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG4gIGNvbnN0IGdldFNob3RzID0gKCkgPT4gc2hvdHM7XG5cbiAgY29uc3QgaGFzU2hvdENvb3Jkc0JlZm9yZSA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgc2hvdHMuZm9yRWFjaCgoc2hvdCkgPT4ge1xuICAgICAgaWYgKHNob3RbMF0gPT09IHJvdyAmJiBzaG90WzFdID09PSBjb2x1bW4pIHtcbiAgICAgICAgZmxhZyA9ICB0cnVlO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmxhZztcbiAgfTtcbiAgXG4gIGNvbnN0IGNob29zZVJhbmRvbVNob3QgPSAoKSA9PiB7XG4gICAgbGV0IHJldHVyblZhbHVlO1xuICAgIGNvbnN0IHJvdyA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgXG4gICAgaWYgKCFoYXNTaG90Q29vcmRzQmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgc2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHJldHVyblZhbHVlID0gW3JvdywgY29sdW1uXTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xuXG4gIGNvbnN0IGdldFJhbmRvbVNoaXBQbGFjZW1lbnRzID0gKCkgPT4ge1xuICAgIFxuICAgIGNvbnN0IHNoaXAxID0gU2hpcCg0KTtcbiAgICBjb25zdCBzaGlwMiA9IFNoaXAoNCk7XG4gICAgLy8gY29uc3Qgc2hpcDMgPSBTaGlwKDQpO1xuXG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IFtcbiAgICAgIHtyb3c6IDEsIGNvbHVtbjogMywgc2hpcDogc2hpcDF9LCBcbiAgICAgIHtyb3c6IDIsIGNvbHVtbjogNCwgc2hpcDogc2hpcDJ9LCBcbiAgICAgIC8vIHtyb3c6IDMsIGNvbHVtbjogNSwgc2hpcDogc2hpcDN9LCBcbiAgICBdO1xuICAgIHJldHVybiBzaGlwQ29vcmRzO1xuICB9O1xuXG4gIHJldHVybiB7IGdldFBsYXllck5hbWUsIGdldEJvYXJkLCBnZXRTaG90cywgY2hvb3NlUmFuZG9tU2hvdCwgZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMgfTtcbn07XG4vLyBjb25zdCBzaGlwMSA9IFNoaXAoNCk7XG4vLyBjb25zdCBzaGlwMiA9IFNoaXAoMik7XG4vLyBjb25zdCBzaGlwMyA9IFNoaXAoMyk7XG4vLyBjb25zdCBzaGlwNCA9IFNoaXAoNCk7XG5cbi8vIGNvbnN0IHNoaXBzID0gW3NoaXAxLCBzaGlwMiwgc2hpcDMsIHNoaXA0XTtcbi8vIGNvbnNvbGUubG9nKHNoaXBzWzJdLmdldExlbmd0aCgpKTtcbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuICBjb25zdCBsZW5ndGhPZlNoaXAgPSBsZW5ndGg7XG4gIGxldCBudW1PZkhpdHMgPSAwO1xuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aE9mU2hpcDtcbiAgLy8gZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgY29uc3QgZ2V0TnVtT2ZIaXRzID0gKCkgPT4gbnVtT2ZIaXRzO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBudW1PZkhpdHMrKztcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiAobGVuZ3RoT2ZTaGlwIC0gbnVtT2ZIaXRzKSA9PT0gMDtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuaywgZ2V0TGVuZ3RoLCBnZXROdW1PZkhpdHMgfTtcbn1cbiIsImNvbnN0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgPSAocGxheWVyLCBnYW1lYm9hcmQpID0+IHtcbiAgbGV0IHBhcmVudENvbnRhaW5lcjtcbiAgaWYgKHBsYXllci5nZXRQbGF5ZXJOYW1lKCkgPT09IFwiYWlcIikgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyaWdodFwiKTtcbiAgZWxzZSBwYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xlZnRcIik7XG4gXG4gIC8vIGNsZWFycyBpdCBmaXJzdCB0aGVuIGFkZHMgdGhlIGdhbWVib2FyZCB0byBwcmV2ZW50IGR1cGxpY2F0aW9uXG4gIHBhcmVudENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByb3dOdW0gPSBpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjb2x1bW5OdW0gPSBqO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwieFwiKSBjZWxsLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgICBlbHNlIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwib1wiKSBjZWxsLnRleHRDb250ZW50ID0gXCJvXCI7XG4gICAgICBlbHNlIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwibVwiKSBjZWxsLnRleHRDb250ZW50ID0gXCJtXCI7XG4gICAgICAgIFxuICAgICAgY2VsbC5kYXRhc2V0LnJvdyA9IHJvd051bTtcbiAgICAgIGNlbGwuZGF0YXNldC5jb2x1bW4gPSBjb2x1bW5OdW07XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheVBsYXllckdhbWVib2FyZDtcbi8vIGV4cG9ydCB7IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQsIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZGlzcGxheVBsYXllckdhbWVib2FyZCBmcm9tIFwiLi9tb2R1bGVzL3VpXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgZGlzcGxheVBsYXllckdhbWVib2FyZChHYW1lLmdldFBsYXllcjEoKSwgR2FtZS5nZXRQbGF5ZXIxKCkuZ2V0Qm9hcmQoKSk7XG4gIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQoR2FtZS5nZXRQbGF5ZXIyKCksIEdhbWUuZ2V0UGxheWVyMigpLmdldEJvYXJkKCkpO1xuICBHYW1lLnBsYXlHYW1lKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==