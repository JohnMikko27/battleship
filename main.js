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
    player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)("John", gameboard1);
    player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)("Michael", gameboard2);
  };

  

  // use git commit amend on the next one to change one of the commits

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
  // also for rn, ships are only placed horizontally
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
/* harmony export */   computer: () => (/* binding */ computer),
/* harmony export */   player: () => (/* binding */ player)
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
  
  const getPlayerName = () => playerName;
  const getBoard = () => board;

  return { getPlayerName, getBoard};
};

// might need a placeAllships at random places function, or should this be in gameboard?
const computer = () => {
  const shots = [];
  
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

  return { getShots, chooseRandomShot, };
};


// console.log(c.chooseRandomShot());

// console.log(c.getShots());


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
    row.classList.add("row");
    for (let j = 0; j < gameboard.getGameboard()[i].length; j++) {
      // check if each gameboard[i][j] cell has a ship, has a missed attack, or has hit a ship
      // if so i could add different classes to differentiate the cell from different cells
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    left.appendChild(row);
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
  _modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].createNewGame();
  (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__["default"])(_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"].getPlayer1().getBoard());
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFxuICogQXQgdGhpcyBwb2ludCBpdCBpcyBhcHByb3ByaWF0ZSB0byBiZWdpbiBjcmFmdGluZyB5b3VyIFVzZXIgSW50ZXJmYWNlLlxuICogVGhlIGdhbWUgbG9vcCBzaG91bGQgc2V0IHVwIGEgbmV3IGdhbWUgYnkgY3JlYXRpbmcgUGxheWVycyBhbmQgR2FtZWJvYXJkcy4gXG4gKiBGb3Igbm93IGp1c3QgcG9wdWxhdGUgZWFjaCBHYW1lYm9hcmQgd2l0aCBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzLiBcbiAqIFlvdSBhcmUgZ29pbmcgdG8gaW1wbGVtZW50IGEgc3lzdGVtIGZvciBhbGxvd2luZyBwbGF5ZXJzIHRvIHBsYWNlIHRoZWlyIHNoaXBzIGxhdGVyLlxuICogV2XigJlsbCBsZWF2ZSB0aGUgSFRNTCBpbXBsZW1lbnRhdGlvbiB1cCB0byB5b3UgZm9yIG5vdywgXG4gKiBidXQgeW91IHNob3VsZCBkaXNwbGF5IGJvdGggdGhlIHBsYXllcuKAmXMgYm9hcmRzIGFuZCByZW5kZXIgdGhlbSB1c2luZyBpbmZvcm1hdGlvbiBcbiAqIGZyb20gdGhlIEdhbWVib2FyZCBjbGFzcy9mYWN0b3J5LlxuICogWW91IG5lZWQgbWV0aG9kcyB0byByZW5kZXIgdGhlIGdhbWVib2FyZHMgYW5kIHRvIHRha2UgdXNlciBpbnB1dCBmb3IgYXR0YWNraW5nLlxuICogRm9yIGF0dGFja3MsIGxldCB0aGUgdXNlciBjbGljayBvbiBhIGNvb3JkaW5hdGUgaW4gdGhlIGVuZW15IEdhbWVib2FyZC5cbiAqIFRoZSBnYW1lIGxvb3Agc2hvdWxkIHN0ZXAgdGhyb3VnaCB0aGUgZ2FtZSB0dXJuIGJ5IHR1cm4gdXNpbmcgb25seSBtZXRob2RzIGZyb20gb3RoZXIgb2JqZWN0cy4gXG4gKiBJZiBhdCBhbnkgcG9pbnQgeW91IGFyZSB0ZW1wdGVkIHRvIHdyaXRlIGEgbmV3IGZ1bmN0aW9uIGluc2lkZSB0aGUgZ2FtZSBsb29wLCBzdGVwIGJhY2sgYW5kIGZpZ3VyZSBvdXQgd2hpY2ggY2xhc3Mgb3IgbW9kdWxlIHRoYXQgZnVuY3Rpb24gc2hvdWxkIGJlbG9uZyB0by5cbiAqIENyZWF0ZSBjb25kaXRpb25zIHNvIHRoYXQgdGhlIGdhbWUgZW5kcyBvbmNlIG9uZSBwbGF5ZXLigJlzIHNoaXBzIGhhdmUgYWxsIGJlZW4gc3Vuay4gXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGFwcHJvcHJpYXRlIGZvciB0aGUgR2FtZSBtb2R1bGUuXG4gKiBcbiAqL1xuXG4vLyBjcmVhdGUgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzIChhbmQgcHJvYmFibHkgc2hpcHMgYWxzbywganVzdCBmb3Igbm93LCB3aGlsZSB0ZXN0aW5nKVxuLy8gYWRkIHRoZSBzaGlwcyB0byB0aGUgZ2FtZWJvYXJkcyBpbiBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzXG4vLyBkaXNwbGF5IGJvdGggcGxheWVyJ3MgYm9hcmRzIGFuZCByZW5kZXIgdGhlbSB1c2luZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBnYW1lYm9hcmQgZmFjdG9yeVxuXG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjE7XG4gIGxldCBwbGF5ZXIyO1xuICBsZXQgZ2FtZWJvYXJkMTtcbiAgbGV0IGdhbWVib2FyZDI7XG5cbiAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+IHBsYXllcjE7XG4gIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PiBwbGF5ZXIyO1xuICAvLyB3aWxsIHByb2JhYmx5IGhhdmUgdG8gYWRkIG5hbWUgcGFyYW1ldGVycyBsYXRlciBzbyB0aGF0IHBsYXllcnMgY2FuIHNldCB0aGVpciBuYW1lc1xuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIkpvaG5cIiwgZ2FtZWJvYXJkMSk7XG4gICAgcGxheWVyMiA9IHBsYXllcihcIk1pY2hhZWxcIiwgZ2FtZWJvYXJkMik7XG4gIH07XG5cbiAgXG5cbiAgLy8gdXNlIGdpdCBjb21taXQgYW1lbmQgb24gdGhlIG5leHQgb25lIHRvIGNoYW5nZSBvbmUgb2YgdGhlIGNvbW1pdHNcblxuICByZXR1cm4geyBjcmVhdGVOZXdHYW1lLCBnZXRQbGF5ZXIxLCBnZXRQbGF5ZXIyIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgY29uc3QgZ2FtZWJvYXJkID0gW107XG4gIGNvbnN0IHNoaXBzQ29vcmRpbmF0ZXMgPSBbXTtcbiAgY29uc3QgbWlzc2VkQXR0YWNrcyA9IFtdO1xuXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+IGdhbWVib2FyZDtcblxuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4gbWlzc2VkQXR0YWNrcztcblxuICBjb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICByb3cucHVzaChcIi1cIik7XG4gICAgICB9XG4gICAgICBnYW1lYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgfTtcbiAgY3JlYXRlR2FtZWJvYXJkKCk7XG5cbiAgLy8gbmVlZCB0byBhZGQgY29uZGl0aW9uYWxzIHRvIGNoZWNrIGlmIHNoaXBzIGdvIG91dCBvZiBwYWdlXG4gIC8vIGFsc28gZm9yIHJuLCBzaGlwcyBhcmUgb25seSBwbGFjZWQgaG9yaXpvbnRhbGx5XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChyb3csIGNvbHVtbiwgc2hpcCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW4raV0gPSBcIm9cIjtcbiAgICB9XG4gICBcbiAgICBzaGlwc0Nvb3JkaW5hdGVzLnB1c2goe3JvdywgY29sdW1uLCBzaGlwfSk7IFxuICB9O1xuXG4gIC8vIGZvciB2aXN1YWxpemF0aW9uIHB1cnBvc2VzXG4gIGNvbnN0IHByaW50R2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGxldCByZXN1bHQgPSBcIlwiO1xuICAgIGdhbWVib2FyZC5mb3JFYWNoKChyb3cpID0+IHtcbiAgICAgIHJvdy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIHJlc3VsdCArPSBlbGVtZW50O1xuICAgICAgfSk7XG4gICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgcmVzdWx0ID0gXCJcIjtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgaWYgKGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPT09IFwib1wiKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgb2JqID0gc2hpcHNDb29yZGluYXRlc1tpXTtcbiAgICAgICAgaWYgKHJvdyA9PT0gb2JqLnJvdyAmJiAoY29sdW1uID49IG9iai5jb2x1bW4gJiYgY29sdW1uIDwgb2JqLmNvbHVtbiArIG9iai5zaGlwLmdldExlbmd0aCgpKSkge1xuICAgICAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcInhcIjtcbiAgICAgICAgICBvYmouc2hpcC5oaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBtaXNzZWRBdHRhY2tzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gIH07XG5cbiAgY29uc3QgYXJlQWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIC8vIHNlZSBpZiB5b3UgY2FuIGNoYW5nZSB0aGlzIHRvIGEgcmVkdWNlIGZ1bmN0aW9uXG4gICAgc2hpcHNTdW5rID0gc2hpcHNDb29yZGluYXRlcy5yZWR1Y2UoIChhY2MsIGN1cikgPT4ge1xuICAgICAgaWYgKGN1ci5zaGlwLmlzU3VuaygpKSByZXR1cm4gYWNjICsgMTtcbiAgICAgIHJldHVybiBhY2MgKyAwO1xuICAgIH0sIDApO1xuICAgIFxuICAgIFxuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgIC8vICAgaWYgKHNoaXBzQ29vcmRpbmF0ZXNbaV0uc2hpcC5pc1N1bmsoKSkge1xuICAgIC8vICAgICBzaGlwc1N1bmsrKztcbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gICAgY29uc29sZS5sb2coc2hpcHNTdW5rKTtcbiAgICByZXR1cm4gc2hpcHNTdW5rID09PSBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDtcbiAgfTtcblxuICAvLyBJIHRoaW5rIEkgaGF2ZSB0byB0ZXN0IHBsYWNlc2hpcCwgcmVjZWl2ZUF0dGFjaywgYW5kIGFyZUFsbFNoaXBzIHN1bmsgXG4gIC8vIGF0IGxlYXN0IHdoaWNoZXZlciBmdW5jdGlvbnMgd2lsbCB1bHRpbWF0ZWx5IGJlIHVzZWQgd2l0aCBvdGhlciBmdW50aW9ucyBsaWtlIHNoaXAgZnVuY3Rpb25cbiAgcmV0dXJuIHsgY3JlYXRlR2FtZWJvYXJkLCBnZXRHYW1lYm9hcmQsIHBsYWNlU2hpcCwgcHJpbnRHYW1lYm9hcmQsIHJlY2VpdmVBdHRhY2ssIGdldE1pc3NlZEF0dGFja3MsIGFyZUFsbFNoaXBzU3VuayB9O1xufVxuXG4vLyBpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG4vLyBjb25zdCBnID0gR2FtZWJvYXJkKCk7XG4vLyBjb25zdCBzaGlwMSA9IFNoaXAoMyk7XG4vLyBjb25zdCBzaGlwMiA9IFNoaXAoMyk7XG5cbi8vIGcucGxhY2VTaGlwKDMsIDMsIHNoaXAxKTtcbi8vIGcucGxhY2VTaGlwKDQsIDMsIHNoaXAyKTtcblxuLy8gZy5wcmludEdhbWVib2FyZCgpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDMsNCk7XG4vLyBnLnJlY2VpdmVBdHRhY2soMywzKTtcbi8vIGcucmVjZWl2ZUF0dGFjaygzLDUpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDMsNik7XG4vLyBnLnJlY2VpdmVBdHRhY2soNiw5KTtcblxuLy8gZy5yZWNlaXZlQXR0YWNrKDQsMyk7XG4vLyBnLnJlY2VpdmVBdHRhY2soNCw0KTtcbi8vIGcucmVjZWl2ZUF0dGFjayg0LDUpO1xuXG5cbi8vIGcucHJpbnRHYW1lYm9hcmQoKTtcbi8vIGNvbnNvbGUubG9nKHNoaXAxLmlzU3VuaygpKTtcbi8vIGNvbnNvbGUubG9nKHNoaXAyLmlzU3VuaygpKTtcblxuLy8gY29uc29sZS5sb2coZy5nZXRNaXNzZWRBdHRhY2tzKCkpO1xuLy8gY29uc29sZS5sb2coZy5hcmVBbGxTaGlwc1N1bmsoKSk7XG4iLCIvKlxuICpcbiAqIFBsYXllcnMgY2FuIHRha2UgdHVybnMgcGxheWluZyB0aGUgZ2FtZSBieSBhdHRhY2tpbmcgdGhlIGVuZW15IEdhbWVib2FyZC5cbiAqIFRoZSBnYW1lIGlzIHBsYXllZCBhZ2FpbnN0IHRoZSBjb21wdXRlciwgc28gbWFrZSB0aGUg4oCYY29tcHV0ZXLigJkgY2FwYWJsZSBvZiBtYWtpbmcgcmFuZG9tIHBsYXlzLiBcbiAqIFRoZSBBSSBkb2VzIG5vdCBoYXZlIHRvIGJlIHNtYXJ0LCBidXQgaXQgc2hvdWxkIGtub3cgd2hldGhlciBvciBub3QgYSBnaXZlbiBtb3ZlIGlzIGxlZ2FsXG4gKiAgKGkuZS4gaXQgc2hvdWxkbuKAmXQgc2hvb3QgdGhlIHNhbWUgY29vcmRpbmF0ZSB0d2ljZSkuXG4gKiAgIFxuICovXG5cbi8vIHNob3VsZCBpIHJlZmFjdG9yIGNvbXB1dGVyPyBib3RoIGNvbXB1dGVycyBhbmQgcGxheWVycyB3aWxsIGp1c3QgYmUgY3JlYXRlZCBmcm9tIGEgcGxheWVyIGZhY3Rvcnlcbi8vIGFuZCB0aGF0IHBsYXllciBmYWN0b3J5IHdpbGwgaGF2ZSBhbGwgdGhlIG1ldGhvZHMgdGhhdCBpdCBoYXMgcmlnaHQgbm93XG5jb25zdCBwbGF5ZXIgPSAobmFtZSwgZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IHBsYXllck5hbWUgPSBuYW1lO1xuICBjb25zdCBib2FyZCA9IGdhbWVib2FyZDtcbiAgXG4gIGNvbnN0IGdldFBsYXllck5hbWUgPSAoKSA9PiBwbGF5ZXJOYW1lO1xuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuXG4gIHJldHVybiB7IGdldFBsYXllck5hbWUsIGdldEJvYXJkfTtcbn07XG5cbi8vIG1pZ2h0IG5lZWQgYSBwbGFjZUFsbHNoaXBzIGF0IHJhbmRvbSBwbGFjZXMgZnVuY3Rpb24sIG9yIHNob3VsZCB0aGlzIGJlIGluIGdhbWVib2FyZD9cbmNvbnN0IGNvbXB1dGVyID0gKCkgPT4ge1xuICBjb25zdCBzaG90cyA9IFtdO1xuICBcbiAgY29uc3QgZ2V0U2hvdHMgPSAoKSA9PiBzaG90cztcblxuICBjb25zdCBoYXNTaG90QmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBzaG90cy5mb3JFYWNoKChzaG90KSA9PiB7XG4gICAgICBpZiAoc2hvdFswXSA9PT0gcm93ICYmIHNob3RbMV0gPT09IGNvbHVtbikge1xuICAgICAgICBmbGFnID0gIHRydWU7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBmbGFnO1xuICB9O1xuICBcbiAgY29uc3QgY2hvb3NlUmFuZG9tU2hvdCA9ICgpID0+IHtcbiAgICBsZXQgcmV0dXJuVmFsdWUgPSBudWxsO1xuICAgIGNvbnN0IHJvdyA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBjb2x1bW4gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgXG4gICAgaWYgKCFoYXNTaG90QmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgc2hvdHMucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIHJldHVyblZhbHVlID0geyByb3csIGNvbHVtbiB9O1xuICAgIH1cbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0U2hvdHMsIGNob29zZVJhbmRvbVNob3QsIH07XG59O1xuXG5cbi8vIGNvbnNvbGUubG9nKGMuY2hvb3NlUmFuZG9tU2hvdCgpKTtcblxuLy8gY29uc29sZS5sb2coYy5nZXRTaG90cygpKTtcbmV4cG9ydCB7cGxheWVyLCBjb21wdXRlcn07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcbiAgY29uc3QgbGVuZ3RoT2ZTaGlwID0gbGVuZ3RoO1xuICBsZXQgbnVtT2ZIaXRzID0gMDtcblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiBsZW5ndGhPZlNoaXA7XG4gIC8vIGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gIGNvbnN0IGdldE51bU9mSGl0cyA9ICgpID0+IG51bU9mSGl0cztcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgbnVtT2ZIaXRzKys7XG4gIH07XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4gKGxlbmd0aE9mU2hpcCAtIG51bU9mSGl0cykgPT09IDA7XG5cbiAgcmV0dXJuIHsgaGl0LCBpc1N1bmssIGdldExlbmd0aCwgZ2V0TnVtT2ZIaXRzIH07XG59XG4iLCIvLyBuZWVkIGEgZnVuY3Rpb24gdGhhdCBnZXRzIGEgZ2FtZWJvYXJkIGFuZCBkaXNwbGF5cyB3aGVyZSB0aGUgc2hpcHMgYXJlIGFuZCB3aGVyZSBpdCBoYXMgYmVlbiBoaXRcblxuY29uc3QgZGlzcGxheVBsYXllckdhbWVib2FyZCA9IChnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGVmdFwiKTtcbiAgLy8gY2xlYXJzIGl0IGZpcnN0IHRoZW4gYWRkcyB0aGUgZ2FtZWJvYXJkIHRvIHByZXZlbnQgZHVwbGljYXRpb25cbiAgbGVmdC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgLy8gY2hlY2sgaWYgZWFjaCBnYW1lYm9hcmRbaV1bal0gY2VsbCBoYXMgYSBzaGlwLCBoYXMgYSBtaXNzZWQgYXR0YWNrLCBvciBoYXMgaGl0IGEgc2hpcFxuICAgICAgLy8gaWYgc28gaSBjb3VsZCBhZGQgZGlmZmVyZW50IGNsYXNzZXMgdG8gZGlmZmVyZW50aWF0ZSB0aGUgY2VsbCBmcm9tIGRpZmZlcmVudCBjZWxsc1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgICBsZWZ0LmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheVBsYXllckdhbWVib2FyZDtcbi8vIGV4cG9ydCB7IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQsIH07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgZGlzcGxheVBsYXllckdhbWVib2FyZCBmcm9tIFwiLi9tb2R1bGVzL3VpXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgR2FtZS5jcmVhdGVOZXdHYW1lKCk7XG4gIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQoR2FtZS5nZXRQbGF5ZXIxKCkuZ2V0Qm9hcmQoKSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==