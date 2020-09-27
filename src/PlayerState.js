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
    return Math.max(...cards.map(c => c.value()));
  }
  
  pocketGap() {
    const cards = this.holeCards(); 
    return Math.abs(cards[0].value() - cards[1].value()) - 1;
  }
  
  score() {
    const cards = this.holeCards();
    var score = Math.max(...cards.map(c => c.score()));
    
    if(this.hasPocketPair()) {
      score = Math.max(5, score * 2);
    } else if(this.pocketGap() < 3) {
      score -= this.pocketGap();
    } else if(this.pocketGap() === 3) {
      score -= 4;
    } else {
      score -= 5;
    }
    
    if([0,1].includes(this.pocketGap()) && this.highestPocketValue() < 12) {
      score += 1;
    }
    
    if(this.hasPocketSuited()) score += 2;

    return Math.ceil(score);
  }
}

module.exports = PlayerState;
