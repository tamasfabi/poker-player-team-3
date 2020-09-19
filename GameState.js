const PlayerState = require('./PlayerState');

class GameState {
  constructor(gameState) {
    this.gameState = gameState;
  }
  
  me() {
    return new PlayerState(this.gameState.players[this.gameState.in_action]);
  }
}

module.exports = GameState;