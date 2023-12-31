const GameState = require("./src/GameState");

const getTriple = (communityCards, myCards) => {
  console.log("communityCards", communityCards);
  console.log("myCards", myCards);
  const rankCounts = [...communityCards, ...myCards].reduce((acc, card) => {
    const rank = card.rank || card.rank();
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {});
  console.log({ rankCounts });
  const hasBigCard = Object.values(rankCounts).find((count) => count >= 3);
  console.log({ hasBigCard });
  return hasBigCard;
};

class Player {
  static get VERSION() {
    return "4.2";
  }

  static betRequest(gameState, bet) {
    var game = new GameState(gameState);
    const me = game.me();

    // bet(me.stack());
    // return;

    // 0: "pre flop",
    // 3: "flop",
    // 4: "turn",
    // 5: "river"
    const hasPair = me.hasPocketPair();
    const round = game.round();
    const buyin = game.currentBuyIn() || 0;
    const betBase = game.bigBlind();
    const communityCards = game.communityCards();
    const myCards = me.holeCards();
    console.log({ communityCards, myCards });

    const triple = getTriple(communityCards, myCards);
    if (triple) {
      bet(me.stack());
    }

    if (me.stack() > 6) {
      bet(me.stack());
    }
    if (hasPair) {
      bet(me.stack());
      // if (maxValue > 10) {
      //   bet(Math.max(buyin, me.stack() / 3));
      // } else {
      //   bet(Math.max(buyin, me.stack() / 5));
      // }
    } else {
      const score = me.score();
      console.log({ score });
      if (score > 6) {
        bet(me.stack());
      }
      bet(30);
    }
  }

  static showdown(gameState) {}
}

module.exports = Player;
