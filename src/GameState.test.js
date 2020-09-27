const GameState = require('./GameState');
const PlayerState = require('./PlayerState');
const defaultGameState = require('./defaultGameState');

const buildGameStateWithDefaults = (state) => {
  return new GameState(Object.assign(defaultGameState, state));
}

test('Selects current player correctly', () => {
  expect(buildGameStateWithDefaults({}).me().name()).toBe("Bob");
});


test('Minimum call value calculated correctly', () => {
  expect(buildGameStateWithDefaults({}).toCall()).toBe(240);
});


test('Minimum raise value calculated correctly', () => {
  expect(buildGameStateWithDefaults({}).toRaise()).toBe(480);
});

test('Raise by blinds', () => {
  expect(buildGameStateWithDefaults({}).toRaiseByBlinds(2)).toBe(520);
});

test('Suit counts', () => {
  expect(buildGameStateWithDefaults({}).suitCounts()).toEqual({
       "clubs": {
         "community": 1,
         "hole": 0,
         "total": 1,
       },
       "diamonds": {
         "community": 1,
         "hole": 0,
         "total": 1,
       },
       "hearts": {
         "community": 1,
         "hole": 1,
         "total": 2,
       },
       "spades": {
         "community": 2,
         "hole": 1,
         "total": 3,
       },
     });
});

test('Rank counts', () => {
  expect(buildGameStateWithDefaults({}).rankCounts()['A']).toEqual({
    "community": 2,
    "hole": 0,
    "total": 2,
   });
  expect(buildGameStateWithDefaults({}).rankCounts()['K']).toEqual({
    "community": 0,
    "hole": 1,
    "total": 1,
   });
  expect(buildGameStateWithDefaults({}).rankCounts()['6']).toEqual({
    "community": 2,
    "hole": 1,
    "total": 3,
   });
  expect(buildGameStateWithDefaults({}).rankCounts()['2']).toEqual({
    "community": 0,
    "hole": 0,
    "total": 0,
   });
});

test('Betting round', () => {
  const cards = defaultGameState.community_cards;
  
  expect(buildGameStateWithDefaults({
    "community_cards": []
  }).bettingRound()).toBe("pre flop");
  
  expect(buildGameStateWithDefaults({
    "community_cards": cards.slice(0,3)
  }).bettingRound()).toBe("flop");
  
  expect(buildGameStateWithDefaults({
    "community_cards": cards.slice(0,4)
  }).bettingRound()).toBe("turn");
  
  expect(buildGameStateWithDefaults({
    "community_cards": cards
  }).bettingRound()).toBe("river");
});


test('Betting position', () => {
  expect(buildGameStateWithDefaults({
    "dealer": 2,
    "in_action": 0
  }).bettingPosition()).toBe(1);
  
  expect(buildGameStateWithDefaults({
    "dealer": 2,
    "in_action": 1
  }).bettingPosition()).toBe(2);
  
  expect(buildGameStateWithDefaults({
    "dealer": 0,
    "in_action": 1
  }).bettingPosition()).toBe(1);
});

test('Active players in game', () => {
  expect(buildGameStateWithDefaults({
    "players": []
  }).activePlayersInGame()).toEqual([])
  
  expect(buildGameStateWithDefaults({
    "players": [      
      {
          "id": 0,
          "status": "active",
      }
    ]
  }).activePlayersInGame()).toEqual([
      new PlayerState({
          "id": 0,
          "status": "active",
      })
  ])  
  
  expect(buildGameStateWithDefaults({
    "players": [      
      {
          "id": 0,
          "status": "folded",
      }
    ]
  }).activePlayersInGame()).toEqual([
      new PlayerState({
          "id": 0,
          "status": "folded",
      })
  ])
  
  expect(buildGameStateWithDefaults({
    "players": [      
      {
          "id": 0,
          "status": "out",
      }
    ]
  }).activePlayersInGame()).toEqual([])
  
});


test('Active players in hand', () => {
  expect(buildGameStateWithDefaults({
    "players": []
  }).activePlayersInHand()).toEqual([])
  
  expect(buildGameStateWithDefaults({
    "players": [      
      {
          "id": 0,
          "status": "active",
      }
    ]
  }).activePlayersInHand()).toEqual([
      new PlayerState({
          "id": 0,
          "status": "active",
      })
  ])  
  
  expect(buildGameStateWithDefaults({
    "players": [      
      {
          "id": 0,
          "status": "folded",
      }
    ]
  }).activePlayersInHand()).toEqual([])
  
  expect(buildGameStateWithDefaults({
    "players": [      
      {
          "id": 0,
          "status": "out",
      }
    ]
  }).activePlayersInHand()).toEqual([])
  
});