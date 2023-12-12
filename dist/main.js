/** *** */ (() => { // webpackBootstrap
/** *** */ 	


  /** *** */ 	const __webpack_modules__ = ({

    /***/ "./src/modules/game.js":
    /*! *****************************!*\
  !*** ./src/modules/game.js ***!
  \**************************** */
    /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
        /* harmony export */ });
      /* harmony import */ const _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
      /* harmony import */ const _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
      /* harmony import */ const _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
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
          gameboard1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)();
          gameboard2 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.default)();
          player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)("John", gameboard1);
          player2 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.player)("Michael", gameboard2);
        };

        return { createNewGame, getPlayer1, getPlayer2 };
      })();

      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

      /***/ }),

    /***/ "./src/modules/gameboard.js":
    /*! **********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \********************************* */
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
    /*! *******************************!*\
  !*** ./src/modules/player.js ***!
  \****************************** */
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
    /*! *****************************!*\
  !*** ./src/modules/ship.js ***!
  \**************************** */
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
    /*! ***************************!*\
  !*** ./src/modules/ui.js ***!
  \************************** */
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

    /** *** */ 	});
  /** ********************************************************************* */
  /** *** */ 	// The module cache
  /** *** */ 	const __webpack_module_cache__ = {};
  /** *** */ 	
  /** *** */ 	// The require function
  /** *** */ 	function __webpack_require__(moduleId) {
    /** *** */ 		// Check if module is in cache
    /** *** */ 		const cachedModule = __webpack_module_cache__[moduleId];
    /** *** */ 		if (cachedModule !== undefined) {
      /** *** */ 			return cachedModule.exports;
      /** *** */ 		}
    /** *** */ 		// Create a new module (and put it into the cache)
    /** *** */ 		const module = __webpack_module_cache__[moduleId] = {
      /** *** */ 			// no module.id needed
      /** *** */ 			// no module.loaded needed
      /** *** */ 			exports: {}
      /** *** */ 		};
    /** *** */ 	
    /** *** */ 		// Execute the module function
    /** *** */ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /** *** */ 	
    /** *** */ 		// Return the exports of the module
    /** *** */ 		return module.exports;
    /** *** */ 	}
  /** *** */ 	
  /** ********************************************************************* */
  /** *** */ 	/* webpack/runtime/define property getters */
  /** *** */ 	(() => {
    /** *** */ 		// define getter functions for harmony exports
    /** *** */ 		__webpack_require__.d = (exports, definition) => {
      /** *** */ 			for(const key in definition) {
        /** *** */ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /** *** */ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /** *** */ 				}
        /** *** */ 			}
      /** *** */ 		};
    /** *** */ 	})();
  /** *** */ 	
  /** *** */ 	/* webpack/runtime/hasOwnProperty shorthand */
  /** *** */ 	(() => {
    /** *** */ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
    /** *** */ 	})();
  /** *** */ 	
  /** *** */ 	/* webpack/runtime/make namespace object */
  /** *** */ 	(() => {
    /** *** */ 		// define __esModule on exports
    /** *** */ 		__webpack_require__.r = (exports) => {
      /** *** */ 			if(typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /** *** */ 				Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
        /** *** */ 			}
      /** *** */ 			Object.defineProperty(exports, "__esModule", { value: true });
      /** *** */ 		};
    /** *** */ 	})();
  /** *** */ 	
  /** ********************************************************************* */
  const __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*! **********************!*\
  !*** ./src/index.js ***!
  \********************* */
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ const _modules_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ui */ "./src/modules/ui.js");
    /* harmony import */ const _modules_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");



    window.addEventListener("load", () => {
      _modules_game__WEBPACK_IMPORTED_MODULE_1__.default.createNewGame();
      (0,_modules_ui__WEBPACK_IMPORTED_MODULE_0__.default)(_modules_game__WEBPACK_IMPORTED_MODULE_1__.default.getPlayer1().getBoard());
    });

  })();

