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

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;
  // will probably have to add name parameters later so that players can set their names
  const createNewGame = () => {
    gameboard1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    gameboard2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])("John", gameboard1);
    player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])("Michael", gameboard2);
  };

  return { createNewGame, getPlayer1, getPlayer2 };
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
    } else missedAttacks.push([row, column]);
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
// need a function that gets a gameboard and displays where the ships are and where it has been hit

const displayPlayerGameboard = (gameboard) => {
  const left = document.querySelector("#left");
  // clears it first then adds the gameboard to prevent duplication
  left.textContent = "";
  for (let i = 0; i < gameboard.getGameboard().length; i++) {
    const row = document.createElement("div");
    const rowNum = i;
    let columnNum = 0;
    row.classList.add("row");
    for (let j = 0; j < gameboard.getGameboard()[i].length; j++) {
      columnNum = j;
      // check if each gameboard[i][j] cell has a ship, has a missed attack, or has hit a ship
      // if so i could add different classes to differentiate the cell from different cells
      const cell = document.createElement("div");
      cell.dataset.row = rowNum;
      cell.dataset.column = columnNum;
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    left.appendChild(row);
  }
};

// i should have a function that adds an eventListener to each cell
// I need to utilize shipCoordinates and missedAttacks, 
// if player clicked on a cell that has the same row and column as a ship, add a ship-hit style or something
// if player clicked on a cell that has no ships, add a style called noHit or something
// bc whats the point of missedShots array or ship coordinates if i just use "o"s and "x"s to identify them
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
  (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"])(_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer1().getBoard());
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUU4QjtBQUNNO0FBQ1Y7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsc0RBQVM7QUFDMUIsaUJBQWlCLHNEQUFTO0FBQzFCLGNBQWMsbURBQU07QUFDcEIsY0FBYyxtREFBTTtBQUNwQjs7QUFFQSxXQUFXO0FBQ1gsQ0FBQzs7QUFFRCxpRUFBZSxJQUFJOzs7Ozs7Ozs7Ozs7OztBQzdDSjtBQUNmO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZCQUE2QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx1QkFBdUIsNkJBQTZCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkOzs7QUFHQTs7QUFFQTtBQUNBLGlFQUFlLE1BQU07Ozs7Ozs7Ozs7Ozs7O0FDaEZOO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLFdBQVc7QUFDWDs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUNBQXFDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdDQUF3QztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLGlFQUFlLHNCQUFzQixFQUFDO0FBQ3RDLFlBQVk7Ozs7OztVQ25DWjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNoQjs7QUFFbEM7QUFDQSxFQUFFLHFEQUFJO0FBQ04sRUFBRSx1REFBc0IsQ0FBQyxxREFBSTtBQUM3QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogXG4gKiBBdCB0aGlzIHBvaW50IGl0IGlzIGFwcHJvcHJpYXRlIHRvIGJlZ2luIGNyYWZ0aW5nIHlvdXIgVXNlciBJbnRlcmZhY2UuXG4gKiBUaGUgZ2FtZSBsb29wIHNob3VsZCBzZXQgdXAgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBQbGF5ZXJzIGFuZCBHYW1lYm9hcmRzLiBcbiAqIEZvciBub3cganVzdCBwb3B1bGF0ZSBlYWNoIEdhbWVib2FyZCB3aXRoIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXMuIFxuICogWW91IGFyZSBnb2luZyB0byBpbXBsZW1lbnQgYSBzeXN0ZW0gZm9yIGFsbG93aW5nIHBsYXllcnMgdG8gcGxhY2UgdGhlaXIgc2hpcHMgbGF0ZXIuXG4gKiBXZeKAmWxsIGxlYXZlIHRoZSBIVE1MIGltcGxlbWVudGF0aW9uIHVwIHRvIHlvdSBmb3Igbm93LCBcbiAqIGJ1dCB5b3Ugc2hvdWxkIGRpc3BsYXkgYm90aCB0aGUgcGxheWVy4oCZcyBib2FyZHMgYW5kIHJlbmRlciB0aGVtIHVzaW5nIGluZm9ybWF0aW9uIFxuICogZnJvbSB0aGUgR2FtZWJvYXJkIGNsYXNzL2ZhY3RvcnkuXG4gKiBZb3UgbmVlZCBtZXRob2RzIHRvIHJlbmRlciB0aGUgZ2FtZWJvYXJkcyBhbmQgdG8gdGFrZSB1c2VyIGlucHV0IGZvciBhdHRhY2tpbmcuXG4gKiBGb3IgYXR0YWNrcywgbGV0IHRoZSB1c2VyIGNsaWNrIG9uIGEgY29vcmRpbmF0ZSBpbiB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuICogVGhlIGdhbWUgbG9vcCBzaG91bGQgc3RlcCB0aHJvdWdoIHRoZSBnYW1lIHR1cm4gYnkgdHVybiB1c2luZyBvbmx5IG1ldGhvZHMgZnJvbSBvdGhlciBvYmplY3RzLiBcbiAqIElmIGF0IGFueSBwb2ludCB5b3UgYXJlIHRlbXB0ZWQgdG8gd3JpdGUgYSBuZXcgZnVuY3Rpb24gaW5zaWRlIHRoZSBnYW1lIGxvb3AsIHN0ZXAgYmFjayBhbmQgZmlndXJlIG91dCB3aGljaCBjbGFzcyBvciBtb2R1bGUgdGhhdCBmdW5jdGlvbiBzaG91bGQgYmVsb25nIHRvLlxuICogQ3JlYXRlIGNvbmRpdGlvbnMgc28gdGhhdCB0aGUgZ2FtZSBlbmRzIG9uY2Ugb25lIHBsYXllcuKAmXMgc2hpcHMgaGF2ZSBhbGwgYmVlbiBzdW5rLiBcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYXBwcm9wcmlhdGUgZm9yIHRoZSBHYW1lIG1vZHVsZS5cbiAqIFxuICovXG5cbi8vIGNyZWF0ZSBhIG5ldyBnYW1lIGJ5IGNyZWF0aW5nIHBsYXllcnMgYW5kIGdhbWVib2FyZHMgKGFuZCBwcm9iYWJseSBzaGlwcyBhbHNvLCBqdXN0IGZvciBub3csIHdoaWxlIHRlc3RpbmcpXG4vLyBhZGQgdGhlIHNoaXBzIHRvIHRoZSBnYW1lYm9hcmRzIGluIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXNcbi8vIGRpc3BsYXkgYm90aCBwbGF5ZXIncyBib2FyZHMgYW5kIHJlbmRlciB0aGVtIHVzaW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIGdhbWVib2FyZCBmYWN0b3J5XG5cbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjE7XG4gIGxldCBwbGF5ZXIyO1xuICBsZXQgZ2FtZWJvYXJkMTtcbiAgbGV0IGdhbWVib2FyZDI7XG5cbiAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+IHBsYXllcjE7XG4gIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PiBwbGF5ZXIyO1xuICAvLyB3aWxsIHByb2JhYmx5IGhhdmUgdG8gYWRkIG5hbWUgcGFyYW1ldGVycyBsYXRlciBzbyB0aGF0IHBsYXllcnMgY2FuIHNldCB0aGVpciBuYW1lc1xuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIkpvaG5cIiwgZ2FtZWJvYXJkMSk7XG4gICAgcGxheWVyMiA9IHBsYXllcihcIk1pY2hhZWxcIiwgZ2FtZWJvYXJkMik7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlTmV3R2FtZSwgZ2V0UGxheWVyMSwgZ2V0UGxheWVyMiB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiBnYW1lYm9hcmQ7XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goXCItXCIpO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZUdhbWVib2FyZCgpO1xuXG4gIC8vIG5lZWQgdG8gYWRkIGNvbmRpdGlvbmFscyB0byBjaGVjayBpZiBzaGlwcyBnbyBvdXQgb2YgcGFnZVxuICAvLyBhbHNvIGZvciBybiwgc2hpcHMgYXJlIG9ubHkgcGxhY2VkIGhvcml6b250YWxseSBhbmQgY2FuIG92ZXJsYXBcbiAgY29uc3QgcGxhY2VTaGlwID0gKHJvdywgY29sdW1uLCBzaGlwKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbitpXSA9IFwib1wiO1xuICAgIH1cbiAgIFxuICAgIHNoaXBzQ29vcmRpbmF0ZXMucHVzaCh7cm93LCBjb2x1bW4sIHNoaXB9KTsgXG4gIH07XG5cbiAgLy8gZm9yIHZpc3VhbGl6YXRpb24gcHVycG9zZXNcbiAgY29uc3QgcHJpbnRHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgZ2FtZWJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgcm93LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgcmVzdWx0ICs9IGVsZW1lbnQ7XG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICByZXN1bHQgPSBcIlwiO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBpZiAoZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJvXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBvYmogPSBzaGlwc0Nvb3JkaW5hdGVzW2ldO1xuICAgICAgICBpZiAocm93ID09PSBvYmoucm93ICYmIChjb2x1bW4gPj0gb2JqLmNvbHVtbiAmJiBjb2x1bW4gPCBvYmouY29sdW1uICsgb2JqLnNoaXAuZ2V0TGVuZ3RoKCkpKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9IFwieFwiO1xuICAgICAgICAgIG9iai5zaGlwLmhpdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIG1pc3NlZEF0dGFja3MucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgfTtcblxuICBjb25zdCBhcmVBbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgLy8gc2VlIGlmIHlvdSBjYW4gY2hhbmdlIHRoaXMgdG8gYSByZWR1Y2UgZnVuY3Rpb25cbiAgICBzaGlwc1N1bmsgPSBzaGlwc0Nvb3JkaW5hdGVzLnJlZHVjZSggKGFjYywgY3VyKSA9PiB7XG4gICAgICBpZiAoY3VyLnNoaXAuaXNTdW5rKCkpIHJldHVybiBhY2MgKyAxO1xuICAgICAgcmV0dXJuIGFjYyArIDA7XG4gICAgfSwgMCk7XG4gICAgXG4gICAgXG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gICBpZiAoc2hpcHNDb29yZGluYXRlc1tpXS5zaGlwLmlzU3VuaygpKSB7XG4gICAgLy8gICAgIHNoaXBzU3VuaysrO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICBjb25zb2xlLmxvZyhzaGlwc1N1bmspO1xuICAgIHJldHVybiBzaGlwc1N1bmsgPT09IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoO1xuICB9O1xuXG4gIC8vIEkgdGhpbmsgSSBoYXZlIHRvIHRlc3QgcGxhY2VzaGlwLCByZWNlaXZlQXR0YWNrLCBhbmQgYXJlQWxsU2hpcHMgc3VuayBcbiAgLy8gYXQgbGVhc3Qgd2hpY2hldmVyIGZ1bmN0aW9ucyB3aWxsIHVsdGltYXRlbHkgYmUgdXNlZCB3aXRoIG90aGVyIGZ1bnRpb25zIGxpa2Ugc2hpcCBmdW5jdGlvblxuICByZXR1cm4geyBjcmVhdGVHYW1lYm9hcmQsIGdldEdhbWVib2FyZCwgcGxhY2VTaGlwLCBwcmludEdhbWVib2FyZCwgcmVjZWl2ZUF0dGFjaywgZ2V0TWlzc2VkQXR0YWNrcywgYXJlQWxsU2hpcHNTdW5rIH07XG59XG5cbi8vIGltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcbi8vIGNvbnN0IGcgPSBHYW1lYm9hcmQoKTtcbi8vIGNvbnN0IHNoaXAxID0gU2hpcCgzKTtcbi8vIGNvbnN0IHNoaXAyID0gU2hpcCgzKTtcblxuLy8gZy5wbGFjZVNoaXAoMywgMywgc2hpcDEpO1xuLy8gZy5wbGFjZVNoaXAoNCwgMywgc2hpcDIpO1xuXG4vLyBnLnByaW50R2FtZWJvYXJkKCk7XG4vLyBnLnJlY2VpdmVBdHRhY2soMyw0KTtcbi8vIGcucmVjZWl2ZUF0dGFjaygzLDMpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDMsNSk7XG4vLyBnLnJlY2VpdmVBdHRhY2soMyw2KTtcbi8vIGcucmVjZWl2ZUF0dGFjayg2LDkpO1xuXG4vLyBnLnJlY2VpdmVBdHRhY2soNCwzKTtcbi8vIGcucmVjZWl2ZUF0dGFjayg0LDQpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDQsNSk7XG5cblxuLy8gZy5wcmludEdhbWVib2FyZCgpO1xuLy8gY29uc29sZS5sb2coc2hpcDEuaXNTdW5rKCkpO1xuLy8gY29uc29sZS5sb2coc2hpcDIuaXNTdW5rKCkpO1xuXG4vLyBjb25zb2xlLmxvZyhnLmdldE1pc3NlZEF0dGFja3MoKSk7XG4vLyBjb25zb2xlLmxvZyhnLmFyZUFsbFNoaXBzU3VuaygpKTtcbiIsIi8qXG4gKlxuICogUGxheWVycyBjYW4gdGFrZSB0dXJucyBwbGF5aW5nIHRoZSBnYW1lIGJ5IGF0dGFja2luZyB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuICogVGhlIGdhbWUgaXMgcGxheWVkIGFnYWluc3QgdGhlIGNvbXB1dGVyLCBzbyBtYWtlIHRoZSDigJhjb21wdXRlcuKAmSBjYXBhYmxlIG9mIG1ha2luZyByYW5kb20gcGxheXMuIFxuICogVGhlIEFJIGRvZXMgbm90IGhhdmUgdG8gYmUgc21hcnQsIGJ1dCBpdCBzaG91bGQga25vdyB3aGV0aGVyIG9yIG5vdCBhIGdpdmVuIG1vdmUgaXMgbGVnYWxcbiAqICAoaS5lLiBpdCBzaG91bGRu4oCZdCBzaG9vdCB0aGUgc2FtZSBjb29yZGluYXRlIHR3aWNlKS5cbiAqICAgXG4gKi9cblxuLy8gc2hvdWxkIGkgcmVmYWN0b3IgY29tcHV0ZXI/IGJvdGggY29tcHV0ZXJzIGFuZCBwbGF5ZXJzIHdpbGwganVzdCBiZSBjcmVhdGVkIGZyb20gYSBwbGF5ZXIgZmFjdG9yeVxuLy8gYW5kIHRoYXQgcGxheWVyIGZhY3Rvcnkgd2lsbCBoYXZlIGFsbCB0aGUgbWV0aG9kcyB0aGF0IGl0IGhhcyByaWdodCBub3dcbmNvbnN0IHBsYXllciA9IChuYW1lLCBnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkO1xuICBjb25zdCBzaG90cyA9IFtdO1xuXG4gIGNvbnN0IGdldFBsYXllck5hbWUgPSAoKSA9PiBwbGF5ZXJOYW1lO1xuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuICBjb25zdCBnZXRTaG90cyA9ICgpID0+IHNob3RzO1xuXG4gIGNvbnN0IGhhc1Nob3RCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIHNob3RzLmZvckVhY2goKHNob3QpID0+IHtcbiAgICAgIGlmIChzaG90WzBdID09PSByb3cgJiYgc2hvdFsxXSA9PT0gY29sdW1uKSB7XG4gICAgICAgIGZsYWcgPSAgdHJ1ZTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG4gIFxuICBjb25zdCBjaG9vc2VSYW5kb21TaG90ID0gKCkgPT4ge1xuICAgIGxldCByZXR1cm5WYWx1ZSA9IG51bGw7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBcbiAgICBpZiAoIWhhc1Nob3RCZWZvcmUocm93LCBjb2x1bW4pKSB7XG4gICAgICBzaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgcmV0dXJuVmFsdWUgPSB7IHJvdywgY29sdW1uIH07XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfTtcblxuICByZXR1cm4geyBnZXRQbGF5ZXJOYW1lLCBnZXRCb2FyZCwgZ2V0U2hvdHMsIGNob29zZVJhbmRvbVNob3QsIH07XG59O1xuXG4vLyBtaWdodCBuZWVkIGEgcGxhY2VBbGxzaGlwcyBhdCByYW5kb20gcGxhY2VzIGZ1bmN0aW9uLCBvciBzaG91bGQgdGhpcyBiZSBpbiBnYW1lYm9hcmQ/XG4vLyBjb25zdCBjb21wdXRlciA9ICgpID0+IHtcbi8vICAgY29uc3Qgc2hvdHMgPSBbXTtcbiAgXG4vLyAgIGNvbnN0IGdldFNob3RzID0gKCkgPT4gc2hvdHM7XG5cbi8vICAgY29uc3QgaGFzU2hvdEJlZm9yZSA9IChyb3csIGNvbHVtbikgPT4ge1xuLy8gICAgIGxldCBmbGFnID0gZmFsc2U7XG4vLyAgICAgc2hvdHMuZm9yRWFjaCgoc2hvdCkgPT4ge1xuLy8gICAgICAgaWYgKHNob3RbMF0gPT09IHJvdyAmJiBzaG90WzFdID09PSBjb2x1bW4pIHtcbi8vICAgICAgICAgZmxhZyA9ICB0cnVlO1xuLy8gICAgICAgfTtcbi8vICAgICB9KTtcbi8vICAgICByZXR1cm4gZmxhZztcbi8vICAgfTtcbiAgXG4vLyAgIGNvbnN0IGNob29zZVJhbmRvbVNob3QgPSAoKSA9PiB7XG4vLyAgICAgbGV0IHJldHVyblZhbHVlID0gbnVsbDtcbi8vICAgICBjb25zdCByb3cgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4vLyAgICAgY29uc3QgY29sdW1uID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIFxuLy8gICAgIGlmICghaGFzU2hvdEJlZm9yZShyb3csIGNvbHVtbikpIHtcbi8vICAgICAgIHNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4vLyAgICAgICByZXR1cm5WYWx1ZSA9IHsgcm93LCBjb2x1bW4gfTtcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuLy8gICB9O1xuXG4vLyAgIHJldHVybiB7IGdldFNob3RzLCBjaG9vc2VSYW5kb21TaG90LCB9O1xuLy8gfTtcblxuXG4vLyBjb25zb2xlLmxvZyhjLmNob29zZVJhbmRvbVNob3QoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGMuZ2V0U2hvdHMoKSk7XG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgY29uc3QgbGVuZ3RoT2ZTaGlwID0gbGVuZ3RoO1xuICBsZXQgbnVtT2ZIaXRzID0gMDtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGhPZlNoaXA7XG4gIC8vIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gIGNvbnN0IGdldE51bU9mSGl0cyA9ICgpID0+IG51bU9mSGl0cztcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgbnVtT2ZIaXRzKys7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gKGxlbmd0aE9mU2hpcCAtIG51bU9mSGl0cykgPT09IDA7XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmssIGdldExlbmd0aCwgZ2V0TnVtT2ZIaXRzIH07XG59XG4iLCIvLyBuZWVkIGEgZnVuY3Rpb24gdGhhdCBnZXRzIGEgZ2FtZWJvYXJkIGFuZCBkaXNwbGF5cyB3aGVyZSB0aGUgc2hpcHMgYXJlIGFuZCB3aGVyZSBpdCBoYXMgYmVlbiBoaXRcblxuY29uc3QgZGlzcGxheVBsYXllckdhbWVib2FyZCA9IChnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGVmdFwiKTtcbiAgLy8gY2xlYXJzIGl0IGZpcnN0IHRoZW4gYWRkcyB0aGUgZ2FtZWJvYXJkIHRvIHByZXZlbnQgZHVwbGljYXRpb25cbiAgbGVmdC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByb3dOdW0gPSBpO1xuICAgIGxldCBjb2x1bW5OdW0gPSAwO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb2x1bW5OdW0gPSBqO1xuICAgICAgLy8gY2hlY2sgaWYgZWFjaCBnYW1lYm9hcmRbaV1bal0gY2VsbCBoYXMgYSBzaGlwLCBoYXMgYSBtaXNzZWQgYXR0YWNrLCBvciBoYXMgaGl0IGEgc2hpcFxuICAgICAgLy8gaWYgc28gaSBjb3VsZCBhZGQgZGlmZmVyZW50IGNsYXNzZXMgdG8gZGlmZmVyZW50aWF0ZSB0aGUgY2VsbCBmcm9tIGRpZmZlcmVudCBjZWxsc1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsLmRhdGFzZXQucm93ID0gcm93TnVtO1xuICAgICAgY2VsbC5kYXRhc2V0LmNvbHVtbiA9IGNvbHVtbk51bTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICAgIGxlZnQuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxufTtcblxuLy8gaSBzaG91bGQgaGF2ZSBhIGZ1bmN0aW9uIHRoYXQgYWRkcyBhbiBldmVudExpc3RlbmVyIHRvIGVhY2ggY2VsbFxuLy8gSSBuZWVkIHRvIHV0aWxpemUgc2hpcENvb3JkaW5hdGVzIGFuZCBtaXNzZWRBdHRhY2tzLCBcbi8vIGlmIHBsYXllciBjbGlja2VkIG9uIGEgY2VsbCB0aGF0IGhhcyB0aGUgc2FtZSByb3cgYW5kIGNvbHVtbiBhcyBhIHNoaXAsIGFkZCBhIHNoaXAtaGl0IHN0eWxlIG9yIHNvbWV0aGluZ1xuLy8gaWYgcGxheWVyIGNsaWNrZWQgb24gYSBjZWxsIHRoYXQgaGFzIG5vIHNoaXBzLCBhZGQgYSBzdHlsZSBjYWxsZWQgbm9IaXQgb3Igc29tZXRoaW5nXG4vLyBiYyB3aGF0cyB0aGUgcG9pbnQgb2YgbWlzc2VkU2hvdHMgYXJyYXkgb3Igc2hpcCBjb29yZGluYXRlcyBpZiBpIGp1c3QgdXNlIFwib1wicyBhbmQgXCJ4XCJzIHRvIGlkZW50aWZ5IHRoZW1cbi8vIGkgc2hvdWxkIGFsc28gaGF2ZSBhIGZ1bmN0aW9uIHRoYXQgcmVtb3ZlcyB0aGF0IGV2ZW50TGlzdGVuZXIgXG4vLyBzbyB0aGF0IHdoZW4gaXQncyBub3QgdGhhdCBwbGF5ZXIncyB0dXJuLCB0aGVuIHRoZXkgd29uJ3QgYmUgYWJsZSB0byBtYWtlIGEgc2hvdFxuXG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQ7XG4vLyBleHBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vbW9kdWxlcy91aVwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vbW9kdWxlcy9nYW1lXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIEdhbWUuY3JlYXRlTmV3R2FtZSgpO1xuICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKEdhbWUuZ2V0UGxheWVyMSgpLmdldEJvYXJkKCkpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=