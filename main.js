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
/*
 * 
 * At this point it is appropriate to begin crafting your User Interface.
 * The game loop should set up a new game by creating Players and Gameboards. 
 * For now just populate each Gameboard with predetermined coordinates. 
 * You are going to implement a system for allowing players to place their ships later.
 * We’ll leave the HTML implementation up to you for now, 
 * but you should display both the player’s boards and render them using information 
 * from the Gameboard class/factory.
 * You need methods to render the gameboards and to take user input for attacking.
 * For attacks, let the user click on a coordinate in the enemy Gameboard.
 * The game loop should step through the game turn by turn using only methods from other objects. 
 * If at any point you are tempted to write a new function inside the game loop, step back and figure out which class or module that function should belong to.
 * Create conditions so that the game ends once one player’s ships have all been sunk. 
 * This function is appropriate for the Game module.
 * 
 */

// create a new game by creating players and gameboards (and probably ships also, just for now, while testing)
// add the ships to the gameboards in predetermined coordinates
// display both player's boards and render them using information from the gameboard factory






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
    // add an eventListener for each cell in the opposing (not active player) board
    if (activePlayer === player1) {
      const cells = document.querySelectorAll("#right .cell");
      cells.forEach(cell => cell.addEventListener("click", (e) => {
        console.log(e.target.dataset.row, e.target.dataset.column);
        opposingPlayer.getBoard().receiveAttack(e.target.dataset.row, e.target.dataset.column);
        (0,_ui__WEBPACK_IMPORTED_MODULE_3__["default"])(opposingPlayer, opposingPlayer.getBoard());
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
        opposingPlayer.getBoard().receiveAttack(e.target.dataset.row, e.target.dataset.column);
        (0,_ui__WEBPACK_IMPORTED_MODULE_3__["default"])(opposingPlayer, opposingPlayer.getBoard());
        switchActivePlayer();
        playGame();
      
      }));
    }
  };

  return { createNewGame, getPlayer1, getPlayer2, playGame };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

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
  // also for rn, ships are only placed horizontally and can overlap
  const placeShip = (row, column, ship) => {
    for (let i = 0; i < ship.getLength(); i++) {
      gameboard[row][column+i] = "o";
    }
   
    shipsCoordinates.push({row, column, ship}); 
  };

  // for visualization purposes
  const printGameboard = () => {
    let result = "";
    gameboard.forEach((row) => {
      row.forEach((element) => {
        result += element;
      });
      console.log(result);
      result = "";
    });
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
    // see if you can change this to a reduce function
    shipsSunk = shipsCoordinates.reduce( (acc, cur) => {
      if (cur.ship.isSunk()) return acc + 1;
      return acc + 0;
    }, 0);
    
    
    // for (let i = 0; i < shipsCoordinates.length; i++) {
    //   if (shipsCoordinates[i].ship.isSunk()) {
    //     shipsSunk++;
    //   }
    // }
    console.log(shipsSunk);
    return shipsSunk === shipsCoordinates.length;
  };

  // I think I have to test placeship, receiveAttack, and areAllShips sunk 
  // at least whichever functions will ultimately be used with other funtions like ship function
  return { createGameboard, getGameboard, placeShip, printGameboard, receiveAttack, getMissedAttacks, areAllShipsSunk };
}

// import Ship from "./ship.js";
// const g = Gameboard();
// const ship1 = Ship(3);
// const ship2 = Ship(3);

// g.placeShip(3, 3, ship1);
// g.placeShip(4, 3, ship2);

// g.printGameboard();
// g.receiveAttack(3,4);
// g.receiveAttack(3,3);
// g.receiveAttack(3,5);
// g.receiveAttack(3,6);
// g.receiveAttack(6,9);

// g.receiveAttack(4,3);
// g.receiveAttack(4,4);
// g.receiveAttack(4,5);


// g.printGameboard();
// console.log(ship1.isSunk());
// console.log(ship2.isSunk());

