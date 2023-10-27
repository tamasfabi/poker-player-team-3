const GameState = require("./src/GameState");

class Player {
  static get VERSION() {
    return "0.1";
  }

  static betRequest(gameState, bet) {
    var game = new GameState(gameState);
    const me = game.me();
    if (me.hasPocketPair()) {
      bet(me.highestPocketValue());
    }
    bet(0)
    // console.log('ok');
    // if (communityCards[0]) {
    //   console.log(communityCards);
    // }
    // bet(0);
  }

  static showdown(gameState) {}
}

module.exports = Player;
