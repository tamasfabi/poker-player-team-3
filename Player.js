const GameState = require("./src/GameState");

class Player {
  static get VERSION() {
    return "0.2";
  }

  static betRequest(gameState, bet) {
    var game = new GameState(gameState);
    const me = game.me();

    // 0: "pre flop",
    // 3: "flop",
    // 4: "turn",
    // 5: "river"]
    const hasPair = me.hasPocketPair()
    const round = game.round();
    const maxBet = game.currentBuyIn()
    if (round === 0) {
      if (hasPair) {
        bet((maxBet || 10));
      }
    } else if (round === 3) {
      if (hasPair) {
        bet((maxBet || 20));
      }
    } else if (round === 4) {
      if (hasPair) {
        bet((maxBet || 30));
      }
    } else if (round === 5) {
      if (hasPair) {
        bet((maxBet || 30));
      }
    }
    // ha parunk van
  }

  static showdown(gameState) {}
}

module.exports = Player;
