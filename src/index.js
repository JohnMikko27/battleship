import displayPlayerGameboard from "./modules/ui";
import Game from "./modules/game";

window.addEventListener("load", () => {
  Game.createNewGame();
  displayPlayerGameboard(Game.getPlayer1(), Game.getPlayer1().getBoard());
  displayPlayerGameboard(Game.getPlayer2(), Game.getPlayer2().getBoard());
  Game.playGame();
});
