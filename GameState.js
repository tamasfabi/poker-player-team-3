const PlayerState = require('./PlayerState');

class GameState {
  constructor(gameState) {
    this.gameState = gameState;
  }
  
  tournamentId() { return this.gameState.tournament_id; }
  gameId() { return this.gameState.game_id; }
  round() { return this.gameState.round; }
  betIndex() { return this.gameState.bet_index; }
  smallBlind() { return this.gameState.small_blind; }
  bigBlind() { return this.gameState.small_blind * 2; }
  currentBuyIn() { return this.gameState.current_buy_in; }
  pot() { return this.gameState.pot; }
  minimumRaise() { return this.gameState.minimum_raise; }
  dealer() { return this.gameState.dealer; }
  orbits() { return this.gameState.orbits; }
  myId() { return this.gameState.in_action; }
  
  players() { return this.gameState.players.map(p => new PlayerState(p)); }
  communityCards() { return this.gameState.community_cards.map(c => new Card(c)); }
  
  me() {
    return new PlayerState(this.gameState.players[this.gameState.in_action]);
  }
  
  toCall() { return this.currentBuyIn - this.me().bet; }
  toRaise() { return this.toCall() + this.minimumRaise(); }
  
}

module.exports = GameState;