// console.log(g.getMissedAttacks());
// console.log(g.areAllShipsSunk());


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
/*
 *
 * Players can take turns playing the game by attacking the enemy Gameboard.
 * The game is played against the computer, so make the ‘computer’ capable of making random plays. 
 * The AI does not have to be smart, but it should know whether or not a given move is legal
 *  (i.e. it shouldn’t shoot the same coordinate twice).
 *   
 */

// should i refactor computer? both computers and players will just be created from a player factory
// and that player factory will have all the methods that it has right now
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

// might need a placeAllships at random places function, or should this be in gameboard?
// const computer = () => {
//   const shots = [];
  
//   const getShots = () => shots;

//   const hasShotBefore = (row, column) => {
//     let flag = false;
//     shots.forEach((shot) => {
//       if (shot[0] === row && shot[1] === column) {
//         flag =  true;
//       };
//     });
//     return flag;
//   };
  
//   const chooseRandomShot = () => {
//     let returnValue = null;
//     const row = Math.round(Math.random() * 10);
//     const column = Math.round(Math.random() * 10);
    
//     if (!hasShotBefore(row, column)) {
//       shots.push([row, column]);
//       returnValue = { row, column };
//     }
//     return returnValue;
//   };

//   return { getShots, chooseRandomShot, };
// };


// console.log(c.chooseRandomShot());

// console.log(c.getShots());
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
//  if player.getName is ai, then set parent container to be right, if not then left
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
      // check if each gameboard[i][j] cell has a ship, has a missed attack, or has hit a ship
      // if so i could add different classes to differentiate the cell from different cells
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

// instructions didn't actullay say to use an array for keeping track of missedShtos
// might need to refactor gameboard.receiveAttack, mayeb make it so that initially everything is just a "-"
// when a ship is placed on a coordinate change it to a "o" and if a ship is it change to a "x"
// and if a coordinate that is not a ship is hit change to "m"
// so that when we display the board, we can get each individual element of the 2d board, check the value,
// and change it accordingly