/** *** */ })()
;
// # sourceMappingURL=data:application/json;charset=utf-8;base64,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cGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFxuICogQXQgdGhpcyBwb2ludCBpdCBpcyBhcHByb3ByaWF0ZSB0byBiZWdpbiBjcmFmdGluZyB5b3VyIFVzZXIgSW50ZXJmYWNlLlxuICogVGhlIGdhbWUgbG9vcCBzaG91bGQgc2V0IHVwIGEgbmV3IGdhbWUgYnkgY3JlYXRpbmcgUGxheWVycyBhbmQgR2FtZWJvYXJkcy4gXG4gKiBGb3Igbm93IGp1c3QgcG9wdWxhdGUgZWFjaCBHYW1lYm9hcmQgd2l0aCBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzLiBcbiAqIFlvdSBhcmUgZ29pbmcgdG8gaW1wbGVtZW50IGEgc3lzdGVtIGZvciBhbGxvd2luZyBwbGF5ZXJzIHRvIHBsYWNlIHRoZWlyIHNoaXBzIGxhdGVyLlxuICogV2XigJlsbCBsZWF2ZSB0aGUgSFRNTCBpbXBsZW1lbnRhdGlvbiB1cCB0byB5b3UgZm9yIG5vdywgXG4gKiBidXQgeW91IHNob3VsZCBkaXNwbGF5IGJvdGggdGhlIHBsYXllcuKAmXMgYm9hcmRzIGFuZCByZW5kZXIgdGhlbSB1c2luZyBpbmZvcm1hdGlvbiBcbiAqIGZyb20gdGhlIEdhbWVib2FyZCBjbGFzcy9mYWN0b3J5LlxuICogWW91IG5lZWQgbWV0aG9kcyB0byByZW5kZXIgdGhlIGdhbWVib2FyZHMgYW5kIHRvIHRha2UgdXNlciBpbnB1dCBmb3IgYXR0YWNraW5nLlxuICogRm9yIGF0dGFja3MsIGxldCB0aGUgdXNlciBjbGljayBvbiBhIGNvb3JkaW5hdGUgaW4gdGhlIGVuZW15IEdhbWVib2FyZC5cbiAqIFRoZSBnYW1lIGxvb3Agc2hvdWxkIHN0ZXAgdGhyb3VnaCB0aGUgZ2FtZSB0dXJuIGJ5IHR1cm4gdXNpbmcgb25seSBtZXRob2RzIGZyb20gb3RoZXIgb2JqZWN0cy4gXG4gKiBJZiBhdCBhbnkgcG9pbnQgeW91IGFyZSB0ZW1wdGVkIHRvIHdyaXRlIGEgbmV3IGZ1bmN0aW9uIGluc2lkZSB0aGUgZ2FtZSBsb29wLCBzdGVwIGJhY2sgYW5kIGZpZ3VyZSBvdXQgd2hpY2ggY2xhc3Mgb3IgbW9kdWxlIHRoYXQgZnVuY3Rpb24gc2hvdWxkIGJlbG9uZyB0by5cbiAqIENyZWF0ZSBjb25kaXRpb25zIHNvIHRoYXQgdGhlIGdhbWUgZW5kcyBvbmNlIG9uZSBwbGF5ZXLigJlzIHNoaXBzIGhhdmUgYWxsIGJlZW4gc3Vuay4gXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGFwcHJvcHJpYXRlIGZvciB0aGUgR2FtZSBtb2R1bGUuXG4gKiBcbiAqL1xuXG4vLyBjcmVhdGUgYSBuZXcgZ2FtZSBieSBjcmVhdGluZyBwbGF5ZXJzIGFuZCBnYW1lYm9hcmRzIChhbmQgcHJvYmFibHkgc2hpcHMgYWxzbywganVzdCBmb3Igbm93LCB3aGlsZSB0ZXN0aW5nKVxuLy8gYWRkIHRoZSBzaGlwcyB0byB0aGUgZ2FtZWJvYXJkcyBpbiBwcmVkZXRlcm1pbmVkIGNvb3JkaW5hdGVzXG4vLyBkaXNwbGF5IGJvdGggcGxheWVyJ3MgYm9hcmRzIGFuZCByZW5kZXIgdGhlbSB1c2luZyBpbmZvcm1hdGlvbiBmcm9tIHRoZSBnYW1lYm9hcmQgZmFjdG9yeVxuXG5pbXBvcnQgeyBwbGF5ZXIsIGNvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuXG5jb25zdCBHYW1lID0gKCgpID0+IHtcbiAgbGV0IHBsYXllcjE7XG4gIGxldCBwbGF5ZXIyO1xuICBsZXQgZ2FtZWJvYXJkMTtcbiAgbGV0IGdhbWVib2FyZDI7XG5cbiAgY29uc3QgZ2V0UGxheWVyMSA9ICgpID0+IHBsYXllcjE7XG4gIGNvbnN0IGdldFBsYXllcjIgPSAoKSA9PiBwbGF5ZXIyO1xuICAvLyB3aWxsIHByb2JhYmx5IGhhdmUgdG8gYWRkIG5hbWUgcGFyYW1ldGVycyBsYXRlciBzbyB0aGF0IHBsYXllcnMgY2FuIHNldCB0aGVpciBuYW1lc1xuICBjb25zdCBjcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgIGdhbWVib2FyZDEgPSBHYW1lYm9hcmQoKTtcbiAgICBnYW1lYm9hcmQyID0gR2FtZWJvYXJkKCk7XG4gICAgcGxheWVyMSA9IHBsYXllcihcIkpvaG5cIiwgZ2FtZWJvYXJkMSk7XG4gICAgcGxheWVyMiA9IHBsYXllcihcIk1pY2hhZWxcIiwgZ2FtZWJvYXJkMik7XG4gIH07XG5cbiAgcmV0dXJuIHsgY3JlYXRlTmV3R2FtZSwgZ2V0UGxheWVyMSwgZ2V0UGxheWVyMiB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IFtdO1xuICBjb25zdCBzaGlwc0Nvb3JkaW5hdGVzID0gW107XG4gIGNvbnN0IG1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiBnYW1lYm9hcmQ7XG5cbiAgY29uc3QgZ2V0TWlzc2VkQXR0YWNrcyA9ICgpID0+IG1pc3NlZEF0dGFja3M7XG5cbiAgY29uc3QgY3JlYXRlR2FtZWJvYXJkID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgcm93LnB1c2goXCItXCIpO1xuICAgICAgfVxuICAgICAgZ2FtZWJvYXJkLnB1c2gocm93KTtcbiAgICB9XG4gIH07XG4gIGNyZWF0ZUdhbWVib2FyZCgpO1xuXG4gIC8vIG5lZWQgdG8gYWRkIGNvbmRpdGlvbmFscyB0byBjaGVjayBpZiBzaGlwcyBnbyBvdXQgb2YgcGFnZVxuICAvLyBhbHNvIGZvciBybiwgc2hpcHMgYXJlIG9ubHkgcGxhY2VkIGhvcml6b250YWxseVxuICBjb25zdCBwbGFjZVNoaXAgPSAocm93LCBjb2x1bW4sIHNoaXApID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgZ2FtZWJvYXJkW3Jvd11bY29sdW1uK2ldID0gXCJvXCI7XG4gICAgfVxuICAgXG4gICAgc2hpcHNDb29yZGluYXRlcy5wdXNoKHtyb3csIGNvbHVtbiwgc2hpcH0pOyBcbiAgfTtcblxuICAvLyBmb3IgdmlzdWFsaXphdGlvbiBwdXJwb3Nlc1xuICBjb25zdCBwcmludEdhbWVib2FyZCA9ICgpID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBnYW1lYm9hcmQuZm9yRWFjaCgocm93KSA9PiB7XG4gICAgICByb3cuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICByZXN1bHQgKz0gZWxlbWVudDtcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgIHJlc3VsdCA9IFwiXCI7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGlmIChnYW1lYm9hcmRbcm93XVtjb2x1bW5dID09PSBcIm9cIikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwc0Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHNoaXBzQ29vcmRpbmF0ZXNbaV07XG4gICAgICAgIGlmIChyb3cgPT09IG9iai5yb3cgJiYgKGNvbHVtbiA+PSBvYmouY29sdW1uICYmIGNvbHVtbiA8IG9iai5jb2x1bW4gKyBvYmouc2hpcC5nZXRMZW5ndGgoKSkpIHtcbiAgICAgICAgICBnYW1lYm9hcmRbcm93XVtjb2x1bW5dID0gXCJ4XCI7XG4gICAgICAgICAgb2JqLnNoaXAuaGl0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgbWlzc2VkQXR0YWNrcy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICB9O1xuXG4gIGNvbnN0IGFyZUFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc2hpcHNTdW5rID0gMDtcbiAgICAvLyBzZWUgaWYgeW91IGNhbiBjaGFuZ2UgdGhpcyB0byBhIHJlZHVjZSBmdW5jdGlvblxuICAgIHNoaXBzU3VuayA9IHNoaXBzQ29vcmRpbmF0ZXMucmVkdWNlKCAoYWNjLCBjdXIpID0+IHtcbiAgICAgIGlmIChjdXIuc2hpcC5pc1N1bmsoKSkgcmV0dXJuIGFjYyArIDE7XG4gICAgICByZXR1cm4gYWNjICsgMDtcbiAgICB9LCAwKTtcbiAgICBcbiAgICBcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzQ29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAvLyAgIGlmIChzaGlwc0Nvb3JkaW5hdGVzW2ldLnNoaXAuaXNTdW5rKCkpIHtcbiAgICAvLyAgICAgc2hpcHNTdW5rKys7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIGNvbnNvbGUubG9nKHNoaXBzU3Vuayk7XG4gICAgcmV0dXJuIHNoaXBzU3VuayA9PT0gc2hpcHNDb29yZGluYXRlcy5sZW5ndGg7XG4gIH07XG5cbiAgLy8gSSB0aGluayBJIGhhdmUgdG8gdGVzdCBwbGFjZXNoaXAsIHJlY2VpdmVBdHRhY2ssIGFuZCBhcmVBbGxTaGlwcyBzdW5rIFxuICAvLyBhdCBsZWFzdCB3aGljaGV2ZXIgZnVuY3Rpb25zIHdpbGwgdWx0aW1hdGVseSBiZSB1c2VkIHdpdGggb3RoZXIgZnVudGlvbnMgbGlrZSBzaGlwIGZ1bmN0aW9uXG4gIHJldHVybiB7IGNyZWF0ZUdhbWVib2FyZCwgZ2V0R2FtZWJvYXJkLCBwbGFjZVNoaXAsIHByaW50R2FtZWJvYXJkLCByZWNlaXZlQXR0YWNrLCBnZXRNaXNzZWRBdHRhY2tzLCBhcmVBbGxTaGlwc1N1bmsgfTtcbn1cblxuLy8gaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xuLy8gY29uc3QgZyA9IEdhbWVib2FyZCgpO1xuLy8gY29uc3Qgc2hpcDEgPSBTaGlwKDMpO1xuLy8gY29uc3Qgc2hpcDIgPSBTaGlwKDMpO1xuXG4vLyBnLnBsYWNlU2hpcCgzLCAzLCBzaGlwMSk7XG4vLyBnLnBsYWNlU2hpcCg0LCAzLCBzaGlwMik7XG5cbi8vIGcucHJpbnRHYW1lYm9hcmQoKTtcbi8vIGcucmVjZWl2ZUF0dGFjaygzLDQpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDMsMyk7XG4vLyBnLnJlY2VpdmVBdHRhY2soMyw1KTtcbi8vIGcucmVjZWl2ZUF0dGFjaygzLDYpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDYsOSk7XG5cbi8vIGcucmVjZWl2ZUF0dGFjayg0LDMpO1xuLy8gZy5yZWNlaXZlQXR0YWNrKDQsNCk7XG4vLyBnLnJlY2VpdmVBdHRhY2soNCw1KTtcblxuXG4vLyBnLnByaW50R2FtZWJvYXJkKCk7XG4vLyBjb25zb2xlLmxvZyhzaGlwMS5pc1N1bmsoKSk7XG4vLyBjb25zb2xlLmxvZyhzaGlwMi5pc1N1bmsoKSk7XG5cbi8vIGNvbnNvbGUubG9nKGcuZ2V0TWlzc2VkQXR0YWNrcygpKTtcbi8vIGNvbnNvbGUubG9nKGcuYXJlQWxsU2hpcHNTdW5rKCkpO1xuIiwiLypcbiAqXG4gKiBQbGF5ZXJzIGNhbiB0YWtlIHR1cm5zIHBsYXlpbmcgdGhlIGdhbWUgYnkgYXR0YWNraW5nIHRoZSBlbmVteSBHYW1lYm9hcmQuXG4gKiBUaGUgZ2FtZSBpcyBwbGF5ZWQgYWdhaW5zdCB0aGUgY29tcHV0ZXIsIHNvIG1ha2UgdGhlIOKAmGNvbXB1dGVy4oCZIGNhcGFibGUgb2YgbWFraW5nIHJhbmRvbSBwbGF5cy4gXG4gKiBUaGUgQUkgZG9lcyBub3QgaGF2ZSB0byBiZSBzbWFydCwgYnV0IGl0IHNob3VsZCBrbm93IHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbW92ZSBpcyBsZWdhbFxuICogIChpLmUuIGl0IHNob3VsZG7igJl0IHNob290IHRoZSBzYW1lIGNvb3JkaW5hdGUgdHdpY2UpLlxuICogICBcbiAqL1xuXG5cbmNvbnN0IHBsYXllciA9IChuYW1lLCBnYW1lYm9hcmQpID0+IHtcbiAgY29uc3QgcGxheWVyTmFtZSA9IG5hbWU7XG4gIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkO1xuICBcbiAgY29uc3QgZ2V0UGxheWVyTmFtZSA9ICgpID0+IHBsYXllck5hbWU7XG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgcmV0dXJuIHsgZ2V0UGxheWVyTmFtZSwgZ2V0Qm9hcmR9O1xufTtcblxuLy8gbWlnaHQgbmVlZCBhIHBsYWNlQWxsc2hpcHMgYXQgcmFuZG9tIHBsYWNlcyBmdW5jdGlvbiwgb3Igc2hvdWxkIHRoaXMgYmUgaW4gZ2FtZWJvYXJkP1xuY29uc3QgY29tcHV0ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNob3RzID0gW107XG4gIFxuICBjb25zdCBnZXRTaG90cyA9ICgpID0+IHNob3RzO1xuXG4gIGNvbnN0IGhhc1Nob3RCZWZvcmUgPSAocm93LCBjb2x1bW4pID0+IHtcbiAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgIHNob3RzLmZvckVhY2goKHNob3QpID0+IHtcbiAgICAgIGlmIChzaG90WzBdID09PSByb3cgJiYgc2hvdFsxXSA9PT0gY29sdW1uKSB7XG4gICAgICAgIGZsYWcgPSAgdHJ1ZTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIGZsYWc7XG4gIH07XG4gIFxuICBjb25zdCBjaG9vc2VSYW5kb21TaG90ID0gKCkgPT4ge1xuICAgIGxldCByZXR1cm5WYWx1ZSA9IG51bGw7XG4gICAgY29uc3Qgcm93ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGNvbnN0IGNvbHVtbiA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBcbiAgICBpZiAoIWhhc1Nob3RCZWZvcmUocm93LCBjb2x1bW4pKSB7XG4gICAgICBzaG90cy5wdXNoKFtyb3csIGNvbHVtbl0pO1xuICAgICAgcmV0dXJuVmFsdWUgPSB7IHJvdywgY29sdW1uIH07XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgfTtcblxuICByZXR1cm4geyBnZXRTaG90cywgY2hvb3NlUmFuZG9tU2hvdCwgfTtcbn07XG5cblxuLy8gY29uc29sZS5sb2coYy5jaG9vc2VSYW5kb21TaG90KCkpO1xuXG4vLyBjb25zb2xlLmxvZyhjLmdldFNob3RzKCkpO1xuZXhwb3J0IHtwbGF5ZXIsIGNvbXB1dGVyfTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuICBjb25zdCBsZW5ndGhPZlNoaXAgPSBsZW5ndGg7XG4gIGxldCBudW1PZkhpdHMgPSAwO1xuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aE9mU2hpcDtcbiAgLy8gZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgY29uc3QgZ2V0TnVtT2ZIaXRzID0gKCkgPT4gbnVtT2ZIaXRzO1xuXG4gIGNvbnN0IGhpdCA9ICgpID0+IHtcbiAgICBudW1PZkhpdHMrKztcbiAgfTtcblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiAobGVuZ3RoT2ZTaGlwIC0gbnVtT2ZIaXRzKSA9PT0gMDtcblxuICByZXR1cm4geyBoaXQsIGlzU3VuaywgZ2V0TGVuZ3RoLCBnZXROdW1PZkhpdHMgfTtcbn1cbiIsIi8vIG5lZWQgYSBmdW5jdGlvbiB0aGF0IGdldHMgYSBnYW1lYm9hcmQgYW5kIGRpc3BsYXlzIHdoZXJlIHRoZSBzaGlwcyBhcmUgYW5kIHdoZXJlIGl0IGhhcyBiZWVuIGhpdFxuXG5jb25zdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkID0gKGdhbWVib2FyZCkgPT4ge1xuICBjb25zdCBsZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0XCIpO1xuICAvLyBjbGVhcnMgaXQgZmlyc3QgdGhlbiBhZGRzIHRoZSBnYW1lYm9hcmQgdG8gcHJldmVudCBkdXBsaWNhdGlvblxuICBsZWZ0LnRleHRDb250ZW50ID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0R2FtZWJvYXJkKCkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZWJvYXJkLmdldEdhbWVib2FyZCgpW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAvLyBjaGVjayBpZiBlYWNoIGdhbWVib2FyZFtpXVtqXSBjZWxsIGhhcyBhIHNoaXAsIGhhcyBhIG1pc3NlZCBhdHRhY2ssIG9yIGhhcyBoaXQgYSBzaGlwXG4gICAgICAvLyBpZiBzbyBpIGNvdWxkIGFkZCBkaWZmZXJlbnQgY2xhc3NlcyB0byBkaWZmZXJlbnRpYXRlIHRoZSBjZWxsIGZyb20gZGlmZmVyZW50IGNlbGxzXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICAgIGxlZnQuYXBwZW5kQ2hpbGQocm93KTtcbiAgfVxufTtcblxuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkO1xuLy8gZXhwb3J0IHsgZGlzcGxheVBsYXllckdhbWVib2FyZCwgfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBkaXNwbGF5UGxheWVyR2FtZWJvYXJkIGZyb20gXCIuL21vZHVsZXMvdWlcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL21vZHVsZXMvZ2FtZVwiO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xuICBHYW1lLmNyZWF0ZU5ld0dhbWUoKTtcbiAgZGlzcGxheVBsYXllckdhbWVib2FyZChHYW1lLmdldFBsYXllcjEoKS5nZXRCb2FyZCgpKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9