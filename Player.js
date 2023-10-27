const GameState = require("./src/GameState");

class Player {
  static get VERSION() {
    return "0.3";
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
    console.log({ round });
    const maxBet = game.currentBuyIn() || 0;
    console.log({ maxBet });
    const currentScore = me.score();
    console.log({ currentScore });
    const betBase = game.bigBlind();
    console.log(betBase)

    let newBet = 0;
    if (hasPair) {
      if (round === 0) {
        newBet = maxBet || 10;
      } else if (round === 3) {
        newBet = maxBet || 20;
      } else if (round === 4) {
        newBet = maxBet || 30;
      } else if (round === 5) {
        newBet = maxBet || 40;
      }
      newBet = newBet + betBase;
      console.log({ newBet });
      bet(newBet);
    } else {
      newBet = newBet + betBase + 2;
      console.log({ newBet });
      bet(2);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;
