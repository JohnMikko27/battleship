import displayPlayerGameboard from "./modules/ui";
import Game from "./modules/game";

window.addEventListener("load", () => {
  Game.createNewGame();
  displayPlayerGameboard(Game.getPlayer1().getBoard());
});
