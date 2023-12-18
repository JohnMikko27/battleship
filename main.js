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
    player1 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("Mikko", gameboard1);
    player2 = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__["default"])("ai", gameboard2);
    activePlayer = player1;
    opposingPlayer = player2;

    // test
    const ship4 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(5);
    const ship3 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(4);
    const ship2 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(3);
    const ship1 = (0,_ship_js__WEBPACK_IMPORTED_MODULE_2__["default"])(2);

    gameboard1.placeShip(0, 0, ship1);
    gameboard1.placeShip(1, 0, ship2);
    gameboard1.placeShip(8, 6, ship3);
    gameboard1.placeShip(6, 4, ship4);

    gameboard2.placeAiShips();

    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(player1, gameboard1);
    (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(player2, gameboard2);
    // displayModal(gameboard1);
    const startGame = document.querySelector("#start-game-button");
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
      // eslint-disable-next-line prefer-arrow-callback
      cells.forEach(cell => cell.addEventListener("click", function eventHandler(e) {
        console.log(e.target.dataset.row, e.target.dataset.column);

        if (opposingPlayer.getBoard().hasShotCoordsBefore(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10))) {
          console.log("has shot there before");
          return;
        }
        
        opposingPlayer.getBoard().receiveAttack(parseInt(e.target.dataset.row, 10), parseInt(e.target.dataset.column, 10));
        (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(opposingPlayer, opposingPlayer.getBoard());

        if (opposingPlayer.getBoard().areAllShipsSunk()) {
          console.log(`all ships are sunk for player ${opposingPlayer.getPlayerName()}`);
          // add some end game stuff
          (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayEndGameDisplay)(activePlayer.getPlayerName(), createNewGame);
          // eslint-disable-next-line no-shadow
          cells.forEach(cell => cell.removeEventListener("click", eventHandler));
          return;
        }
        
        // displayPlayerGameboard(opposingPlayer, opposingPlayer.getBoard());
        switchActivePlayer();
        playGame();
      }));
    } 
    
    else {
      const shot = activePlayer.chooseRandomShot();
      opposingPlayer.getBoard().receiveAttack(shot[0], shot[1]);
      (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayPlayerGameboard)(opposingPlayer, opposingPlayer.getBoard());
    
      if (opposingPlayer.getBoard().areAllShipsSunk()) {
        console.log(`all ships are sunk for playermikko ${opposingPlayer.getPlayerName()}`);
        // add some end game stuff
        (0,_ui_js__WEBPACK_IMPORTED_MODULE_3__.displayEndGameDisplay)(activePlayer.getPlayerName(), createNewGame);
      }
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
// now i can create a new game on load, then start a game if i hit button, then i can end the game after someone wins

// so the plan is to intially display both player and ai boards, 
// then have a start game button where they can start game
// but before that the player has preplaced ships on their board and can drag and drop them to anywhere they want
// so i need to be able to implement drag and drop
// i need to be able to differentiate/individualize each ship so that when i try to drag one, 
// the whole ships follows and not just a part of the ship
// i can create a isValidCoordinates function that checks if a coordinate is valid, 
// i can check if it's valid by using the conditionals in getRandomShipPlacements function
// if it is valid,
// then i need to place the ship at that coordinate



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
  const getShipsCoordinates = () => shipsCoordinates;
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

  // const isValidCoords = () => {

  // }

  return { createGameboard, getGameboard, placeShip, receiveAttack, 
    getMissedAttacks, areAllShipsSunk, hasShotCoordsBefore, placeAiShips, getShipsCoordinates };
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
/* harmony export */   displayEndGameDisplay: () => (/* binding */ displayEndGameDisplay),
/* harmony export */   displayModal: () => (/* binding */ displayModal),
/* harmony export */   displayPlayerGameboard: () => (/* binding */ displayPlayerGameboard)
/* harmony export */ });
// let shipLength;

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

      cell.dataset.row = rowNum;
      cell.dataset.column = columnNum;

      if (gameboard.getGameboard()[i][j] === "x") cell.textContent = "x";
      else if (gameboard.getGameboard()[i][j] === "o") {
        cell.textContent = "o";
      }
      else if (gameboard.getGameboard()[i][j] === "m") cell.textContent = "m";
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    parentContainer.appendChild(row);
  }
};

const createEndGameDisplay = (winner, cb) => {
  const displayContainer = document.createElement("div");
  const winnerDisplay = document.createElement("div");
  const playAgain = document.createElement("button");

  winnerDisplay.textContent = `${winner} has won!`;
  playAgain.textContent = "Play Again";
  playAgain.addEventListener("click", () => {
    cb();
    const lastChild = document.querySelector("body > div:last-child");
    document.body.removeChild(lastChild);
    document.querySelector("#main").classList.remove("blur");
  });

  displayContainer.setAttribute("id", "end-game-display");

  displayContainer.appendChild(winnerDisplay);
  displayContainer.appendChild(playAgain);

  return displayContainer;
};

const displayEndGameDisplay = (winner, cb) => {
  const body = document.querySelector("body");
  const endGameDisplay = createEndGameDisplay(winner, cb);
  
  document.querySelector("#main").classList.add("blur");
  endGameDisplay.classList.remove("blur");
  body.appendChild(endGameDisplay);
};

