const GameState = require("./src/GameState");

const getTriple = (communityCards, myCards) => {
  const rankCounts = communityCards.reduce((acc, card) => {
    const rank = card.rank();
    acc[rank] = (acc[rank] || 0) + 1;
    console.log({ rankCounts });
    return rankCounts;
  }, {});
};

class Player {
  static get VERSION() {
    return "0.4";
  }

  static betRequest(gameState, bet) {
    var game = new GameState(gameState);
    const me = game.me();

    // 0: "pre flop",
    // 3: "flop",
    // 4: "turn",
    // 5: "river"
    const hasPair = me.hasPocketPair();
    const maxValue = me.highestPocketValue();
    const round = game.round();
    console.log({ round });
    const buyin = game.currentBuyIn() || 0;
    console.log({ buyin });
    const currentScore = me.score();
    console.log({ currentScore });
    const betBase = game.bigBlind() + currentScore;
    console.log(betBase);
    const communityCards = game.communityCards();
    const myCards = me.card();
    console.log({ myCards });

    if (round >= 3) {
      const triple = getTriple(communityCards, myCards);
      console.log({ triple });
    }

    if (hasPair) {
      if (maxValue > 10) {
        bet(me.stack());
      } else {
        bet(me.stack() / 3);
      }
    } else {
      bet(30);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;
