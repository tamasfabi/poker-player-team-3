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
    // 5: "river"
    const hasPair = me.hasPocketPair();
    // const maxValue = me.highestPocketValue()
    const round = game.round();
    const maxBet = game.currentBuyIn() || 0;
    const currentScore = me.score();

    if (hasPair) {
      if (round === 0) {
        const newBet = (maxBet || 1) * currentScore;
      } else if (round === 3) {
        const newBet = (maxBet || 2) * currentScore;
      } else if (round === 4) {
        const newBet = (maxBet || 2) * currentScore;
      } else if (round === 5) {
        const newBet = (maxBet || 2) * currentScore;
      }
      bet(newBet);
    } else {
      bet(2);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;
