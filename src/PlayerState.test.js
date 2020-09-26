const PlayerState = require('./PlayerState');
const defaultGameState = require('./defaultGameState');

const buildPlayerStateWithDefaults = (state) => {
  return new PlayerState(Object.assign(defaultGameState.players[1], state));
}

const buildPlayerWithOffSuitCards = (rank1, rank2) => {
  return buildPlayerStateWithDefaults({
    "hole_cards": [
      {
          "rank": rank1,
          "suit": "hearts"
      },
      {
          "rank": rank2,
          "suit": "spades"
      }
    ]
  });
}

const buildPlayerWithOffSuitedCards = () => {
  return buildPlayerStateWithDefaults({
    "hole_cards": [
      {
          "rank": "6",
          "suit": "hearts"
      },
      {
          "rank": "K",
          "suit": "hearts"
      }
    ]
  });
}
        

test('Checks for pair correctly', () => {
  expect(buildPlayerWithOffSuitCards("A","9").hasPocketPair()).toBe(false);
  expect(buildPlayerWithOffSuitCards("3","9").hasPocketPair()).toBe(false);
  expect(buildPlayerWithOffSuitCards("A","K").hasPocketPair()).toBe(false);
  expect(buildPlayerWithOffSuitCards("A","A").hasPocketPair()).toBe(true);
  expect(buildPlayerWithOffSuitCards("4","4").hasPocketPair()).toBe(true);
});

test('Checks for suited correctly', () => {
  expect(buildPlayerWithOffSuitedCards().hasPocketSuited()).toBe(true);
  expect(buildPlayerWithOffSuitCards("A","A").hasPocketSuited()).toBe(false);
});

test('Finds highest value correctly', () => {
  expect(buildPlayerWithOffSuitCards("A","9").highestPocketValue()).toBe(14);
  expect(buildPlayerWithOffSuitCards("9","K").highestPocketValue()).toBe(13);
  expect(buildPlayerWithOffSuitCards("3","9").highestPocketValue()).toBe(9);
  expect(buildPlayerWithOffSuitCards("7","2").highestPocketValue()).toBe(7);
  expect(buildPlayerWithOffSuitCards("A","K").highestPocketValue()).toBe(14);
  expect(buildPlayerWithOffSuitCards("J","Q").highestPocketValue()).toBe(12);
  expect(buildPlayerWithOffSuitCards("J","J").highestPocketValue()).toBe(11);
  expect(buildPlayerWithOffSuitCards("4","4").highestPocketValue()).toBe(4);
});
