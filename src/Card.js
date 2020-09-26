class Card {
  constructor(card) {
    this.card = card;
  }
  
  rank() { return this.card.rank; }
  suit() { return this.card.suit; }
  
  value() { 
    if(['J','Q','K','A'].includes(this.card.rank)) {
      return ['J','Q','K','A'].indexOf(this.card.rank) + 11;
    } else {
      return parseInt(this.card.rank);
    }
  }
}

module.exports = Card;