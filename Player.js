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
    const buyin = game.currentBuyIn() || 0;
    console.log({ buyin });
    const currentScore = me.score();
    console.log({ currentScore });
    const betBase = game.bigBlind() + currentScore;
    console.log(betBase)

    let newBet = 0;
    if (hasPair) {
      if (round === 0) {
        newBet += 10;
      } else if (round === 3) {
        newBet += 20;
      } else if (round === 4) {
        newBet += 30;
      } else if (round === 5) {
        newBet += 40;
      }
      newBet = newBet + betBase + buyin;
      console.log({ newBet });
      bet(newBet);
    } else {
      newBet = newBet + betBase + 2 + buyin;
      console.log({ newBet });
      bet(newBet);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;
