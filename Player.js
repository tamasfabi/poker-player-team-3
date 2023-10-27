const GameState = require("./src/GameState");

const getTriple = (communityCards, myCards) => {
  const rankCounts = [...communityCards, ...myCards].reduce((acc, card) => {
    const rank = card.rank || card.rank();
    acc[rank] = (acc[rank] || 0) + 1;
    return rankCounts;
  }, {});
  const hasBigCard = Object.values(rankCounts).find((count) => count >= 3);
  return hasBigCard;
};

class Player {
  static get VERSION() {
    return "0.5";
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
    const buyin = game.currentBuyIn() || 0;
    const currentScore = me.score();
    const betBase = game.bigBlind() + currentScore;
    const communityCards = game.communityCards();
    const myCards = me.holeCards();
    console.log({ communityCards });
    console.log({ myCards });

    if (round >= 3) {
      const triple = getTriple(communityCards, myCards);
      if (triple) {
        bet(me.stack());
      }
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
