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
  const playGame = () => {
    // add an eventListener for each cell in the opposing (not active player) board
    if (activePlayer === player1) {
      const cells = document.querySelectorAll("#right .cell");
      cells.forEach(cell => cell.addEventListener("click", (e) => {
        console.log(e.target.dataset.row, e.target.dataset.column);
        opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));
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
        opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));
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
  (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"])(_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer1(), _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer1().getBoard());
  (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"])(_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer2(), _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer2().getBoard());
  _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].playGame();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTs7QUFFQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUNBQXFDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3Q0FBd0M7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLGlFQUFlLHNCQUFzQixFQUFDO0FBQ3RDLFlBQVk7Ozs7OztVQy9DWjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNoQjs7QUFFbEM7QUFDQSxFQUFFLHVEQUFzQixDQUFDLHFEQUFJLGVBQWUscURBQUk7QUFDaEQsRUFBRSx1REFBc0IsQ0FBQyxxREFBSSxlQUFlLHFEQUFJO0FBQ2hELEVBQUUscURBQUk7QUFDTixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy91aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogXG4gKiBBdCB0aGlzIHBvaW50IGl0IGlzIGFwcHJvcHJpYXRlIHRvIGJlZ2luIGNyYWZ0aW5nIHlvdXIgVXNlciBJbnRlcmZhY2UuXG4gKiBUaGUgZ2FtZSBsb29wIHNob3VsZCBzZXQgdXAgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBQbGF5ZXJzIGFuZCBHYW1lYm9hcmRzLiBcbiAqIEZvciBub3cganVzdCBwb3B1bGF0ZSBlYWNoIEdhbWVib2FyZCB3aXRoIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXMuIFxuICogWW91IGFyZSBnb2luZyB0byBpbXBsZW1lbnQgYSBzeXN0ZW0gZm9yIGFsbG93aW5nIHBsYXllcnMgdG8gcGxhY2UgdGhlaXIgc2hpcHMgbGF0ZXIuXG4gKiBXZeKAmWxsIGxlYXZlIHRoZSBIVE1MIGltcGxlbWVudGF0aW9uIHVwIHRvIHlvdSBmb3Igbm93LCBcbiAqIGJ1dCB5b3Ugc2hvdWxkIGRpc3BsYXkgYm90aCB0aGUgcGxheWVy4oCZcyBib2FyZHMgYW5kIHJlbmRlciB0aGVtIHVzaW5nIGluZm9ybWF0aW9uIFxuICogZnJvbSB0aGUgR2FtZWJvYXJkIGNsYXNzL2ZhY3RvcnkuXG4gKiBZb3UgbmVlZCBtZXRob2RzIHRvIHJlbmRlciB0aGUgZ2FtZWJvYXJkcyBhbmQgdG8gdGFrZSB1c2VyIGlucHV0IGZvciBhdHRhY2tpbmcuXG4gKiBGb3IgYXR0YWNrcywgbGV0IHRoZSB1c2VyIGNsaWNrIG9uIGEgY29vcmRpbmF0ZSBpbiB0aGUgZW5lbXkgR2FtZWJvYXJkLlxuICogVGhlIGdhbWUgbG9vcCBzaG91bGQgc3RlcCB0aHJvdWdoIHRoZSBnYW1lIHR1cm4gYnkgdHVybiB1c2luZyBvbmx5IG1ldGhvZHMgZnJvbSBvdGhlciBvYmplY3RzLiBcbiAqIElmIGF0IGFueSBwb2ludCB5b3UgYXJlIHRlbXB0ZWQgdG8gd3JpdGUgYSBuZXcgZnVuY3Rpb24gaW5zaWRlIHRoZSBnYW1lIGxvb3AsIHN0ZXAgYmFjayBhbmQgZmlndXJlIG91dCB3aGljaCBjbGFzcyBvciBtb2R1bGUgdGhhdCBmdW5jdGlvbiBzaG91bGQgYmVsb25nIHRvLlxuICogQ3JlYXRlIGNvbmRpdGlvbnMgc28gdGhhdCB0aGUgZ2FtZSBlbmRzIG9uY2Ugb25lIHBsYXllcuKAmXMgc2hpcHMgaGF2ZSBhbGwgYmVlbiBzdW5rLiBcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYXBwcm9wcmlhdGUgZm9yIHRoZSBHYW1lIG1vZHVsZS5cbiAqIFxuICovXG5cbi8vIGNyZWF0ZSBhIG5ldyBnYW1lIGJ5IGNyZWF0aW5nIHBsYXllcnMgYW5kIGdhbWVib2FyZHMgKGFuZCBwcm9iYWJseSBzaGlwcyBhbHNvLCBqdXN0IGZvciBub3csIHdoaWxlIHRlc3RpbmcpXG4vLyBhZGQgdGhlIHNoaXBzIHRvIHRoZSBnYW1lYm9hcmRzIGluIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXNcbi8vIGRpc3BsYXkgYm90aCBwbGF5ZXIncyBib2FyZHMgYW5kIHJlbmRlciB0aGVtIHVzaW5nIGluZm9ybWF0aW9uIGZyb20gdGhlIGdhbWVib2FyZCBmYWN0b3J5XG5cbmltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vdWlcIjtcblxuY29uc3QgR2FtZSA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXIxO1xuICBsZXQgcGxheWVyMjtcbiAgbGV0IGdhbWVib2FyZDE7XG4gIGxldCBnYW1lYm9hcmQyO1xuICBsZXQgYWN0aXZlUGxheWVyO1xuICBsZXQgb3Bwb3NpbmdQbGF5ZXI7XG5cbiAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+IHBsYXllcjE7XG4gIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PiBwbGF5ZXIyO1xuICAvLyB3aWxsIHByb2JhYmx5IGhhdmUgdG8gYWRkIG5hbWUgcGFyYW1ldGVycyBsYXRlciBzbyB0aGF0IHBsYXllcnMgY2FuIHNldCB0aGVpciBuYW1lc1xuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIkpvaG5cIiwgZ2FtZWJvYXJkMSk7XG4gICAgcGxheWVyMiA9IHBsYXllcihcImFpXCIsIGdhbWVib2FyZDIpO1xuICAgIC8vIHBsYXllcjIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKDAsOSk7XG4gICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gICAgLy8gbWlnaHQgbmVlZCB0byBkaXNwbGF5IHRoZSBib2FyZHMgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgc29tZXdoZXJlIGVsc2VcbiAgfTtcbiAgXG4gIGNvbnN0IHN3aXRjaEFjdGl2ZVBsYXllciA9ICgpID0+IHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgIH1cbiAgfTtcbiAgY3JlYXRlTmV3R2FtZSgpO1xuICBjb25zdCBzaGlwMSA9IFNoaXAoMyk7XG4gIGNvbnN0IHNoaXAyID0gU2hpcCgzKTtcbiAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoMCwgMCwgc2hpcDEpO1xuICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgxLCAwLCBzaGlwMik7XG5cblxuICBjb25zdCBzaGlwMyA9IFNoaXAoMyk7XG4gIGNvbnN0IHNoaXA0ID0gU2hpcCgzKTtcbiAgZ2FtZWJvYXJkMi5wbGFjZVNoaXAoMCwgMCwgc2hpcDMpO1xuICBnYW1lYm9hcmQyLnBsYWNlU2hpcCgyLCAwLCBzaGlwNCk7XG5cbiAgLy8gbWF5YmUgaSBjYW4gcmVmYWN0b3IgdGhpcywgaSBjYW4gYWRkIGFuIGV2ZW50TGlzdGVuZXIgZm9yIGVhY2ggY2VsbCwgXG4gIC8vIGJ1dCBpdCB3aWxsIG9ubHkgcmVjZWl2ZSBhdHRhY2ssIGFuZCBkaXNwbGF5IHBsYXllciBnYW1lYm9hcmQgaWYgaXQncyB0aGF0IHBlcnNvbidzIHR1cm5cbiAgLy8gaW5zdGVhZCBvZiBhZGRpbmcgYW4gZXZlbnRMaXN0ZW5lciBhZ2FpblxuICAvLyBidXQgaSBtaWdodCBuZWVkIHRvIGtlZXAgaXQgbGlrZSB0aGlzIGJlY2F1c2UgZGlzcGxheSB0aGUgYm9hcmQgcmVtb3ZlcyB0aGUgZXZlbnRsaXN0ZW5lcnNcbiAgY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgLy8gYWRkIGFuIGV2ZW50TGlzdGVuZXIgZm9yIGVhY2ggY2VsbCBpbiB0aGUgb3Bwb3NpbmcgKG5vdCBhY3RpdmUgcGxheWVyKSBib2FyZFxuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNyaWdodCAuY2VsbFwiKTtcbiAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuICAgICAgICBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLnJlY2VpdmVBdHRhY2socGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKSwgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKSk7XG4gICAgICAgIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQob3Bwb3NpbmdQbGF5ZXIsIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkpO1xuICAgICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcbiAgICAgICAgcGxheUdhbWUoKTtcbiAgICAgICAgLy8gc28gbm93IEkgY2FuIHJlY2VpdmVBdHRhY2sgb24gdGhlIGJvYXJkIGFuZCBkaXNwbGF5IGl0IGNvcnJlY3RseSxcbiAgICAgICAgLy8gbm93LCBJIG5lZWQgdG8gcmVtb3ZlIHRoZSBldmVudExpc3RlbmVycyBhbmQgc3dpdGNoIHRoZSBhY3RpdmVwbGF5ZXJzXG4gICAgICAgIC8vIGFuZCB0aGVuIHJ1biBwbGF5R2FtZSgpXG4gICAgICB9KSk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjIpIHtcbiAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNsZWZ0IC5jZWxsXCIpO1xuICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG4gICAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKTtcbiAgICAgICAgZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG4gICAgICAgIHN3aXRjaEFjdGl2ZVBsYXllcigpO1xuICAgICAgICBwbGF5R2FtZSgpO1xuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVOZXdHYW1lLCBnZXRQbGF5ZXIxLCBnZXRQbGF5ZXIyLCBwbGF5R2FtZSB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiBnYW1lYm9hcmQ7XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goXCItXCIpO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZUdhbWVib2FyZCgpO1xuXG4gIC8vIG5lZWQgdG8gYWRkIGNvbmRpdGlvbmFscyB0byBjaGVjayBpZiBzaGlwcyBnbyBvdXQgb2YgcGFnZVxuICAvLyBhbHNvIGZvciBybiwgc2hpcHMgYXJlIG9ubHkgcGxhY2VkIGhvcml6b250YWxseSBhbmQgY2FuIG92ZXJsYXBcbiAgY29uc3QgcGxhY2VTaGlwID0gKHJvdywgY29sdW1uLCBzaGlwKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbitpXSA9IFwib1wiO1xuICAgIH1cbiAgIFxuICAgIHNoaXBzQ29vcmRpbmF0ZXMucHVzaCh7cm93LCBjb2x1bW4sIHNoaXB9KTsgXG4gIH07XG5cbiAgLy8gZm9yIHZpc3VhbGl6YXRpb24gcHVycG9zZXNcbiAgY29uc3QgcHJpbnRHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgZ2FtZWJvYXJkLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgcm93LmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgcmVzdWx0ICs9IGVsZW1lbnQ7XG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAgICByZXN1bHQgPSBcIlwiO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBpZiAoZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJvXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBvYmogPSBzaGlwc0Nvb3JkaW5hdGVzW2ldO1xuICAgICAgICBpZiAocm93ID09PSBvYmoucm93ICYmIChjb2x1bW4gPj0gb2JqLmNvbHVtbiAmJiBjb2x1bW4gPCBvYmouY29sdW1uICsgb2JqLnNoaXAuZ2V0TGVuZ3RoKCkpKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9IFwieFwiO1xuICAgICAgICAgIG9iai5zaGlwLmhpdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZEF0dGFja3MucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcIm1cIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXJlQWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIC8vIHNlZSBpZiB5b3UgY2FuIGNoYW5nZSB0aGlzIHRvIGEgcmVkdWNlIGZ1bmN0aW9uXG4gICAgc2hpcHNTdW5rID0gc2hpcHNDb29yZGluYXRlcy5yZWR1Y2UoIChhY2MsIGN1cikgPT4ge1xuICAgICAgaWYgKGN1ci5zaGlwLmlzU3VuaygpKSByZXR1cm4gYWNjICsgMTtcbiAgICAgIHJldHVybiBhY2MgKyAwO1xuICAgIH0sIDApO1xuICAgIFxuICAgIFxuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgaWYgKHNoaXBzQ29vcmRpbmF0ZXNbaV0uc2hpcC5pc1N1bmsoKSkge1xuICAgIC8vICAgICBzaGlwc1N1bmsrKztcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgY29uc29sZS5sb2coc2hpcHNTdW5rKTtcbiAgICByZXR1cm4gc2hpcHNTdW5rID09PSBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDtcbiAgfTtcblxuICAvLyBJIHRoaW5rIEkgaGF2ZSB0byB0ZXN0IHBsYWNlc2hpcCwgcmVjZWl2ZUF0dGFjaywgYW5kIGFyZUFsbFNoaXBzIHN1bmsgXG4gIC8vIGF0IGxlYXN0IHdoaWNoZXZlciBmdW5jdGlvbnMgd2lsbCB1bHRpbWF0ZWx5IGJlIHVzZWQgd2l0aCBvdGhlciBmdW50aW9ucyBsaWtlIHNoaXAgZnVuY3Rpb25cbiAgcmV0dXJuIHsgY3JlYXRlR2FtZWJvYXJkLCBnZXRHYW1lYm9hcmQsIHBsYWNlU2hpcCwgcHJpbnRHYW1lYm9hcmQsIHJlY2VpdmVBdHRhY2ssIGdldE1pc3NlZEF0dGFja3MsIGFyZUFsbFNoaXBzU3VuayB9O1xufVxuXG4vLyBpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG4vLyBjb25zdCBnID0gR2FtZWJvYXJkKCk7XG4vLyBjb25zdCBzaGlwMSA9IFNoaXAoMyk7XG4vLyBjb25zdCBzaGlwMiA9IFNoaXAoMyk7XG5cbi8vIGcucGxhY2VTaGlwKDMsIDMsIHNoaXAxKTtcbi8vIGcucGxhY2VTaGlwKDQsIDMsIHNoaXAyKTtcblxuLy8gZy5wcmludEdhbWVib2FyZCgpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDMsNCk7XG4vLyBnLnJlY2VpdmVBdHRhY2soMywzKTtcbi8vIGcucmVjZWl2ZUF0dGFjaygzLDUpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDMsNik7XG4vLyBnLnJlY2VpdmVBdHRhY2soNiw5KTtcblxuLy8gZy5yZWNlaXZlQXR0YWNrKDQsMyk7XG4vLyBnLnJlY2VpdmVBdHRhY2soNCw0KTtcbi8vIGcucmVjZWl2ZUF0dGFjayg0LDUpO1xuXG5cbi8vIGcucHJpbnRHYW1lYm9hcmQoKTtcbi8vIGNvbnNvbGUubG9nKHNoaXAxLmlzU3VuaygpKTtcbi8vIGNvbnNvbGUubG9nKHNoaXAyLmlzU3VuaygpKTtcblxuLy8gY29uc29sZS5sb2coZy5nZXRNaXNzZWRBdHRhY2tzKCkpO1xuLy8gY29uc29sZS5sb2coZy5hcmVBbGxTaGlwc1N1bmsoKSk7XG4iLCIvKlxuICpcbiAqIFBsYXllcnMgY2FuIHRha2UgdHVybnMgcGxheWluZyB0aGUgZ2FtZSBieSBhdHRhY2tpbmcgdGhlIGVuZW15IEdhbWVib2FyZC5cbiAqIFRoZSBnYW1lIGlzIHBsYXllZCBhZ2FpbnN0IHRoZSBjb21wdXRlciwgc28gbWFrZSB0aGUg4oCYY29tcHV0ZXLigJkgY2FwYWJsZSBvZiBtYWtpbmcgcmFuZG9tIHBsYXlzLiBcbiAqIFRoZSBBSSBkb2VzIG5vdCBoYXZlIHRvIGJlIHNtYXJ0LCBidXQgaXQgc2hvdWxkIGtub3cgd2hldGhlciBvciBub3QgYSBnaXZlbiBtb3ZlIGlzIGxlZ2FsXG4gKiAgKGkuZS4gaXQgc2hvdWxkbuKAmXQgc2hvb3QgdGhlIHNhbWUgY29vcmRpbmF0ZSB0d2ljZSkuXG4gKiAgIFxuICovXG5cbi8vIHNob3VsZCBpIHJlZmFjdG9yIGNvbXB1dGVyPyBib3RoIGNvbXB1dGVycyBhbmQgcGxheWVycyB3aWxsIGp1c3QgYmUgY3JlYXRlZCBmcm9tIGEgcGxheWVyIGZhY3Rvcnlcbi8vIGFuZCB0aGF0IHBsYXllciBmYWN0b3J5IHdpbGwgaGF2ZSBhbGwgdGhlIG1ldGhvZHMgdGhhdCBpdCBoYXMgcmlnaHQgbm93XG5jb25zdCBwbGF5ZXIgPSAobmFtZSwgZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZDtcbiAgY29uc3Qgc2hvdHMgPSBbXTtcblxuICBjb25zdCBnZXRQbGF5ZXJOYW1lID0gKCkgPT4gcGxheWVyTmFtZTtcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcbiAgY29uc3QgZ2V0U2hvdHMgPSAoKSA9PiBzaG90cztcblxuICBjb25zdCBoYXNTaG90QmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBzaG90cy5mb3JFYWNoKChzaG90KSA9PiB7XG4gICAgICBpZiAoc2hvdFswXSA9PT0gcm93ICYmIHNob3RbMV0gPT09IGNvbHVtbikge1xuICAgICAgICBmbGFnID0gIHRydWU7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBmbGFnO1xuICB9O1xuICBcbiAgY29uc3QgY2hvb3NlUmFuZG9tU2hvdCA9ICgpID0+IHtcbiAgICBsZXQgcmV0dXJuVmFsdWUgPSBudWxsO1xuICAgIGNvbnN0IHJvdyA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgXG4gICAgaWYgKCFoYXNTaG90QmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgc2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHJldHVyblZhbHVlID0geyByb3csIGNvbHVtbiB9O1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0UGxheWVyTmFtZSwgZ2V0Qm9hcmQsIGdldFNob3RzLCBjaG9vc2VSYW5kb21TaG90LCB9O1xufTtcblxuLy8gbWlnaHQgbmVlZCBhIHBsYWNlQWxsc2hpcHMgYXQgcmFuZG9tIHBsYWNlcyBmdW5jdGlvbiwgb3Igc2hvdWxkIHRoaXMgYmUgaW4gZ2FtZWJvYXJkP1xuLy8gY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4vLyAgIGNvbnN0IHNob3RzID0gW107XG4gIFxuLy8gICBjb25zdCBnZXRTaG90cyA9ICgpID0+IHNob3RzO1xuXG4vLyAgIGNvbnN0IGhhc1Nob3RCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbi8vICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuLy8gICAgIHNob3RzLmZvckVhY2goKHNob3QpID0+IHtcbi8vICAgICAgIGlmIChzaG90WzBdID09PSByb3cgJiYgc2hvdFsxXSA9PT0gY29sdW1uKSB7XG4vLyAgICAgICAgIGZsYWcgPSAgdHJ1ZTtcbi8vICAgICAgIH07XG4vLyAgICAgfSk7XG4vLyAgICAgcmV0dXJuIGZsYWc7XG4vLyAgIH07XG4gIFxuLy8gICBjb25zdCBjaG9vc2VSYW5kb21TaG90ID0gKCkgPT4ge1xuLy8gICAgIGxldCByZXR1cm5WYWx1ZSA9IG51bGw7XG4vLyAgICAgY29uc3Qgcm93ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTApO1xuLy8gICAgIGNvbnN0IGNvbHVtbiA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBcbi8vICAgICBpZiAoIWhhc1Nob3RCZWZvcmUocm93LCBjb2x1bW4pKSB7XG4vLyAgICAgICBzaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuLy8gICAgICAgcmV0dXJuVmFsdWUgPSB7IHJvdywgY29sdW1uIH07XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbi8vICAgfTtcblxuLy8gICByZXR1cm4geyBnZXRTaG90cywgY2hvb3NlUmFuZG9tU2hvdCwgfTtcbi8vIH07XG5cblxuLy8gY29uc29sZS5sb2coYy5jaG9vc2VSYW5kb21TaG90KCkpO1xuXG4vLyBjb25zb2xlLmxvZyhjLmdldFNob3RzKCkpO1xuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG4gIGNvbnN0IGxlbmd0aE9mU2hpcCA9IGxlbmd0aDtcbiAgbGV0IG51bU9mSGl0cyA9IDA7XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoT2ZTaGlwO1xuICAvLyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICBjb25zdCBnZXROdW1PZkhpdHMgPSAoKSA9PiBudW1PZkhpdHM7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIG51bU9mSGl0cysrO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IChsZW5ndGhPZlNoaXAgLSBudW1PZkhpdHMpID09PSAwO1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rLCBnZXRMZW5ndGgsIGdldE51bU9mSGl0cyB9O1xufVxuIiwiLy8gIGlmIHBsYXllci5nZXROYW1lIGlzIGFpLCB0aGVuIHNldCBwYXJlbnQgY29udGFpbmVyIHRvIGJlIHJpZ2h0LCBpZiBub3QgdGhlbiBsZWZ0XG5jb25zdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkID0gKHBsYXllciwgZ2FtZWJvYXJkKSA9PiB7XG4gIGxldCBwYXJlbnRDb250YWluZXI7XG4gIGlmIChwbGF5ZXIuZ2V0UGxheWVyTmFtZSgpID09PSBcImFpXCIpIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmlnaHRcIik7XG4gIGVsc2UgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0XCIpO1xuIFxuICAvLyBjbGVhcnMgaXQgZmlyc3QgdGhlbiBhZGRzIHRoZSBnYW1lYm9hcmQgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBwYXJlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3Qgcm93TnVtID0gaTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY29sdW1uTnVtID0gajtcbiAgICAgIC8vIGNoZWNrIGlmIGVhY2ggZ2FtZWJvYXJkW2ldW2pdIGNlbGwgaGFzIGEgc2hpcCwgaGFzIGEgbWlzc2VkIGF0dGFjaywgb3IgaGFzIGhpdCBhIHNoaXBcbiAgICAgIC8vIGlmIHNvIGkgY291bGQgYWRkIGRpZmZlcmVudCBjbGFzc2VzIHRvIGRpZmZlcmVudGlhdGUgdGhlIGNlbGwgZnJvbSBkaWZmZXJlbnQgY2VsbHNcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcInhcIikgY2VsbC50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm9cIikgY2VsbC50ZXh0Q29udGVudCA9IFwib1wiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm1cIikgY2VsbC50ZXh0Q29udGVudCA9IFwibVwiO1xuICAgICAgICBcbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dOdW07XG4gICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uTnVtO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn07XG5cbi8vIGluc3RydWN0aW9ucyBkaWRuJ3QgYWN0dWxsYXkgc2F5IHRvIHVzZSBhbiBhcnJheSBmb3Iga2VlcGluZyB0cmFjayBvZiBtaXNzZWRTaHRvc1xuLy8gbWlnaHQgbmVlZCB0byByZWZhY3RvciBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjaywgbWF5ZWIgbWFrZSBpdCBzbyB0aGF0IGluaXRpYWxseSBldmVyeXRoaW5nIGlzIGp1c3QgYSBcIi1cIlxuLy8gd2hlbiBhIHNoaXAgaXMgcGxhY2VkIG9uIGEgY29vcmRpbmF0ZSBjaGFuZ2UgaXQgdG8gYSBcIm9cIiBhbmQgaWYgYSBzaGlwIGlzIGl0IGNoYW5nZSB0byBhIFwieFwiXG4vLyBhbmQgaWYgYSBjb29yZGluYXRlIHRoYXQgaXMgbm90IGEgc2hpcCBpcyBoaXQgY2hhbmdlIHRvIFwibVwiXG4vLyBzbyB0aGF0IHdoZW4gd2UgZGlzcGxheSB0aGUgYm9hcmQsIHdlIGNhbiBnZXQgZWFjaCBpbmRpdmlkdWFsIGVsZW1lbnQgb2YgdGhlIDJkIGJvYXJkLCBjaGVjayB0aGUgdmFsdWUsXG4vLyBhbmQgY2hhbmdlIGl0IGFjY29yZGluZ2x5XG5cbi8vIGkgc2hvdWxkIGhhdmUgYSBmdW5jdGlvbiB0aGF0IGFkZHMgYW4gZXZlbnRMaXN0ZW5lciB0byBlYWNoIGNlbGxcbi8vIEkgbmVlZCB0byB1dGlsaXplIHNoaXBDb29yZGluYXRlcyBhbmQgbWlzc2VkQXR0YWNrcywgXG4vLyBpZiBwbGF5ZXIgY2xpY2tlZCBvbiBhIGNlbGwgdGhhdCBoYXMgdGhlIHNhbWUgcm93IGFuZCBjb2x1bW4gYXMgYSBzaGlwLCBhZGQgYSBzaGlwLWhpdCBzdHlsZSBvciBzb21ldGhpbmdcbi8vIGlmIHBsYXllciBjbGlja2VkIG9uIGEgY2VsbCB0aGF0IGhhcyBubyBzaGlwcywgYWRkIGEgc3R5bGUgY2FsbGVkIG5vSGl0IG9yIHNvbWV0aGluZ1xuLy8gaSBzaG91bGQgYWxzbyBoYXZlIGEgZnVuY3Rpb24gdGhhdCByZW1vdmVzIHRoYXQgZXZlbnRMaXN0ZW5lciBcbi8vIHNvIHRoYXQgd2hlbiBpdCdzIG5vdCB0aGF0IHBsYXllcidzIHR1cm4sIHRoZW4gdGhleSB3b24ndCBiZSBhYmxlIHRvIG1ha2UgYSBzaG90XG5cblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheVBsYXllckdhbWVib2FyZDtcbi8vIGV4cG9ydCB7IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQsIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZGlzcGxheVBsYXllckdhbWVib2FyZCBmcm9tIFwiLi9tb2R1bGVzL3VpXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgZGlzcGxheVBsYXllckdhbWVib2FyZChHYW1lLmdldFBsYXllcjEoKSwgR2FtZS5nZXRQbGF5ZXIxKCkuZ2V0Qm9hcmQoKSk7XG4gIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQoR2FtZS5nZXRQbGF5ZXIyKCksIEdhbWUuZ2V0UGxheWVyMigpLmdldEJvYXJkKCkpO1xuICBHYW1lLnBsYXlHYW1lKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==