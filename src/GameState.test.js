const GameState = require('./GameState');
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