const createModal = (gameboard) => {
  const modal = document.createElement("div");
  const message = document.createElement("h2");
  const boardContainer = document.createElement("div");
  const shipsContainer = document.createElement("div");

  message.textContent = "Place Your Ships";

  for (let i = 0; i < gameboard.getGameboard().length; i++) {
    const row = document.createElement("div");
    const rowNum = i;
    row.classList.add("row");
    for (let j = 0; j < gameboard.getGameboard()[i].length; j++) {
      const columnNum = j;
      const cell = document.createElement("div");

      cell.dataset.row = rowNum;
      cell.dataset.column = columnNum;

      if (gameboard.getGameboard()[i][j] === "x") cell.textContent = "x";
      else if (gameboard.getGameboard()[i][j] === "o") cell.textContent = "o";
      else if (gameboard.getGameboard()[i][j] === "m") cell.textContent = "m";
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    boardContainer.appendChild(row);
  }

  for (let i = 0; i < 4; i++) {
    const ship = document.createElement("div");
    ship.classList.add("ship");
    for (let j = 0; j <= i+1; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      ship.appendChild(cell);
    }
    shipsContainer.appendChild(ship);
  }
  shipsContainer.setAttribute("id", "ships-container");
  modal.setAttribute("id", "modal");

  modal.appendChild(message);
  modal.appendChild(boardContainer);
  modal.appendChild(shipsContainer);
  return modal;
};

const displayModal = (gameboard) => {
  const modal = createModal(gameboard);
  document.body.appendChild(modal);
};

// const dragStartEventHandler = (e, gameboard) => {
//   // e.dataTransfer.setData('text/plain', )
//   // maybe use e.dataTransfer.setData to transfer the data of the length the ship??
//   // maybe use that function to get the length of the ship, and maybe have cell.addEventListener in display function
//   // so when dragStarts, we just call this function and it will return the correct length of the ship
//   // maybe we could have a global variable and it will just change that global variable
//   // so that when they start dragging the ship, we can have the correct length of the ship being dragged
//   console.log("drag start");
//   console.log(e.target.dataset.row, e.target.dataset.column);
//   const row = parseInt(e.target.dataset.row, 10);
//   const column = parseInt(e.target.dataset.column, 10);
//   for (let i = 0; i < gameboard.getShipsCoordinates().length; i++) {
//     if (gameboard.getShipsCoordinates()[i].row === row && (column >= gameboard.getShipsCoordinates()[i].column && (column < (gameboard.getShipsCoordinates()[i].column + gameboard.getShipsCoordinates()[i].ship.getLength())))) {
//       shipLength = gameboard.getShipsCoordinates()[i].ship.getLength();
//       console.log(shipLength);
//       e.dataTransfer.setData("text/plain", e.target.textContent);
//     }
//   }
// };

// const dragEventHandler = (e) => {
//   console.log("dragged");
//   // maybe refactor displayGamboard function
//   // i don't necessarily need to loop through each cell on the board, 
//   // but if i don't loop through each cell on the board, 
//   // then i would have to already have a 10x10 board, 
//   // and i would just place/style individual cells that are ship parts

//   // or maybe for each individual cell representing a part of a ship, 
//   // add a class like ship.${shiplength} to each of those individual parts, 
//   // then when we drag start, 
//   // we could select all those individual ship parts (maybe?) and use the dataTransfer.setData function on it?

//   // or maybe we could get the default image shown and multiply it or something
// };

// const dropEventHandler = (e) => {
//   e.preventDefault();
//   console.log("dropped");
//   const data = e.dataTransfer.getData("text/plain");
//   e.target.textContent = data;
// };



// according to webdev simplified's video, there are drag and drop events, so i should be able to drag
// the ships and drop them in the container
// so i need to know how i can differentiate each individual ship
// maybe i can only drag and drop after clicking each ship once, 
// so clicking it once allows for drag and drop
// and that click will identify the ship by going through the ship coords and identifying which element it is
// and then when they're dragging and about to drop, it should check if it is a valid coord
// if it is then drop it, if not then put the ship back to where it was

// when im trying to drag and drop, to be able to 'drag' and 'drop' the ship, once i click/start dragging
// it should find the right ship in the ship coords
// so that when i drop it, it will display correctly; it will display the correct ship length
// once i find the right ship length from starting the drag
// while dragging it over, i should be check if it is a valid coordinate, only then can it be dropped
// once it's dropped it should just change the correct element from the array, change the row/column
// and then since we're validing coords and placing ship, it should place it correctly

// use setDragImage function to make it look like you're draggint the whole thing
// i first need to understand each drag/drop event and then figure out what i need to put in each of those

// look at my notes on notebook, I got the dragstart done now i think
// i should implement showing all the ship being dragged but rn
// or maybe i do need to use the dataTransfer.setData so that it knows how 'long' the ship is?
// i can just focus on first dropping the thing i am dragging, it might be easier later on if i do this first

// from drag and drop mdn docs
// Each DataTransfer object contains an items property, 
// which is a list of DataTransferItem objects. 
// A DataTransferItem object represents a single drag item, each with a kind property (either string or file) 
// and a type property for the data item's MIME type. 
// The DataTransferItem object also has methods to get the drag item's data.

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUM7QUFDTTtBQUNWO0FBQzJDOztBQUV4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQix5REFBUztBQUMxQixpQkFBaUIseURBQVM7QUFDMUIsY0FBYyxzREFBTTtBQUNwQixjQUFjLHNEQUFNO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0Isb0RBQUk7QUFDdEIsa0JBQWtCLG9EQUFJO0FBQ3RCLGtCQUFrQixvREFBSTtBQUN0QixrQkFBa0Isb0RBQUk7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUksOERBQXNCO0FBQzFCLElBQUksOERBQXNCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4REFBc0I7O0FBRTlCO0FBQ0EsdURBQXVELCtCQUErQjtBQUN0RjtBQUNBLFVBQVUsNkRBQXFCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sOERBQXNCO0FBQzVCO0FBQ0E7QUFDQSwwREFBMEQsK0JBQStCO0FBQ3pGO0FBQ0EsUUFBUSw2REFBcUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1gsQ0FBQzs7QUFFRCxpRUFBZSxJQUFJLEVBQUM7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEg2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQSxzQkFBc0IsUUFBUTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3Qzs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLDZCQUE2QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixvREFBSTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViwwQkFBMEIsc0JBQXNCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUix5QkFBeUIsa0JBQWtCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsV0FBVztBQUNYO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7QUNuSHhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUEsaUVBQWUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUNwQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLFdBQVc7QUFDWDs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7O0FDakJuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixxQ0FBcUM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdDQUF3QztBQUM1RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCLHFDQUFxQztBQUN2RDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0NBQXdDO0FBQzVEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsVUFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw0Q0FBNEM7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV1RTs7QUFFdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUM5TEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05rQzs7QUFFbEM7QUFDQSxFQUFFLHFEQUFJO0FBQ04sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBsYXllciBmcm9tIFwiLi9wbGF5ZXIuanNcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkLmpzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwLmpzXCI7XG5pbXBvcnQgeyBkaXNwbGF5UGxheWVyR2FtZWJvYXJkLCBkaXNwbGF5RW5kR2FtZURpc3BsYXkgfSBmcm9tIFwiLi91aS5qc1wiO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjE7XG4gIGxldCBwbGF5ZXIyO1xuICBsZXQgZ2FtZWJvYXJkMTtcbiAgbGV0IGdhbWVib2FyZDI7XG4gIGxldCBhY3RpdmVQbGF5ZXI7XG4gIGxldCBvcHBvc2luZ1BsYXllcjtcblxuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIk1pa2tvXCIsIGdhbWVib2FyZDEpO1xuICAgIHBsYXllcjIgPSBwbGF5ZXIoXCJhaVwiLCBnYW1lYm9hcmQyKTtcbiAgICBhY3RpdmVQbGF5ZXIgPSBwbGF5ZXIxO1xuICAgIG9wcG9zaW5nUGxheWVyID0gcGxheWVyMjtcblxuICAgIC8vIHRlc3RcbiAgICBjb25zdCBzaGlwNCA9IFNoaXAoNSk7XG4gICAgY29uc3Qgc2hpcDMgPSBTaGlwKDQpO1xuICAgIGNvbnN0IHNoaXAyID0gU2hpcCgzKTtcbiAgICBjb25zdCBzaGlwMSA9IFNoaXAoMik7XG5cbiAgICBnYW1lYm9hcmQxLnBsYWNlU2hpcCgwLCAwLCBzaGlwMSk7XG4gICAgZ2FtZWJvYXJkMS5wbGFjZVNoaXAoMSwgMCwgc2hpcDIpO1xuICAgIGdhbWVib2FyZDEucGxhY2VTaGlwKDgsIDYsIHNoaXAzKTtcbiAgICBnYW1lYm9hcmQxLnBsYWNlU2hpcCg2LCA0LCBzaGlwNCk7XG5cbiAgICBnYW1lYm9hcmQyLnBsYWNlQWlTaGlwcygpO1xuXG4gICAgZGlzcGxheVBsYXllckdhbWVib2FyZChwbGF5ZXIxLCBnYW1lYm9hcmQxKTtcbiAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKHBsYXllcjIsIGdhbWVib2FyZDIpO1xuICAgIC8vIGRpc3BsYXlNb2RhbChnYW1lYm9hcmQxKTtcbiAgICBjb25zdCBzdGFydEdhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N0YXJ0LWdhbWUtYnV0dG9uXCIpO1xuICAgIHN0YXJ0R2FtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheUdhbWUpO1xuICB9O1xuICBcbiAgY29uc3Qgc3dpdGNoQWN0aXZlUGxheWVyID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjI7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVBsYXllciA9IHBsYXllcjE7XG4gICAgICBvcHBvc2luZ1BsYXllciA9IHBsYXllcjI7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlHYW1lID0gKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQbGF5ZXIgPT09IHBsYXllcjEpIHtcbiAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNyaWdodCAuY2VsbFwiKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItYXJyb3ctY2FsbGJhY2tcbiAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiBldmVudEhhbmRsZXIoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5kYXRhc2V0LnJvdywgZS50YXJnZXQuZGF0YXNldC5jb2x1bW4pO1xuXG4gICAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmhhc1Nob3RDb29yZHNCZWZvcmUocGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKSwgcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKSkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImhhcyBzaG90IHRoZXJlIGJlZm9yZVwiKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkucmVjZWl2ZUF0dGFjayhwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LnJvdywgMTApLCBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvbHVtbiwgMTApKTtcbiAgICAgICAgZGlzcGxheVBsYXllckdhbWVib2FyZChvcHBvc2luZ1BsYXllciwgb3Bwb3NpbmdQbGF5ZXIuZ2V0Qm9hcmQoKSk7XG5cbiAgICAgICAgaWYgKG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkuYXJlQWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgYWxsIHNoaXBzIGFyZSBzdW5rIGZvciBwbGF5ZXIgJHtvcHBvc2luZ1BsYXllci5nZXRQbGF5ZXJOYW1lKCl9YCk7XG4gICAgICAgICAgLy8gYWRkIHNvbWUgZW5kIGdhbWUgc3R1ZmZcbiAgICAgICAgICBkaXNwbGF5RW5kR2FtZURpc3BsYXkoYWN0aXZlUGxheWVyLmdldFBsYXllck5hbWUoKSwgY3JlYXRlTmV3R2FtZSk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiBjZWxsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudEhhbmRsZXIpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQob3Bwb3NpbmdQbGF5ZXIsIG9wcG9zaW5nUGxheWVyLmdldEJvYXJkKCkpO1xuICAgICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcbiAgICAgICAgcGxheUdhbWUoKTtcbiAgICAgIH0pKTtcbiAgICB9IFxuICAgIFxuICAgIGVsc2Uge1xuICAgICAgY29uc3Qgc2hvdCA9IGFjdGl2ZVBsYXllci5jaG9vc2VSYW5kb21TaG90KCk7XG4gICAgICBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLnJlY2VpdmVBdHRhY2soc2hvdFswXSwgc2hvdFsxXSk7XG4gICAgICBkaXNwbGF5UGxheWVyR2FtZWJvYXJkKG9wcG9zaW5nUGxheWVyLCBvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpKTtcbiAgICBcbiAgICAgIGlmIChvcHBvc2luZ1BsYXllci5nZXRCb2FyZCgpLmFyZUFsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBhbGwgc2hpcHMgYXJlIHN1bmsgZm9yIHBsYXllcm1pa2tvICR7b3Bwb3NpbmdQbGF5ZXIuZ2V0UGxheWVyTmFtZSgpfWApO1xuICAgICAgICAvLyBhZGQgc29tZSBlbmQgZ2FtZSBzdHVmZlxuICAgICAgICBkaXNwbGF5RW5kR2FtZURpc3BsYXkoYWN0aXZlUGxheWVyLmdldFBsYXllck5hbWUoKSwgY3JlYXRlTmV3R2FtZSk7XG4gICAgICB9XG4gICAgICBzd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcbiAgICAgIHBsYXlHYW1lKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGNyZWF0ZU5ld0dhbWUsIHBsYXlHYW1lIH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuXG4vLyBtYXliZSB3aGVuIGkgaW1wbGVtZW50IGRyYWcgYW5kIGRyb3AsIGkgY2FuIGhhdmUgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGUgc2hpcCB3aWxsIG92ZXJsYXAvZ28gb3V0IG9mIGJvYXJkXG4vLyBpZiB0aGF0J3MgdHJ1ZSB0aGVuIGRvbnQnIHBsYWNlIGVsc2UgcGxhY2UgaXRcbi8vIG1heWJlIGlmIGNvb3JkaW5hdGVzIGlzIGluIHNoaXBzIGNvb3JkaW5hdGVzLCB0aGVuIHJldHVybj8/P1xuLy8gYWZ0ZXIgaSBnZXQgYWkgdG8gcGxhY2UgaXRzIHNoaXBzIHJhbmRvbWx5LCBpIG5lZWQgdG8gY2hlY2sgdGhlIGdhbWVib2FyZCBmdW5jdGlvbnNcbi8vIG5vdyBpIGNhbiBjcmVhdGUgYSBuZXcgZ2FtZSBvbiBsb2FkLCB0aGVuIHN0YXJ0IGEgZ2FtZSBpZiBpIGhpdCBidXR0b24sIHRoZW4gaSBjYW4gZW5kIHRoZSBnYW1lIGFmdGVyIHNvbWVvbmUgd2luc1xuXG4vLyBzbyB0aGUgcGxhbiBpcyB0byBpbnRpYWxseSBkaXNwbGF5IGJvdGggcGxheWVyIGFuZCBhaSBib2FyZHMsIFxuLy8gdGhlbiBoYXZlIGEgc3RhcnQgZ2FtZSBidXR0b24gd2hlcmUgdGhleSBjYW4gc3RhcnQgZ2FtZVxuLy8gYnV0IGJlZm9yZSB0aGF0IHRoZSBwbGF5ZXIgaGFzIHByZXBsYWNlZCBzaGlwcyBvbiB0aGVpciBib2FyZCBhbmQgY2FuIGRyYWcgYW5kIGRyb3AgdGhlbSB0byBhbnl3aGVyZSB0aGV5IHdhbnRcbi8vIHNvIGkgbmVlZCB0byBiZSBhYmxlIHRvIGltcGxlbWVudCBkcmFnIGFuZCBkcm9wXG4vLyBpIG5lZWQgdG8gYmUgYWJsZSB0byBkaWZmZXJlbnRpYXRlL2luZGl2aWR1YWxpemUgZWFjaCBzaGlwIHNvIHRoYXQgd2hlbiBpIHRyeSB0byBkcmFnIG9uZSwgXG4vLyB0aGUgd2hvbGUgc2hpcHMgZm9sbG93cyBhbmQgbm90IGp1c3QgYSBwYXJ0IG9mIHRoZSBzaGlwXG4vLyBpIGNhbiBjcmVhdGUgYSBpc1ZhbGlkQ29vcmRpbmF0ZXMgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgYSBjb29yZGluYXRlIGlzIHZhbGlkLCBcbi8vIGkgY2FuIGNoZWNrIGlmIGl0J3MgdmFsaWQgYnkgdXNpbmcgdGhlIGNvbmRpdGlvbmFscyBpbiBnZXRSYW5kb21TaGlwUGxhY2VtZW50cyBmdW5jdGlvblxuLy8gaWYgaXQgaXMgdmFsaWQsXG4vLyB0aGVuIGkgbmVlZCB0byBwbGFjZSB0aGUgc2hpcCBhdCB0aGF0IGNvb3JkaW5hdGVcblxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiBnYW1lYm9hcmQ7XG4gIGNvbnN0IGdldFNoaXBzQ29vcmRpbmF0ZXMgPSAoKSA9PiBzaGlwc0Nvb3JkaW5hdGVzO1xuICBjb25zdCBnZXRNaXNzZWRBdHRhY2tzID0gKCkgPT4gbWlzc2VkQXR0YWNrcztcblxuICBjb25zdCBjcmVhdGVHYW1lYm9hcmQgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICByb3cucHVzaChcIi1cIik7XG4gICAgICB9XG4gICAgICBnYW1lYm9hcmQucHVzaChyb3cpO1xuICAgIH1cbiAgfTtcbiAgY3JlYXRlR2FtZWJvYXJkKCk7XG4gIFxuICAvLyBob3cgZG8gaSBtYWtlIGl0IHNvIHRoYXQgc2hpcHMgd29uJ3Qgb3ZlcmxhcCBhbmQgc2hpcHMgd29uJ3QgZ28gb3V0IG9mIGJvYXJkP1xuICAvLyB0byBtYWtlIHNoaXBzIG5vdCBvdmVybGFwLCBzaW5jZSB3ZSdyZSBvbmx5IGRvaW5nIHRoaW5ncyBob3Jpem9udGFsbHksIFxuICAvLyBpZiByb3cgaXMgaW4gc2hpcHNDb29yZGluYXRlcyBjaGVjayBpZiBjb2x1bW4gaXMgZ3JlYXRlciB0aGFuIHRoYXQgY29ycmVzcG9uZGluZyBjb2x1bW4gYW5kIGxlc3MgdGhhbiBjb2x1bW4gKyBzaGlwIGxlbmd0aFxuICAvLyBpZiBpdCBpcyB0aGVuIHRoYXQgaXMgYW4gaW52YWxpZCByb3cvY29sdW1uXG4gIC8vIHRvIG1ha2Ugc2hpcHMgbm90IGdvIG91dCBvZiBib2FyZCwgXG4gIC8vIGlmIGNvbHVtbiAoc2luY2Ugc2hpcHMgYXJlIG9ubHkgZ29pbmcgaG9yaXpvbnRhbGx5KSArIHNoaXAgbGVuZ3RoID4gMTAgKHdoaWNoIGlzIHRoZSBsZW5ndGggb2YgYm9hcmQpIFxuICAvLyB0aGVuIHNheSBzb21ldGhpbmcgYWJvdXQgaG93IGl0J3MgaW52YWxpZFxuICAvLyBhbmQgd2hhdCBkbyBpIGRvIGlmIGkgZG8gZ2V0IHJvdy9jb2x1bW4vc2hpcCBsZW5ndGggdGhhdCBhcmUgaW52YWxpZD8gXG4gIC8vIG1heWJlIHdvcnJ5IGFib3V0IHRoaXMgbGF0ZXIsIGJlY2F1c2UgaXQncyBub3QgdGhhdCB1cmdlbnRcbiAgLy8gbWF5YmUgcmVmYWN0b3IgaXQgaW4gYSB3YXkgd2hlcmUgb25seSB2YWxpZCBjb29yZGluYXRlcyBhcmUgZ2l2ZW4/XG4gIC8vIG1heWJlIHRoaXMgaXMgYSBmdW5jdGlvbiBmb3IgZHJhZyBhbmQgZHJvcD9cbiAgY29uc3QgcGxhY2VTaGlwID0gKHJvdywgY29sdW1uLCBzaGlwKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIC8vIFwib1wiIG1lYW5zIHRoZXJlIGlzIGEgc2hpcC9wYXJ0IG9mIGEgc2hpcCBvbiB0aG9zZSBjb29yZHNcbiAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbitpXSA9IFwib1wiO1xuICAgIH1cbiAgICBzaGlwc0Nvb3JkaW5hdGVzLnB1c2goe3JvdywgY29sdW1uLCBzaGlwfSk7IFxuICB9O1xuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBpZiAoZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJvXCIpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBvYmogPSBzaGlwc0Nvb3JkaW5hdGVzW2ldO1xuICAgICAgICBpZiAocm93ID09PSBvYmoucm93ICYmIChjb2x1bW4gPj0gb2JqLmNvbHVtbiAmJiBjb2x1bW4gPCBvYmouY29sdW1uICsgb2JqLnNoaXAuZ2V0TGVuZ3RoKCkpKSB7XG4gICAgICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9IFwieFwiO1xuICAgICAgICAgIG9iai5zaGlwLmhpdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1pc3NlZEF0dGFja3MucHVzaChbcm93LCBjb2x1bW5dKTtcbiAgICAgIGdhbWVib2FyZFtyb3ddW2NvbHVtbl0gPSBcIm1cIjtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgYXJlQWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzaGlwc1N1bmsgPSAwO1xuICAgIHNoaXBzU3VuayA9IHNoaXBzQ29vcmRpbmF0ZXMucmVkdWNlKCAoYWNjLCBjdXIpID0+IHtcbiAgICAgIGlmIChjdXIuc2hpcC5pc1N1bmsoKSkgcmV0dXJuIGFjYyArIDE7XG4gICAgICByZXR1cm4gYWNjICsgMDtcbiAgICB9LCAwKTtcbiAgICBcbiAgICByZXR1cm4gc2hpcHNTdW5rID09PSBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBoYXNTaG90Q29vcmRzQmVmb3JlID0gKHJvdywgY29sdW1uKSA9PiB7XG4gICAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgICBpZiAoZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJtXCIgfHwgZ2FtZWJvYXJkW3Jvd11bY29sdW1uXSA9PT0gXCJ4XCIpIGZsYWcgPSB0cnVlO1xuICAgIHJldHVybiBmbGFnO1xuICB9O1xuXG4gIGNvbnN0IGdldFJhbmRvbVNoaXBQbGFjZW1lbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBDb29yZHMgPSBbXTtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCA0KSB7XG4gICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgY29uc3Qgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgY29uc3Qgc2hpcCA9IFNoaXAoaSsyKTtcbiAgICAgIC8vIG1heWJlIGNoZWNrIGlmIGNvbHVtbiArIHNoaXAgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiAxMCBoZXJlIGFscmVhZHkgc28gd2UgY2FuIGp1c3QgY29udGludWVcbiAgICAgIHNoaXBDb29yZHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGlmIChyb3cgPT09IGVsLnJvdyAmJiAoY29sdW1uID49IGVsLmNvbHVtbiAmJiBjb2x1bW4gPCAoZWwuY29sdW1uICsgZWwuc2hpcC5nZXRMZW5ndGgoKSkpKSB7XG4gICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAocm93ID09PSBlbC5yb3cpIHtcbiAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGsrKykge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29sdW1uID0gY29sdW1uO1xuICAgICAgICAgICAgaWYgKCgobmV3Q29sdW1uICsgayArIDEpID49IGVsLmNvbHVtbikgJiYgKChuZXdDb2x1bW4gKyBrICsgMSkgPCAoZWwuY29sdW1uICsgZWwuc2hpcC5nZXRMZW5ndGgoKSkpKSBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICB9KTtcbiAgICAgIGlmIChmbGFnIHx8IGNvbHVtbiArIHNoaXAuZ2V0TGVuZ3RoKCkgPiAxMCkge1xuICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgIC8vIGkrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBDb29yZHMucHVzaCh7cm93LCBjb2x1bW4sIHNoaXB9KTtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2hpcENvb3JkcztcbiAgfTtcblxuICBjb25zdCBwbGFjZUFpU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2hpcEFyciA9IGdldFJhbmRvbVNoaXBQbGFjZW1lbnRzKCk7XG4gICAgc2hpcEFyci5mb3JFYWNoKG9iaiA9PiBwbGFjZVNoaXAob2JqLnJvdywgb2JqLmNvbHVtbiwgb2JqLnNoaXApKTtcbiAgfTtcblxuICAvLyBjb25zdCBpc1ZhbGlkQ29vcmRzID0gKCkgPT4ge1xuXG4gIC8vIH1cblxuICByZXR1cm4geyBjcmVhdGVHYW1lYm9hcmQsIGdldEdhbWVib2FyZCwgcGxhY2VTaGlwLCByZWNlaXZlQXR0YWNrLCBcbiAgICBnZXRNaXNzZWRBdHRhY2tzLCBhcmVBbGxTaGlwc1N1bmssIGhhc1Nob3RDb29yZHNCZWZvcmUsIHBsYWNlQWlTaGlwcywgZ2V0U2hpcHNDb29yZGluYXRlcyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkOyIsImNvbnN0IHBsYXllciA9IChuYW1lLCBnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkO1xuICBjb25zdCBzaG90cyA9IFtdO1xuXG4gIGNvbnN0IGdldFBsYXllck5hbWUgPSAoKSA9PiBwbGF5ZXJOYW1lO1xuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IGJvYXJkO1xuICBjb25zdCBnZXRTaG90cyA9ICgpID0+IHNob3RzO1xuXG4gIGNvbnN0IGhhc1Nob3RDb29yZHNCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIHNob3RzLmZvckVhY2goKHNob3QpID0+IHtcbiAgICAgIGlmIChzaG90WzBdID09PSByb3cgJiYgc2hvdFsxXSA9PT0gY29sdW1uKSB7XG4gICAgICAgIGZsYWcgPSAgdHJ1ZTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG4gIFxuICBjb25zdCBjaG9vc2VSYW5kb21TaG90ID0gKCkgPT4ge1xuICAgIGxldCByZXR1cm5WYWx1ZTtcbiAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgY29uc3QgY29sdW1uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIFxuICAgIGlmICghaGFzU2hvdENvb3Jkc0JlZm9yZShyb3csIGNvbHVtbikpIHtcbiAgICAgIHNob3RzLnB1c2goW3JvdywgY29sdW1uXSk7XG4gICAgICByZXR1cm5WYWx1ZSA9IFtyb3csIGNvbHVtbl07XG4gICAgfSBlbHNlIGlmIChoYXNTaG90Q29vcmRzQmVmb3JlKHJvdywgY29sdW1uKSkge1xuICAgICAgcmV0dXJuVmFsdWUgPSBjaG9vc2VSYW5kb21TaG90KCk7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfTtcblxuICByZXR1cm4geyBnZXRQbGF5ZXJOYW1lLCBnZXRCb2FyZCwgZ2V0U2hvdHMsIGNob29zZVJhbmRvbVNob3QgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjsiLCJjb25zdCBTaGlwID0gKGxlbmd0aCkgPT4ge1xuICBjb25zdCBsZW5ndGhPZlNoaXAgPSBsZW5ndGg7XG4gIGxldCBudW1PZkhpdHMgPSAwO1xuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aE9mU2hpcDtcbiAgLy8gZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgY29uc3QgZ2V0TnVtT2ZIaXRzID0gKCkgPT4gbnVtT2ZIaXRzO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBudW1PZkhpdHMrKztcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiAobGVuZ3RoT2ZTaGlwIC0gbnVtT2ZIaXRzKSA9PT0gMDtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuaywgZ2V0TGVuZ3RoLCBnZXROdW1PZkhpdHMgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7IiwiLy8gbGV0IHNoaXBMZW5ndGg7XG5cbmNvbnN0IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQgPSAocGxheWVyLCBnYW1lYm9hcmQpID0+IHtcbiAgbGV0IHBhcmVudENvbnRhaW5lcjtcbiAgaWYgKHBsYXllci5nZXRQbGF5ZXJOYW1lKCkgPT09IFwiYWlcIikgcGFyZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyaWdodFwiKTtcbiAgZWxzZSBwYXJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xlZnRcIik7XG4gXG4gIC8vIGNsZWFycyBpdCBmaXJzdCB0aGVuIGFkZHMgdGhlIGdhbWVib2FyZCB0byBwcmV2ZW50IGR1cGxpY2F0aW9uXG4gIHBhcmVudENvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByb3dOdW0gPSBpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjb2x1bW5OdW0gPSBqO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dOdW07XG4gICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uTnVtO1xuXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcInhcIikgY2VsbC50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm9cIikge1xuICAgICAgICBjZWxsLnRleHRDb250ZW50ID0gXCJvXCI7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKClbaV1bal0gPT09IFwibVwiKSBjZWxsLnRleHRDb250ZW50ID0gXCJtXCI7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH1cbiAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlRW5kR2FtZURpc3BsYXkgPSAod2lubmVyLCBjYikgPT4ge1xuICBjb25zdCBkaXNwbGF5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3Qgd2lubmVyRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNvbnN0IHBsYXlBZ2FpbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cbiAgd2lubmVyRGlzcGxheS50ZXh0Q29udGVudCA9IGAke3dpbm5lcn0gaGFzIHdvbiFgO1xuICBwbGF5QWdhaW4udGV4dENvbnRlbnQgPSBcIlBsYXkgQWdhaW5cIjtcbiAgcGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY2IoKTtcbiAgICBjb25zdCBsYXN0Q2hpbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keSA+IGRpdjpsYXN0LWNoaWxkXCIpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGFzdENoaWxkKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5cIikuY2xhc3NMaXN0LnJlbW92ZShcImJsdXJcIik7XG4gIH0pO1xuXG4gIGRpc3BsYXlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJlbmQtZ2FtZS1kaXNwbGF5XCIpO1xuXG4gIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQod2lubmVyRGlzcGxheSk7XG4gIGRpc3BsYXlDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheUFnYWluKTtcblxuICByZXR1cm4gZGlzcGxheUNvbnRhaW5lcjtcbn07XG5cbmNvbnN0IGRpc3BsYXlFbmRHYW1lRGlzcGxheSA9ICh3aW5uZXIsIGNiKSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgY29uc3QgZW5kR2FtZURpc3BsYXkgPSBjcmVhdGVFbmRHYW1lRGlzcGxheSh3aW5uZXIsIGNiKTtcbiAgXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpblwiKS5jbGFzc0xpc3QuYWRkKFwiYmx1clwiKTtcbiAgZW5kR2FtZURpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZShcImJsdXJcIik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoZW5kR2FtZURpc3BsYXkpO1xufTtcblxuY29uc3QgY3JlYXRlTW9kYWwgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb25zdCBzaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgbWVzc2FnZS50ZXh0Q29udGVudCA9IFwiUGxhY2UgWW91ciBTaGlwc1wiO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb25zdCByb3dOdW0gPSBpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjb2x1bW5OdW0gPSBqO1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIGNlbGwuZGF0YXNldC5yb3cgPSByb3dOdW07XG4gICAgICBjZWxsLmRhdGFzZXQuY29sdW1uID0gY29sdW1uTnVtO1xuXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcInhcIikgY2VsbC50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm9cIikgY2VsbC50ZXh0Q29udGVudCA9IFwib1wiO1xuICAgICAgZWxzZSBpZiAoZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldW2pdID09PSBcIm1cIikgY2VsbC50ZXh0Q29udGVudCA9IFwibVwiO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc2hpcC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBpKzE7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgICAgc2hpcC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9XG4gICAgc2hpcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcCk7XG4gIH1cbiAgc2hpcHNDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzaGlwcy1jb250YWluZXJcIik7XG4gIG1vZGFsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9kYWxcIik7XG5cbiAgbW9kYWwuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XG4gIG1vZGFsLmFwcGVuZENoaWxkKGJvYXJkQ29udGFpbmVyKTtcbiAgbW9kYWwuYXBwZW5kQ2hpbGQoc2hpcHNDb250YWluZXIpO1xuICByZXR1cm4gbW9kYWw7XG59O1xuXG5jb25zdCBkaXNwbGF5TW9kYWwgPSAoZ2FtZWJvYXJkKSA9PiB7XG4gIGNvbnN0IG1vZGFsID0gY3JlYXRlTW9kYWwoZ2FtZWJvYXJkKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG59O1xuXG4vLyBjb25zdCBkcmFnU3RhcnRFdmVudEhhbmRsZXIgPSAoZSwgZ2FtZWJvYXJkKSA9PiB7XG4vLyAgIC8vIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3RleHQvcGxhaW4nLCApXG4vLyAgIC8vIG1heWJlIHVzZSBlLmRhdGFUcmFuc2Zlci5zZXREYXRhIHRvIHRyYW5zZmVyIHRoZSBkYXRhIG9mIHRoZSBsZW5ndGggdGhlIHNoaXA/P1xuLy8gICAvLyBtYXliZSB1c2UgdGhhdCBmdW5jdGlvbiB0byBnZXQgdGhlIGxlbmd0aCBvZiB0aGUgc2hpcCwgYW5kIG1heWJlIGhhdmUgY2VsbC5hZGRFdmVudExpc3RlbmVyIGluIGRpc3BsYXkgZnVuY3Rpb25cbi8vICAgLy8gc28gd2hlbiBkcmFnU3RhcnRzLCB3ZSBqdXN0IGNhbGwgdGhpcyBmdW5jdGlvbiBhbmQgaXQgd2lsbCByZXR1cm4gdGhlIGNvcnJlY3QgbGVuZ3RoIG9mIHRoZSBzaGlwXG4vLyAgIC8vIG1heWJlIHdlIGNvdWxkIGhhdmUgYSBnbG9iYWwgdmFyaWFibGUgYW5kIGl0IHdpbGwganVzdCBjaGFuZ2UgdGhhdCBnbG9iYWwgdmFyaWFibGVcbi8vICAgLy8gc28gdGhhdCB3aGVuIHRoZXkgc3RhcnQgZHJhZ2dpbmcgdGhlIHNoaXAsIHdlIGNhbiBoYXZlIHRoZSBjb3JyZWN0IGxlbmd0aCBvZiB0aGUgc2hpcCBiZWluZyBkcmFnZ2VkXG4vLyAgIGNvbnNvbGUubG9nKFwiZHJhZyBzdGFydFwiKTtcbi8vICAgY29uc29sZS5sb2coZS50YXJnZXQuZGF0YXNldC5yb3csIGUudGFyZ2V0LmRhdGFzZXQuY29sdW1uKTtcbi8vICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5yb3csIDEwKTtcbi8vICAgY29uc3QgY29sdW1uID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2x1bW4sIDEwKTtcbi8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0U2hpcHNDb29yZGluYXRlcygpLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgaWYgKGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKClbaV0ucm93ID09PSByb3cgJiYgKGNvbHVtbiA+PSBnYW1lYm9hcmQuZ2V0U2hpcHNDb29yZGluYXRlcygpW2ldLmNvbHVtbiAmJiAoY29sdW1uIDwgKGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKClbaV0uY29sdW1uICsgZ2FtZWJvYXJkLmdldFNoaXBzQ29vcmRpbmF0ZXMoKVtpXS5zaGlwLmdldExlbmd0aCgpKSkpKSB7XG4vLyAgICAgICBzaGlwTGVuZ3RoID0gZ2FtZWJvYXJkLmdldFNoaXBzQ29vcmRpbmF0ZXMoKVtpXS5zaGlwLmdldExlbmd0aCgpO1xuLy8gICAgICAgY29uc29sZS5sb2coc2hpcExlbmd0aCk7XG4vLyAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBlLnRhcmdldC50ZXh0Q29udGVudCk7XG4vLyAgICAgfVxuLy8gICB9XG4vLyB9O1xuXG4vLyBjb25zdCBkcmFnRXZlbnRIYW5kbGVyID0gKGUpID0+IHtcbi8vICAgY29uc29sZS5sb2coXCJkcmFnZ2VkXCIpO1xuLy8gICAvLyBtYXliZSByZWZhY3RvciBkaXNwbGF5R2FtYm9hcmQgZnVuY3Rpb25cbi8vICAgLy8gaSBkb24ndCBuZWNlc3NhcmlseSBuZWVkIHRvIGxvb3AgdGhyb3VnaCBlYWNoIGNlbGwgb24gdGhlIGJvYXJkLCBcbi8vICAgLy8gYnV0IGlmIGkgZG9uJ3QgbG9vcCB0aHJvdWdoIGVhY2ggY2VsbCBvbiB0aGUgYm9hcmQsIFxuLy8gICAvLyB0aGVuIGkgd291bGQgaGF2ZSB0byBhbHJlYWR5IGhhdmUgYSAxMHgxMCBib2FyZCwgXG4vLyAgIC8vIGFuZCBpIHdvdWxkIGp1c3QgcGxhY2Uvc3R5bGUgaW5kaXZpZHVhbCBjZWxscyB0aGF0IGFyZSBzaGlwIHBhcnRzXG5cbi8vICAgLy8gb3IgbWF5YmUgZm9yIGVhY2ggaW5kaXZpZHVhbCBjZWxsIHJlcHJlc2VudGluZyBhIHBhcnQgb2YgYSBzaGlwLCBcbi8vICAgLy8gYWRkIGEgY2xhc3MgbGlrZSBzaGlwLiR7c2hpcGxlbmd0aH0gdG8gZWFjaCBvZiB0aG9zZSBpbmRpdmlkdWFsIHBhcnRzLCBcbi8vICAgLy8gdGhlbiB3aGVuIHdlIGRyYWcgc3RhcnQsIFxuLy8gICAvLyB3ZSBjb3VsZCBzZWxlY3QgYWxsIHRob3NlIGluZGl2aWR1YWwgc2hpcCBwYXJ0cyAobWF5YmU/KSBhbmQgdXNlIHRoZSBkYXRhVHJhbnNmZXIuc2V0RGF0YSBmdW5jdGlvbiBvbiBpdD9cblxuLy8gICAvLyBvciBtYXliZSB3ZSBjb3VsZCBnZXQgdGhlIGRlZmF1bHQgaW1hZ2Ugc2hvd24gYW5kIG11bHRpcGx5IGl0IG9yIHNvbWV0aGluZ1xuLy8gfTtcblxuLy8gY29uc3QgZHJvcEV2ZW50SGFuZGxlciA9IChlKSA9PiB7XG4vLyAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgY29uc29sZS5sb2coXCJkcm9wcGVkXCIpO1xuLy8gICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4vLyAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gZGF0YTtcbi8vIH07XG5cbmV4cG9ydCB7IGRpc3BsYXlQbGF5ZXJHYW1lYm9hcmQsIGRpc3BsYXlFbmRHYW1lRGlzcGxheSwgZGlzcGxheU1vZGFsIH07XG5cbi8vIGFjY29yZGluZyB0byB3ZWJkZXYgc2ltcGxpZmllZCdzIHZpZGVvLCB0aGVyZSBhcmUgZHJhZyBhbmQgZHJvcCBldmVudHMsIHNvIGkgc2hvdWxkIGJlIGFibGUgdG8gZHJhZ1xuLy8gdGhlIHNoaXBzIGFuZCBkcm9wIHRoZW0gaW4gdGhlIGNvbnRhaW5lclxuLy8gc28gaSBuZWVkIHRvIGtub3cgaG93IGkgY2FuIGRpZmZlcmVudGlhdGUgZWFjaCBpbmRpdmlkdWFsIHNoaXBcbi8vIG1heWJlIGkgY2FuIG9ubHkgZHJhZyBhbmQgZHJvcCBhZnRlciBjbGlja2luZyBlYWNoIHNoaXAgb25jZSwgXG4vLyBzbyBjbGlja2luZyBpdCBvbmNlIGFsbG93cyBmb3IgZHJhZyBhbmQgZHJvcFxuLy8gYW5kIHRoYXQgY2xpY2sgd2lsbCBpZGVudGlmeSB0aGUgc2hpcCBieSBnb2luZyB0aHJvdWdoIHRoZSBzaGlwIGNvb3JkcyBhbmQgaWRlbnRpZnlpbmcgd2hpY2ggZWxlbWVudCBpdCBpc1xuLy8gYW5kIHRoZW4gd2hlbiB0aGV5J3JlIGRyYWdnaW5nIGFuZCBhYm91dCB0byBkcm9wLCBpdCBzaG91bGQgY2hlY2sgaWYgaXQgaXMgYSB2YWxpZCBjb29yZFxuLy8gaWYgaXQgaXMgdGhlbiBkcm9wIGl0LCBpZiBub3QgdGhlbiBwdXQgdGhlIHNoaXAgYmFjayB0byB3aGVyZSBpdCB3YXNcblxuLy8gd2hlbiBpbSB0cnlpbmcgdG8gZHJhZyBhbmQgZHJvcCwgdG8gYmUgYWJsZSB0byAnZHJhZycgYW5kICdkcm9wJyB0aGUgc2hpcCwgb25jZSBpIGNsaWNrL3N0YXJ0IGRyYWdnaW5nXG4vLyBpdCBzaG91bGQgZmluZCB0aGUgcmlnaHQgc2hpcCBpbiB0aGUgc2hpcCBjb29yZHNcbi8vIHNvIHRoYXQgd2hlbiBpIGRyb3AgaXQsIGl0IHdpbGwgZGlzcGxheSBjb3JyZWN0bHk7IGl0IHdpbGwgZGlzcGxheSB0aGUgY29ycmVjdCBzaGlwIGxlbmd0aFxuLy8gb25jZSBpIGZpbmQgdGhlIHJpZ2h0IHNoaXAgbGVuZ3RoIGZyb20gc3RhcnRpbmcgdGhlIGRyYWdcbi8vIHdoaWxlIGRyYWdnaW5nIGl0IG92ZXIsIGkgc2hvdWxkIGJlIGNoZWNrIGlmIGl0IGlzIGEgdmFsaWQgY29vcmRpbmF0ZSwgb25seSB0aGVuIGNhbiBpdCBiZSBkcm9wcGVkXG4vLyBvbmNlIGl0J3MgZHJvcHBlZCBpdCBzaG91bGQganVzdCBjaGFuZ2UgdGhlIGNvcnJlY3QgZWxlbWVudCBmcm9tIHRoZSBhcnJheSwgY2hhbmdlIHRoZSByb3cvY29sdW1uXG4vLyBhbmQgdGhlbiBzaW5jZSB3ZSdyZSB2YWxpZGluZyBjb29yZHMgYW5kIHBsYWNpbmcgc2hpcCwgaXQgc2hvdWxkIHBsYWNlIGl0IGNvcnJlY3RseVxuXG4vLyB1c2Ugc2V0RHJhZ0ltYWdlIGZ1bmN0aW9uIHRvIG1ha2UgaXQgbG9vayBsaWtlIHlvdSdyZSBkcmFnZ2ludCB0aGUgd2hvbGUgdGhpbmdcbi8vIGkgZmlyc3QgbmVlZCB0byB1bmRlcnN0YW5kIGVhY2ggZHJhZy9kcm9wIGV2ZW50IGFuZCB0aGVuIGZpZ3VyZSBvdXQgd2hhdCBpIG5lZWQgdG8gcHV0IGluIGVhY2ggb2YgdGhvc2VcblxuLy8gbG9vayBhdCBteSBub3RlcyBvbiBub3RlYm9vaywgSSBnb3QgdGhlIGRyYWdzdGFydCBkb25lIG5vdyBpIHRoaW5rXG4vLyBpIHNob3VsZCBpbXBsZW1lbnQgc2hvd2luZyBhbGwgdGhlIHNoaXAgYmVpbmcgZHJhZ2dlZCBidXQgcm5cbi8vIG9yIG1heWJlIGkgZG8gbmVlZCB0byB1c2UgdGhlIGRhdGFUcmFuc2Zlci5zZXREYXRhIHNvIHRoYXQgaXQga25vd3MgaG93ICdsb25nJyB0aGUgc2hpcCBpcz9cbi8vIGkgY2FuIGp1c3QgZm9jdXMgb24gZmlyc3QgZHJvcHBpbmcgdGhlIHRoaW5nIGkgYW0gZHJhZ2dpbmcsIGl0IG1pZ2h0IGJlIGVhc2llciBsYXRlciBvbiBpZiBpIGRvIHRoaXMgZmlyc3RcblxuLy8gZnJvbSBkcmFnIGFuZCBkcm9wIG1kbiBkb2NzXG4vLyBFYWNoIERhdGFUcmFuc2ZlciBvYmplY3QgY29udGFpbnMgYW4gaXRlbXMgcHJvcGVydHksIFxuLy8gd2hpY2ggaXMgYSBsaXN0IG9mIERhdGFUcmFuc2Zlckl0ZW0gb2JqZWN0cy4gXG4vLyBBIERhdGFUcmFuc2Zlckl0ZW0gb2JqZWN0IHJlcHJlc2VudHMgYSBzaW5nbGUgZHJhZyBpdGVtLCBlYWNoIHdpdGggYSBraW5kIHByb3BlcnR5IChlaXRoZXIgc3RyaW5nIG9yIGZpbGUpIFxuLy8gYW5kIGEgdHlwZSBwcm9wZXJ0eSBmb3IgdGhlIGRhdGEgaXRlbSdzIE1JTUUgdHlwZS4gXG4vLyBUaGUgRGF0YVRyYW5zZmVySXRlbSBvYmplY3QgYWxzbyBoYXMgbWV0aG9kcyB0byBnZXQgdGhlIGRyYWcgaXRlbSdzIGRhdGEuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgR2FtZS5jcmVhdGVOZXdHYW1lKCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==