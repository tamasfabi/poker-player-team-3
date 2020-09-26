const Card = require('./Card');

class PlayerState {
  constructor(player) { this.player = player; }
  
  id() { return this.player.id; }
  name() { return this.player.name; }
  stack() { return this.player.stack; }
  status() { return this.player.status; }
  bet() { return this.player.bet; }
  holeCards() { return this.player.hole_cards.map(c => new Card(c)); }
  version() { return this.player.version; }
  
  hasPocketPair() { 
    const cards = this.holeCards();
    return cards[0].rank() === cards[1].rank();
  }
  
  hasPocketSuited() {
    const cards = this.holeCards();
    return cards[0].suit() === cards[1].suit();
  }
  
  highestPocketValue() {    
    const cards = this.holeCards(); 
    return Math.max(cards[0].value(), cards[1].value())
  }
}

module.exports = PlayerState;
