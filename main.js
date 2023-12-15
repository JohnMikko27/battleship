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


  gameboard2.placeAiShips();

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
    console.log(row, column, ship.getLength());
    shipsCoordinates.push({row, column, ship}); 
    console.log(shipsCoordinates);
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

  // place ai ships is overlapping
  // shihps are overlapping, gotta step through code
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
    // console.log(shipCoords);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDTTtBQUNWO0FBQ2dCOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQix5REFBUztBQUMxQixpQkFBaUIseURBQVM7QUFDMUIsY0FBYyxzREFBTTtBQUNwQixjQUFjLHNEQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLG9EQUFJO0FBQ3BCLGdCQUFnQixvREFBSTtBQUNwQjtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdURBQXVELCtCQUErQjtBQUN0RjtBQUNBOztBQUVBLFFBQVEsa0RBQXNCO0FBQzlCO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELCtCQUErQjtBQUN6RjtBQUNBO0FBQ0EsTUFBTSxrREFBc0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYLENBQUM7O0FBRUQsaUVBQWUsSUFBSSxFQUFDOztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRzZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0Esc0JBQXNCLFFBQVE7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZCQUE2QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsb0RBQUk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsMEJBQTBCLHNCQUFzQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1IseUJBQXlCLGtCQUFrQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQSxpRUFBZSxTQUFTOzs7Ozs7Ozs7Ozs7OztBQ3RIeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFdBQVc7QUFDWDs7O0FBR0EsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUN2Q3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLFdBQVc7QUFDWDs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7Ozs7Ozs7OztBQ2pCbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IscUNBQXFDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3Q0FBd0M7QUFDNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsc0JBQXNCLEVBQUM7QUFDdEMsWUFBWTs7Ozs7O1VDN0JaO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmtEO0FBQ2hCOztBQUVsQztBQUNBLEVBQUUsdURBQXNCLENBQUMscURBQUksZUFBZSxxREFBSTtBQUNoRCxFQUFFLHVEQUFzQixDQUFDLHFEQUFJLGVBQWUscURBQUk7QUFDaEQsRUFBRSxxREFBSTtBQUNOLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3VpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vdWkuanNcIjtcblxuY29uc3QgR2FtZSA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXIxO1xuICBsZXQgcGxheWVyMjtcbiAgbGV0IGdhbWVib2FyZDE7XG4gIGxldCBnYW1lYm9hcmQyO1xuICBsZXQgYWN0aXZlUGxheWVyO1xuICBsZXQgb3Bwb3NpbmdQbGF5ZXI7XG5cbiAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+IHBsYXllcjE7XG4gIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PiBwbGF5ZXIyO1xuICAvLyB3aWxsIHByb2JhYmx5IGhhdmUgdG8gYWRkIG5hbWUgcGFyYW1ldGVycyBsYXRlciBzbyB0aGF0IHBsYXllcnMgY2FuIHNldCB0aGVpciBuYW1lc1xuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIkpvaG5cIiwgZ2FtZWJvYXJkMSk7XG4gICAgcGxheWVyMiA9IHBsYXllcihcImFpXCIsIGdhbWVib2FyZDIpO1xuICAgIC8vIHBsYXllcjIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKDAsOSk7XG4gICAgYWN0aXZlUGxheWVyID0gcGxheWVyMTtcbiAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gICAgLy8gbWlnaHQgbmVlZCB0byBkaXNwbGF5IHRoZSBib2FyZHMgaGVyZSBpbnN0ZWFkIG9mIGNhbGxpbmcgc29tZXdoZXJlIGVsc2VcbiAgfTtcbiAgXG4gIGNvbnN0IHN3aXRjaEFjdGl2ZVBsYXllciA9ICgpID0+IHtcbiAgICBpZiAoYWN0aXZlUGxheWVyID09PSBwbGF5ZXIxKSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIgPSBwbGF5ZXIyO1xuICAgIH1cbiAgfTtcblxuICBjcmVhdGVOZXdHYW1lKCk7XG4gIGNvbnN0IHNoaXAxID0gU2hpcCgzKTtcbiAgY29uc3Qgc2hpcDIgPSBTaGlwKDMpO1xuICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgwLCAwLCBzaGlwMSk7XG4gIGdhbWVib2FyZDEucGxhY2VTaGlwKDEsIDAsIHNoaXAyKTtcblxuXG4gIGdhbWVib2FyZDIucGxhY2VBaVNoaXBzKCk7XG5cbiAgLy8gbWF5YmUgaSBjYW4gcmVmYWN0b3IgdGhpcywgaSBjYW4gYWRkIGFuIGV2ZW50TGlzdGVuZXIgZm9yIGVhY2ggY2VsbCwgXG4gIC8vIGJ1dCBpdCB3aWxsIG9ubHkgcmVjZWl2ZSBhdHRhY2ssIGFuZCBkaXNwbGF5IHBsYXllciBnYW1lYm9hcmQgaWYgaXQncyB0aGF0IHBlcnNvbidzIHR1cm5cbiAgLy8gaW5zdGVhZCBvZiBhZGRpbmcgYW4gZXZlbnRMaXN0ZW5lciBhZ2FpblxuICAvLyBidXQgaSBtaWdodCBuZWVkIHRvIGtlZXAgaXQgbGlrZSB0aGlzIGJlY2F1c2UgZGlzcGxheSB0aGUgYm9hcmQgcmVtb3ZlcyB0aGUgZXZlbnRsaXN0ZW5lcnNcbiAgY29uc3QgcGxheUdhbWUgPSAoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVBsYXllciA9PT0gcGxheWVyMSkge1xuICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3JpZ2h0IC5jZWxsXCIpO1xuICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmRhdGFzZXQucm93LCBlLnRhcmdldC5kYXRhc2V0LmNvbHVtbik7XG5cbiAgICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuaGFzU2hvdENvb3Jkc0JlZm9yZShwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGFzIHNob3QgdGhlcmUgYmVmb3JlXCIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93LCAxMCksIHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uLCAxMCkpO1xuXG4gICAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYGFsbCBzaGlwcyBhcmUgc3VuayBmb3IgcGxheWVyICR7b3Bwb3NpbmdQbGF5ZXIuZ2V0UGxheWVyTmFtZSgpfWApO1xuICAgICAgICAgIC8vIGFkZCBzb21lIGVuZCBnYW1lIHN0dWZmXG4gICAgICAgIH1cblxuICAgICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICAgICAgc3dpdGNoQWN0aXZlUGxheWVyKCk7XG4gICAgICAgIHBsYXlHYW1lKCk7XG4gICAgICB9KSk7XG4gICAgfSBcbiAgICBcbiAgICBlbHNlIHtcbiAgICAgIGNvbnN0IHNob3QgPSBhY3RpdmVQbGF5ZXIuY2hvb3NlUmFuZG9tU2hvdCgpO1xuICAgICAgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKS5yZWNlaXZlQXR0YWNrKHNob3RbMF0sIHNob3RbMV0pO1xuICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuYXJlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coYGFsbCBzaGlwcyBhcmUgc3VuayBmb3IgcGxheWVybWlra28gJHtvcHBvc2luZ1BsYXllci5nZXRQbGF5ZXJOYW1lKCl9YCk7XG4gICAgICAgIC8vIGFkZCBzb21lIGVuZCBnYW1lIHN0dWZmXG4gICAgICB9XG4gICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICAgIHN3aXRjaEFjdGl2ZVBsYXllcigpO1xuICAgICAgcGxheUdhbWUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlTmV3R2FtZSwgZ2V0UGxheWVyMSwgZ2V0UGxheWVyMiwgcGxheUdhbWUgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG5cbi8vIG5vdyBpIGhhdmUgYSBib3RoIGJvYXJkcyB3b3JraW5nIHdpdGggdGhlIHJlY2VpdmVBdHRhY2ssIHBsYWNlU2hpcCwgYW5kIGFsbFNoaXBzU3VuayBmdW5jdGlvbnNcbi8vIG5vdyBpIG5lZWQgdG8gbWFrZSBhaSBwbGFjZSBpdHMgc2hpcHMgcmFuZG9tbHlcbi8vIGkgcHJvYmFibHkgYWxzbyBuZWVkIHRvIHJlZmFjdG9yIHBsYWNlc2hpcHMgYW5kIG1ha2Ugc3VyZSB0aGF0IGl0IG9ubHkgdGFrZXMgdmFsaWQgY29vcmRpbmF0ZXNcbi8vIGhvdyBkbyBpIG1ha2UgcGxhY2VTaGlwcyBrbm93IGlmIGl0cyBhIHZhbGlkIGNvb3JkaW5hdGVcbi8vIG1heWJlIGlmIGNvb3JkaW5hdGVzIGlzIGluIHNoaXBzIGNvb3JkaW5hdGVzLCB0aGVuIHJldHVybj8/P1xuLy8gYWZ0ZXIgaSBnZXQgYWkgdG8gcGxhY2UgaXRzIHNoaXBzIHJhbmRvbWx5LCBpIG5lZWQgdG8gY2hlY2sgdGhlIGdhbWVib2FyZCBmdW5jdGlvbnNcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBnYW1lYm9hcmQgPSBbXTtcbiAgY29uc3Qgc2hpcHNDb29yZGluYXRlcyA9IFtdO1xuICBjb25zdCBtaXNzZWRBdHRhY2tzID0gW107XG5cbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT4gZ2FtZWJvYXJkO1xuXG4gIGNvbnN0IGdldE1pc3NlZEF0dGFja3MgPSAoKSA9PiBtaXNzZWRBdHRhY2tzO1xuXG4gIGNvbnN0IGNyZWF0ZUdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIHJvdy5wdXNoKFwiLVwiKTtcbiAgICAgIH1cbiAgICAgIGdhbWVib2FyZC5wdXNoKHJvdyk7XG4gICAgfVxuICB9O1xuICBjcmVhdGVHYW1lYm9hcmQoKTtcblxuICBcbiAgLy8gaG93IGRvIGkgbWFrZSBpdCBzbyB0aGF0IHNoaXBzIHdvbid0IG92ZXJsYXAgYW5kIHNoaXBzIHdvbid0IGdvIG91dCBvZiBib2FyZD9cbiAgLy8gdG8gbWFrZSBzaGlwcyBub3Qgb3ZlcmxhcCwgc2luY2Ugd2UncmUgb25seSBkb2luZyB0aGluZ3MgaG9yaXpvbnRhbGx5LCBcbiAgLy8gaWYgcm93IGlzIGluIHNoaXBzQ29vcmRpbmF0ZXMgY2hlY2sgaWYgY29sdW1uIGlzIGdyZWF0ZXIgdGhhbiB0aGF0IGNvcnJlc3BvbmRpbmcgY29sdW1uIGFuZCBsZXNzIHRoYW4gY29sdW1uICsgc2hpcCBsZW5ndGhcbiAgLy8gaWYgaXQgaXMgdGhlbiB0aGF0IGlzIGFuIGludmFsaWQgcm93L2NvbHVtblxuICAvLyB0byBtYWtlIHNoaXBzIG5vdCBnbyBvdXQgb2YgYm9hcmQsIFxuICAvLyBpZiBjb2x1bW4gKHNpbmNlIHNoaXBzIGFyZSBvbmx5IGdvaW5nIGhvcml6b250YWxseSkgKyBzaGlwIGxlbmd0aCA+IDEwICh3aGljaCBpcyB0aGUgbGVuZ3RoIG9mIGJvYXJkKSBcbiAgLy8gdGhlbiBzYXkgc29tZXRoaW5nIGFib3V0IGhvdyBpdCdzIGludmFsaWRcbiAgLy8gYW5kIHdoYXQgZG8gaSBkbyBpZiBpIGRvIGdldCByb3cvY29sdW1uL3NoaXAgbGVuZ3RoIHRoYXQgYXJlIGludmFsaWQ/IFxuICAvLyBtYXliZSB3b3JyeSBhYm91dCB0aGlzIGxhdGVyLCBiZWNhdXNlIGl0J3Mgbm90IHRoYXQgdXJnZW50XG4gIC8vIG1heWJlIHJlZmFjdG9yIGl0IGluIGEgd2F5IHdoZXJlIG9ubHkgdmFsaWQgY29vcmRpbmF0ZXMgYXJlIGdpdmVuP1xuICAvLyBtYXliZSB0aGlzIGlzIGEgZnVuY3Rpb24gZm9yIGRyYWcgYW5kIGRyb3A/XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChyb3csIGNvbHVtbiwgc2hpcCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAvLyBcIm9cIiBtZWFucyB0aGVyZSBpcyBhIHNoaXAvcGFydCBvZiBhIHNoaXAgb24gdGhvc2UgY29vcmRzXG4gICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW4raV0gPSBcIm9cIjtcbiAgICB9XG4gICAgY29uc29sZS5sb2cocm93LCBjb2x1bW4sIHNoaXAuZ2V0TGVuZ3RoKCkpO1xuICAgIHNoaXBzQ29vcmRpbmF0ZXMucHVzaCh7cm93LCBjb2x1bW4sIHNoaXB9KTsgXG4gICAgY29uc29sZS5sb2coc2hpcHNDb29yZGluYXRlcyk7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9cIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHNoaXBzQ29vcmRpbmF0ZXNbaV07XG4gICAgICAgIGlmIChyb3cgPT09IG9iai5yb3cgJiYgKGNvbHVtbiA+PSBvYmouY29sdW1uICYmIGNvbHVtbiA8IG9iai5jb2x1bW4gKyBvYmouc2hpcC5nZXRMZW5ndGgoKSkpIHtcbiAgICAgICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJ4XCI7XG4gICAgICAgICAgb2JqLnNoaXAuaGl0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWlzc2VkQXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9IFwibVwiO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhcmVBbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHNoaXBzU3VuayA9IDA7XG4gICAgc2hpcHNTdW5rID0gc2hpcHNDb29yZGluYXRlcy5yZWR1Y2UoIChhY2MsIGN1cikgPT4ge1xuICAgICAgaWYgKGN1ci5zaGlwLmlzU3VuaygpKSByZXR1cm4gYWNjICsgMTtcbiAgICAgIHJldHVybiBhY2MgKyAwO1xuICAgIH0sIDApO1xuICAgIFxuICAgIHJldHVybiBzaGlwc1N1bmsgPT09IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoO1xuICB9O1xuXG4gIGNvbnN0IGhhc1Nob3RDb29yZHNCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm1cIiB8fCBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcInhcIikgZmxhZyA9IHRydWU7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG5cbiAgLy8gcGxhY2UgYWkgc2hpcHMgaXMgb3ZlcmxhcHBpbmdcbiAgLy8gc2hpaHBzIGFyZSBvdmVybGFwcGluZywgZ290dGEgc3RlcCB0aHJvdWdoIGNvZGVcbiAgY29uc3QgZ2V0UmFuZG9tU2hpcFBsYWNlbWVudHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IFtdO1xuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IDQpIHtcbiAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2x1bW4gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBzaGlwID0gU2hpcChpKzIpO1xuICAgICAgLy8gbWF5YmUgY2hlY2sgaWYgY29sdW1uICsgc2hpcCBsZW5ndGggaXMgZ3JlYXRlciB0aGFuIDEwIGhlcmUgYWxyZWFkeSBzbyB3ZSBjYW4ganVzdCBjb250aW51ZVxuICAgICAgc2hpcENvb3Jkcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgaWYgKHJvdyA9PT0gZWwucm93ICYmIChjb2x1bW4gPj0gZWwuY29sdW1uICYmIGNvbHVtbiA8IChlbC5jb2x1bW4gKyBlbC5zaGlwLmdldExlbmd0aCgpKSkpIHtcbiAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChyb3cgPT09IGVsLnJvdykge1xuICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgc2hpcC5nZXRMZW5ndGgoKTsgaysrKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb2x1bW4gPSBjb2x1bW47XG4gICAgICAgICAgICBpZiAoKChuZXdDb2x1bW4gKyBrICsgMSkgPj0gZWwuY29sdW1uKSAmJiAoKG5ld0NvbHVtbiArIGsgKyAxKSA8IChlbC5jb2x1bW4gKyBlbC5zaGlwLmdldExlbmd0aCgpKSkpIGZsYWcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgIH0pO1xuICAgICAgaWYgKGZsYWcgfHwgY29sdW1uICsgc2hpcC5nZXRMZW5ndGgoKSA+IDEwKSB7XG4gICAgICAgIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgLy8gaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcENvb3Jkcy5wdXNoKHtyb3csIGNvbHVtbiwgc2hpcH0pO1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgIFxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhzaGlwQ29vcmRzKTtcbiAgICByZXR1cm4gc2hpcENvb3JkcztcbiAgfTtcblxuICBjb25zdCBwbGFjZUFpU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcEFyciA9IGdldFJhbmRvbVNoaXBQbGFjZW1lbnRzKCk7XG4gICAgc2hpcEFyci5mb3JFYWNoKG9iaiA9PiBwbGFjZVNoaXAob2JqLnJvdywgb2JqLmNvbHVtbiwgb2JqLnNoaXApKTtcbiAgfTtcblxuICByZXR1cm4geyBjcmVhdGVHYW1lYm9hcmQsIGdldEdhbWVib2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBcbiAgICBnZXRNaXNzZWRBdHRhY2tzLCBhcmVBbGxTaGlwc1N1bmssIGhhc1Nob3RDb29yZHNCZWZvcmUsIHBsYWNlQWlTaGlwcyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkOyIsImNvbnN0IHBsYXllciA9IChuYW1lLCBnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkO1xuICBjb25zdCBzaG90cyA9IFtdO1xuXG4gIGNvbnN0IGdldFBsYXllck5hbWUgPSAoKSA9PiBwbGF5ZXJOYW1lO1xuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuICBjb25zdCBnZXRTaG90cyA9ICgpID0+IHNob3RzO1xuXG4gIGNvbnN0IGhhc1Nob3RDb29yZHNCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIHNob3RzLmZvckVhY2goKHNob3QpID0+IHtcbiAgICAgIGlmIChzaG90WzBdID09PSByb3cgJiYgc2hvdFsxXSA9PT0gY29sdW1uKSB7XG4gICAgICAgIGZsYWcgPSAgdHJ1ZTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG4gIFxuICBjb25zdCBjaG9vc2VSYW5kb21TaG90ID0gKCkgPT4ge1xuICAgIGxldCByZXR1cm5WYWx1ZTtcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIFxuICAgIGlmICghaGFzU2hvdENvb3Jkc0JlZm9yZShyb3csIGNvbHVtbikpIHtcbiAgICAgIHNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICByZXR1cm5WYWx1ZSA9IFtyb3csIGNvbHVtbl07XG4gICAgfSBlbHNlIGlmIChoYXNTaG90Q29vcmRzQmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgcmV0dXJuVmFsdWUgPSBjaG9vc2VSYW5kb21TaG90KCk7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfTtcblxuICBcblxuICByZXR1cm4geyBnZXRQbGF5ZXJOYW1lLCBnZXRCb2FyZCwgZ2V0U2hvdHMsIGNob29zZVJhbmRvbVNob3QgfTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyOyIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IGxlbmd0aE9mU2hpcCA9IGxlbmd0aDtcbiAgbGV0IG51bU9mSGl0cyA9IDA7XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoT2ZTaGlwO1xuICAvLyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICBjb25zdCBnZXROdW1PZkhpdHMgPSAoKSA9PiBudW1PZkhpdHM7XG5cbiAgY29uc3QgaGl0ID0gKCkgPT4ge1xuICAgIG51bU9mSGl0cysrO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IChsZW5ndGhPZlNoaXAgLSBudW1PZkhpdHMpID09PSAwO1xuXG4gIHJldHVybiB7IGhpdCwgaXNTdW5rLCBnZXRMZW5ndGgsIGdldE51bU9mSGl0cyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCJjb25zdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkID0gKHBsYXllciwgZ2FtZWJvYXJkKSA9PiB7XG4gIGxldCBwYXJlbnRDb250YWluZXI7XG4gIGlmIChwbGF5ZXIuZ2V0UGxheWVyTmFtZSgpID09PSBcImFpXCIpIHBhcmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmlnaHRcIik7XG4gIGVsc2UgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0XCIpO1xuIFxuICAvLyBjbGVhcnMgaXQgZmlyc3QgdGhlbiBhZGRzIHRoZSBnYW1lYm9hcmQgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBwYXJlbnRDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29uc3Qgcm93TnVtID0gaTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdhbWVib2FyZC5nZXRHYW1lYm9hcmQoKVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY29sdW1uTnVtID0gajtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcInhcIikgY2VsbC50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm9cIikgY2VsbC50ZXh0Q29udGVudCA9IFwib1wiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm1cIikgY2VsbC50ZXh0Q29udGVudCA9IFwibVwiO1xuICAgICAgICBcbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dOdW07XG4gICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uTnVtO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQ7XG4vLyBleHBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCB9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgZnJvbSBcIi4vbW9kdWxlcy91aVwiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vbW9kdWxlcy9nYW1lXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQoR2FtZS5nZXRQbGF5ZXIxKCksIEdhbWUuZ2V0UGxheWVyMSgpLmdldEJvYXJkKCkpO1xuICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKEdhbWUuZ2V0UGxheWVyMigpLCBHYW1lLmdldFBsYXllcjIoKS5nZXRCb2FyZCgpKTtcbiAgR2FtZS5wbGF5R2FtZSgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=