// i should have a function that adds an eventListener to each cell
// I need to utilize shipCoordinates and missedAttacks, 
// if player clicked on a cell that has the same row and column as a ship, add a ship-hit style or something
// if player clicked on a cell that has no ships, add a style called noHit or something
// i should also have a function that removes that eventListener 
// so that when it's not that player's turn, then they won't be able to make a shot


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
  _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].createNewGame();
  (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"])(_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer1(), _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer1().getBoard());
  (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"])(_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer2(), _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer2().getBoard());
  _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].playGame();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHdDQUF3QztBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsaUVBQWUsc0JBQXNCLEVBQUM7QUFDdEMsWUFBWTs7Ozs7O1VDL0NaO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ2hCOztBQUVsQztBQUNBLEVBQUUscURBQUk7QUFDTixFQUFFLHVEQUFzQixDQUFDLHFEQUFJLGVBQWUscURBQUk7QUFDaEQsRUFBRSx1REFBc0IsQ0FBQyxxREFBSSxlQUFlLHFEQUFJO0FBQ2hELEVBQUUscURBQUk7QUFDTixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogXG4gKiBBdCB0aGlzIHBvaW50IGl0IGlzIGFwcHJvcHJpYXRlIHRvIGJlZ2luIGNyYWZ0aW5nIHlvdXIgVXNlciBJbnRlcmZhY2UuXG4gKiBUaGUgZ2FtZSBsb29wIHNob3VsZCBzZXQgdXAgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBQbGF5ZXJzIGFuZCBHYW1lYm9hcmRzLiBcbiAqIEZvciBub3cganVzdCBwb3B1bGF0ZSBlYWNoIEdhbWVib2FyZCB3aXRoIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXMuIFxuICogWW91IGFyZSBnb2luZyB0byBpbXBsZW1lbnQgYSBzeXN0ZW0gZm9yIGFsbG93aW5nIHBsYXllcnMgdG8gcGxhY2UgdGhlaXIgc2hpcHMgbGF0ZXIuXG4gKiBXZeKAmWxsIGxlYXZlIHRoZSBIVE1MIGltcGxlbWVudGF0aW9uIHVwIHRvIHlvdSBmb3Igbm93LCBcbiAqIGJ1dCB5b3Ugc2hvdWxkIGRpc3BsYXkgYm90aCB0aGUgcGxheWVy4oCZcyBib2FyZHMgYW5kIHJlbmRlciB0aGVtIHVzaW5nIGluZm9ybWF0aW9uIFxuICogZnJvbSB0aGUgR2FtZWJvYXJkIGNsYXNzL2ZhY3RvcnkuXG4gKiBZb3UgbmVlZCBtZXRob2RzIHRvIHJlbmRlciB0aGUgZ2FtZWJvYXJkcyBhbmQgdG8gdGFrZSB1c2VyIGlucHV0IGZvciBhdHRhY2tpbmcuXG4gKiBGb3IgYXR0YWNrcywgbGV0IHRoZSB1c2VyIGNsaWNrIG9uIGEgY29vcmRpbmF0ZSBpbiB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuICogVGhlIGdhbWUgbG9vcCBzaG91bGQgc3RlcCB0aHJvdWdoIHRoZSBnYW1lIHR1cm4gYnkgdHVybiB1c2luZyBvbmx5IG1ldGhvZHMgZnJvbSBvdGhlciBvYmplY3RzLiBcbiAqIElmIGF0IGFueSBwb2ludCB5b3UgYXJlIHRlbXB0ZWQgdG8gd3JpdGUgYSBuZXcgZnVuY3Rpb24gaW5zaWRlIHRoZSBnYW1lIGxvb3AsIHN0ZXAgYmFjayBhbmQgZmlndXJlIG91dCB3aGljaCBjbGFzcyBvciBtb2R1bGUgdGhhdCBmdW5jdGlvbiBzaG91bGQgYmVsb25nIHRvLlxuICogQ3JlYXRlIGNvbmRpdGlvbnMgc28gdGhhdCB0aGUgZ2FtZSBlbmRzIG9uY2Ugb25lIHBsYXllcuKAmXMgc2hpcHMgaGF2ZSBhbGwgYmVlbiBzdW5rLiBcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYXBwcm9wcmlhdGUgZm9yIHRoZSBHYW1lIG1vZHVsZS5cbiAqIFxuICovXG5cbi8vIGNyZWF0ZSBhIG5ldyBnYW1lIGJ5IGNyZWF0aW5nIHBsYXllcnMgYW5kIGdhbWVib2FyZHMgKGFuZCBwcm9iYWJseSBzaGlwcyBhbHNvLCBqdXN0IGZvciBub3csIHdoaWxlIHRlc3RpbmcpXG4vLyBhZGQgdGhlIHNoaXBzIHRvIHRoZSBnYW1lYm9hcmRzIGluIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXNcbi8vIGRpc3BsYXkgYm90aCBwbGF5ZXIncyBib2FyZHMgYW5kIHJlbmRlciB0aGVtIHVzaW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIGdhbWVib2FyZCBmYWN0b3J5XG5cbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vdWlcIjtcblxuY29uc3QgR2FtZSA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXIxO1xuICBsZXQgcGxheWVyMjtcbiAgbGV0IGdhbWVib2FyZDE7XG4gIGxldCBnYW1lYm9hcmQyO1xuICBsZXQgYWN0aXZlUGxheWVyO1xuICBsZXQgb3Bwb3NpbmdQbGF5ZXI7XG5cbiAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+IHBsYXllcjE7XG4gIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PiBwbGF5ZXIyO1xuICAvLyB3aWxsIHByb2JhYmx5IGhhdmUgdG8gYWRkIG5hbWUgcGFyYW1ldGVycyBsYXRlciBzbyB0aGF0IHBsYXllcnMgY2FuIHNldCB0aGVpciBuYW1lc1xuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIkpvaG5cIiwgZ2FtZWJvYXJkMSk7XG4gICAgcGxheWVyMiA9IHBsYXllcihcImFpXCIsIGdhbWVib2FyZDIpO1xuICAgIC8vIHBsYXllcjIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKDAsOSk7XG4gICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gIH07XG5cbiAgY29uc3Qgc3dpdGNoQWN0aXZlUGxheWVyID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjI7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjE7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIC8vIGFkZCBhbiBldmVudExpc3RlbmVyIGZvciBlYWNoIGNlbGwgaW4gdGhlIG9wcG9zaW5nIChub3QgYWN0aXZlIHBsYXllcikgYm9hcmRcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcmlnaHQgLmNlbGxcIik7XG4gICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbiAgICAgICAgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQob3Bwb3NpbmdQbGF5ZXIsIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkpO1xuICAgICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcbiAgICAgICAgcGxheUdhbWUoKTtcbiAgICAgICAgLy8gc28gbm93IEkgY2FuIHJlY2VpdmVBdHRhY2sgb24gdGhlIGJvYXJkIGFuZCBkaXNwbGF5IGl0IGNvcnJlY3RseSxcbiAgICAgICAgLy8gbm93LCBJIG5lZWQgdG8gcmVtb3ZlIHRoZSBldmVudExpc3RlbmVycyBhbmQgc3dpdGNoIHRoZSBhY3RpdmVwbGF5ZXJzXG4gICAgICAgIC8vIGFuZCB0aGVuIHJ1biBwbGF5R2FtZSgpXG4gICAgICB9KSk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjIpIHtcbiAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNsZWZ0IC5jZWxsXCIpO1xuICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICAgICAgc3dpdGNoQWN0aXZlUGxheWVyKCk7XG4gICAgICAgIHBsYXlHYW1lKCk7XG4gICAgICBcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlTmV3R2FtZSwgZ2V0UGxheWVyMSwgZ2V0UGxheWVyMiwgcGxheUdhbWUgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICBjb25zdCBnYW1lYm9hcmQgPSBbXTtcbiAgY29uc3Qgc2hpcHNDb29yZGluYXRlcyA9IFtdO1xuICBjb25zdCBtaXNzZWRBdHRhY2tzID0gW107XG5cbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT4gZ2FtZWJvYXJkO1xuXG4gIGNvbnN0IGdldE1pc3NlZEF0dGFja3MgPSAoKSA9PiBtaXNzZWRBdHRhY2tzO1xuXG4gIGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKFwiLVwiKTtcbiAgICAgIH1cbiAgICAgIGdhbWVib2FyZC5wdXNoKHJvdyk7XG4gICAgfVxuICB9O1xuICBjcmVhdGVHYW1lYm9hcmQoKTtcblxuICAvLyBuZWVkIHRvIGFkZCBjb25kaXRpb25hbHMgdG8gY2hlY2sgaWYgc2hpcHMgZ28gb3V0IG9mIHBhZ2VcbiAgLy8gYWxzbyBmb3Igcm4sIHNoaXBzIGFyZSBvbmx5IHBsYWNlZCBob3Jpem9udGFsbHkgYW5kIGNhbiBvdmVybGFwXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChyb3csIGNvbHVtbiwgc2hpcCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW4raV0gPSBcIm9cIjtcbiAgICB9XG4gICBcbiAgICBzaGlwc0Nvb3JkaW5hdGVzLnB1c2goe3JvdywgY29sdW1uLCBzaGlwfSk7IFxuICB9O1xuXG4gIC8vIGZvciB2aXN1YWxpemF0aW9uIHB1cnBvc2VzXG4gIGNvbnN0IHByaW50R2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGdhbWVib2FyZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIHJvdy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHJlc3VsdCArPSBlbGVtZW50O1xuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgcmVzdWx0ID0gXCJcIjtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib1wiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2JqID0gc2hpcHNDb29yZGluYXRlc1tpXTtcbiAgICAgICAgaWYgKHJvdyA9PT0gb2JqLnJvdyAmJiAoY29sdW1uID49IG9iai5jb2x1bW4gJiYgY29sdW1uIDwgb2JqLmNvbHVtbiArIG9iai5zaGlwLmdldExlbmd0aCgpKSkge1xuICAgICAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcInhcIjtcbiAgICAgICAgICBvYmouc2hpcC5oaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtaXNzZWRBdHRhY2tzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJtXCI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICAvLyBzZWUgaWYgeW91IGNhbiBjaGFuZ2UgdGhpcyB0byBhIHJlZHVjZSBmdW5jdGlvblxuICAgIHNoaXBzU3VuayA9IHNoaXBzQ29vcmRpbmF0ZXMucmVkdWNlKCAoYWNjLCBjdXIpID0+IHtcbiAgICAgIGlmIChjdXIuc2hpcC5pc1N1bmsoKSkgcmV0dXJuIGFjYyArIDE7XG4gICAgICByZXR1cm4gYWNjICsgMDtcbiAgICB9LCAwKTtcbiAgICBcbiAgICBcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgIGlmIChzaGlwc0Nvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAvLyAgICAgc2hpcHNTdW5rKys7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIGNvbnNvbGUubG9nKHNoaXBzU3Vuayk7XG4gICAgcmV0dXJuIHNoaXBzU3VuayA9PT0gc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7XG4gIH07XG5cbiAgLy8gSSB0aGluayBJIGhhdmUgdG8gdGVzdCBwbGFjZXNoaXAsIHJlY2VpdmVBdHRhY2ssIGFuZCBhcmVBbGxTaGlwcyBzdW5rIFxuICAvLyBhdCBsZWFzdCB3aGljaGV2ZXIgZnVuY3Rpb25zIHdpbGwgdWx0aW1hdGVseSBiZSB1c2VkIHdpdGggb3RoZXIgZnVudGlvbnMgbGlrZSBzaGlwIGZ1bmN0aW9uXG4gIHJldHVybiB7IGNyZWF0ZUdhbWVib2FyZCwgZ2V0R2FtZWJvYXJkLCBwbGFjZVNoaXAsIHByaW50R2FtZWJvYXJkLCByZWNlaXZlQXR0YWNrLCBnZXRNaXNzZWRBdHRhY2tzLCBhcmVBbGxTaGlwc1N1bmsgfTtcbn1cblxuLy8gaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuLy8gY29uc3QgZyA9IEdhbWVib2FyZCgpO1xuLy8gY29uc3Qgc2hpcDEgPSBTaGlwKDMpO1xuLy8gY29uc3Qgc2hpcDIgPSBTaGlwKDMpO1xuXG4vLyBnLnBsYWNlU2hpcCgzLCAzLCBzaGlwMSk7XG4vLyBnLnBsYWNlU2hpcCg0LCAzLCBzaGlwMik7XG5cbi8vIGcucHJpbnRHYW1lYm9hcmQoKTtcbi8vIGcucmVjZWl2ZUF0dGFjaygzLDQpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDMsMyk7XG4vLyBnLnJlY2VpdmVBdHRhY2soMyw1KTtcbi8vIGcucmVjZWl2ZUF0dGFjaygzLDYpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDYsOSk7XG5cbi8vIGcucmVjZWl2ZUF0dGFjayg0LDMpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDQsNCk7XG4vLyBnLnJlY2VpdmVBdHRhY2soNCw1KTtcblxuXG4vLyBnLnByaW50R2FtZWJvYXJkKCk7XG4vLyBjb25zb2xlLmxvZyhzaGlwMS5pc1N1bmsoKSk7XG4vLyBjb25zb2xlLmxvZyhzaGlwMi5pc1N1bmsoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGcuZ2V0TWlzc2VkQXR0YWNrcygpKTtcbi8vIGNvbnNvbGUubG9nKGcuYXJlQWxsU2hpcHNTdW5rKCkpO1xuIiwiLypcbiAqXG4gKiBQbGF5ZXJzIGNhbiB0YWtlIHR1cm5zIHBsYXlpbmcgdGhlIGdhbWUgYnkgYXR0YWNraW5nIHRoZSBlbmVteSBHYW1lYm9hcmQuXG4gKiBUaGUgZ2FtZSBpcyBwbGF5ZWQgYWdhaW5zdCB0aGUgY29tcHV0ZXIsIHNvIG1ha2UgdGhlIOKAmGNvbXB1dGVy4oCZIGNhcGFibGUgb2YgbWFraW5nIHJhbmRvbSBwbGF5cy4gXG4gKiBUaGUgQUkgZG9lcyBub3QgaGF2ZSB0byBiZSBzbWFydCwgYnV0IGl0IHNob3VsZCBrbm93IHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbW92ZSBpcyBsZWdhbFxuICogIChpLmUuIGl0IHNob3VsZG7igJl0IHNob290IHRoZSBzYW1lIGNvb3JkaW5hdGUgdHdpY2UpLlxuICogICBcbiAqL1xuXG4vLyBzaG91bGQgaSByZWZhY3RvciBjb21wdXRlcj8gYm90aCBjb21wdXRlcnMgYW5kIHBsYXllcnMgd2lsbCBqdXN0IGJlIGNyZWF0ZWQgZnJvbSBhIHBsYXllciBmYWN0b3J5XG4vLyBhbmQgdGhhdCBwbGF5ZXIgZmFjdG9yeSB3aWxsIGhhdmUgYWxsIHRoZSBtZXRob2RzIHRoYXQgaXQgaGFzIHJpZ2h0IG5vd1xuY29uc3QgcGxheWVyID0gKG5hbWUsIGdhbWVib2FyZCkgPT4ge1xuICBjb25zdCBwbGF5ZXJOYW1lID0gbmFtZTtcbiAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQ7XG4gIGNvbnN0IHNob3RzID0gW107XG5cbiAgY29uc3QgZ2V0UGxheWVyTmFtZSA9ICgpID0+IHBsYXllck5hbWU7XG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG4gIGNvbnN0IGdldFNob3RzID0gKCkgPT4gc2hvdHM7XG5cbiAgY29uc3QgaGFzU2hvdEJlZm9yZSA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgc2hvdHMuZm9yRWFjaCgoc2hvdCkgPT4ge1xuICAgICAgaWYgKHNob3RbMF0gPT09IHJvdyAmJiBzaG90WzFdID09PSBjb2x1bW4pIHtcbiAgICAgICAgZmxhZyA9ICB0cnVlO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gZmxhZztcbiAgfTtcbiAgXG4gIGNvbnN0IGNob29zZVJhbmRvbVNob3QgPSAoKSA9PiB7XG4gICAgbGV0IHJldHVyblZhbHVlID0gbnVsbDtcbiAgICBjb25zdCByb3cgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIFxuICAgIGlmICghaGFzU2hvdEJlZm9yZShyb3csIGNvbHVtbikpIHtcbiAgICAgIHNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICByZXR1cm5WYWx1ZSA9IHsgcm93LCBjb2x1bW4gfTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICB9O1xuXG4gIHJldHVybiB7IGdldFBsYXllck5hbWUsIGdldEJvYXJkLCBnZXRTaG90cywgY2hvb3NlUmFuZG9tU2hvdCwgfTtcbn07XG5cbi8vIG1pZ2h0IG5lZWQgYSBwbGFjZUFsbHNoaXBzIGF0IHJhbmRvbSBwbGFjZXMgZnVuY3Rpb24sIG9yIHNob3VsZCB0aGlzIGJlIGluIGdhbWVib2FyZD9cbi8vIGNvbnN0IGNvbXB1dGVyID0gKCkgPT4ge1xuLy8gICBjb25zdCBzaG90cyA9IFtdO1xuICBcbi8vICAgY29uc3QgZ2V0U2hvdHMgPSAoKSA9PiBzaG90cztcblxuLy8gICBjb25zdCBoYXNTaG90QmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4vLyAgICAgbGV0IGZsYWcgPSBmYWxzZTtcbi8vICAgICBzaG90cy5mb3JFYWNoKChzaG90KSA9PiB7XG4vLyAgICAgICBpZiAoc2hvdFswXSA9PT0gcm93ICYmIHNob3RbMV0gPT09IGNvbHVtbikge1xuLy8gICAgICAgICBmbGFnID0gIHRydWU7XG4vLyAgICAgICB9O1xuLy8gICAgIH0pO1xuLy8gICAgIHJldHVybiBmbGFnO1xuLy8gICB9O1xuICBcbi8vICAgY29uc3QgY2hvb3NlUmFuZG9tU2hvdCA9ICgpID0+IHtcbi8vICAgICBsZXQgcmV0dXJuVmFsdWUgPSBudWxsO1xuLy8gICAgIGNvbnN0IHJvdyA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbi8vICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgXG4vLyAgICAgaWYgKCFoYXNTaG90QmVmb3JlKHJvdywgY29sdW1uKSkge1xuLy8gICAgICAgc2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbi8vICAgICAgIHJldHVyblZhbHVlID0geyByb3csIGNvbHVtbiB9O1xuLy8gICAgIH1cbi8vICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4vLyAgIH07XG5cbi8vICAgcmV0dXJuIHsgZ2V0U2hvdHMsIGNob29zZVJhbmRvbVNob3QsIH07XG4vLyB9O1xuXG5cbi8vIGNvbnNvbGUubG9nKGMuY2hvb3NlUmFuZG9tU2hvdCgpKTtcblxuLy8gY29uc29sZS5sb2coYy5nZXRTaG90cygpKTtcbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuICBjb25zdCBsZW5ndGhPZlNoaXAgPSBsZW5ndGg7XG4gIGxldCBudW1PZkhpdHMgPSAwO1xuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aE9mU2hpcDtcbiAgLy8gZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgY29uc3QgZ2V0TnVtT2ZIaXRzID0gKCkgPT4gbnVtT2ZIaXRzO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBudW1PZkhpdHMrKztcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiAobGVuZ3RoT2ZTaGlwIC0gbnVtT2ZIaXRzKSA9PT0gMDtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuaywgZ2V0TGVuZ3RoLCBnZXROdW1PZkhpdHMgfTtcbn1cbiIsIi8vICBpZiBwbGF5ZXIuZ2V0TmFtZSBpcyBhaSwgdGhlbiBzZXQgcGFyZW50IGNvbnRhaW5lciB0byBiZSByaWdodCwgaWYgbm90IHRoZW4gbGVmdFxuY29uc3QgZGlzcGxheVBsYXllckdhbWVib2FyZCA9IChwbGF5ZXIsIGdhbWVib2FyZCkgPT4ge1xuICBsZXQgcGFyZW50Q29udGFpbmVyO1xuICBpZiAocGxheWVyLmdldFBsYXllck5hbWUoKSA9PT0gXCJhaVwiKSBwYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JpZ2h0XCIpO1xuICBlbHNlIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGVmdFwiKTtcbiBcbiAgLy8gY2xlYXJzIGl0IGZpcnN0IHRoZW4gYWRkcyB0aGUgZ2FtZWJvYXJkIHRvIHByZXZlbnQgZHVwbGljYXRpb25cbiAgcGFyZW50Q29udGFpbmVyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKCkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHJvd051bSA9IGk7XG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbk51bSA9IGo7XG4gICAgICAvLyBjaGVjayBpZiBlYWNoIGdhbWVib2FyZFtpXVtqXSBjZWxsIGhhcyBhIHNoaXAsIGhhcyBhIG1pc3NlZCBhdHRhY2ssIG9yIGhhcyBoaXQgYSBzaGlwXG4gICAgICAvLyBpZiBzbyBpIGNvdWxkIGFkZCBkaWZmZXJlbnQgY2xhc3NlcyB0byBkaWZmZXJlbnRpYXRlIHRoZSBjZWxsIGZyb20gZGlmZmVyZW50IGNlbGxzXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJ4XCIpIGNlbGwudGV4dENvbnRlbnQgPSBcInhcIjtcbiAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJvXCIpIGNlbGwudGV4dENvbnRlbnQgPSBcIm9cIjtcbiAgICAgIGVsc2UgaWYgKGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXVtqXSA9PT0gXCJtXCIpIGNlbGwudGV4dENvbnRlbnQgPSBcIm1cIjtcbiAgICAgICAgXG4gICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93TnVtO1xuICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbk51bTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICAgIHBhcmVudENvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpO1xuICB9XG59O1xuXG4vLyBpbnN0cnVjdGlvbnMgZGlkbid0IGFjdHVsbGF5IHNheSB0byB1c2UgYW4gYXJyYXkgZm9yIGtlZXBpbmcgdHJhY2sgb2YgbWlzc2VkU2h0b3Ncbi8vIG1pZ2h0IG5lZWQgdG8gcmVmYWN0b3IgZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2ssIG1heWViIG1ha2UgaXQgc28gdGhhdCBpbml0aWFsbHkgZXZlcnl0aGluZyBpcyBqdXN0IGEgXCItXCJcbi8vIHdoZW4gYSBzaGlwIGlzIHBsYWNlZCBvbiBhIGNvb3JkaW5hdGUgY2hhbmdlIGl0IHRvIGEgXCJvXCIgYW5kIGlmIGEgc2hpcCBpcyBpdCBjaGFuZ2UgdG8gYSBcInhcIlxuLy8gYW5kIGlmIGEgY29vcmRpbmF0ZSB0aGF0IGlzIG5vdCBhIHNoaXAgaXMgaGl0IGNoYW5nZSB0byBcIm1cIlxuLy8gc28gdGhhdCB3aGVuIHdlIGRpc3BsYXkgdGhlIGJvYXJkLCB3ZSBjYW4gZ2V0IGVhY2ggaW5kaXZpZHVhbCBlbGVtZW50IG9mIHRoZSAyZCBib2FyZCwgY2hlY2sgdGhlIHZhbHVlLFxuLy8gYW5kIGNoYW5nZSBpdCBhY2NvcmRpbmdseVxuXG4vLyBpIHNob3VsZCBoYXZlIGEgZnVuY3Rpb24gdGhhdCBhZGRzIGFuIGV2ZW50TGlzdGVuZXIgdG8gZWFjaCBjZWxsXG4vLyBJIG5lZWQgdG8gdXRpbGl6ZSBzaGlwQ29vcmRpbmF0ZXMgYW5kIG1pc3NlZEF0dGFja3MsIFxuLy8gaWYgcGxheWVyIGNsaWNrZWQgb24gYSBjZWxsIHRoYXQgaGFzIHRoZSBzYW1lIHJvdyBhbmQgY29sdW1uIGFzIGEgc2hpcCwgYWRkIGEgc2hpcC1oaXQgc3R5bGUgb3Igc29tZXRoaW5nXG4vLyBpZiBwbGF5ZXIgY2xpY2tlZCBvbiBhIGNlbGwgdGhhdCBoYXMgbm8gc2hpcHMsIGFkZCBhIHN0eWxlIGNhbGxlZCBub0hpdCBvciBzb21ldGhpbmdcbi8vIGkgc2hvdWxkIGFsc28gaGF2ZSBhIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGF0IGV2ZW50TGlzdGVuZXIgXG4vLyBzbyB0aGF0IHdoZW4gaXQncyBub3QgdGhhdCBwbGF5ZXIncyB0dXJuLCB0aGVuIHRoZXkgd29uJ3QgYmUgYWJsZSB0byBtYWtlIGEgc2hvdFxuXG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQ7XG4vLyBleHBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vbW9kdWxlcy91aVwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vbW9kdWxlcy9nYW1lXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIEdhbWUuY3JlYXRlTmV3R2FtZSgpO1xuICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKEdhbWUuZ2V0UGxheWVyMSgpLCBHYW1lLmdldFBsYXllcjEoKS5nZXRCb2FyZCgpKTtcbiAgZGlzcGxheVBsYXllckdhbWVib2FyZChHYW1lLmdldFBsYXllcjIoKSwgR2FtZS5nZXRQbGF5ZXIyKCkuZ2V0Qm9hcmQoKSk7XG4gIEdhbWUucGxheUdhbWUoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9