const GameState = require("./src/GameState");

class Player {
  static get VERSION() {
    return "0.2";
  }

  static betRequest(gameState, bet) {
    var game = new GameState(gameState);
    const me = game.me();

    // ha parunk van
    if (me.hasPocketPair()) {
      bet(me.game.currentBuyIn() || 10);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;
