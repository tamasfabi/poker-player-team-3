const Card = require('./Card');

const buildCard = (rank, suit) => {
  return new Card({
     "rank": rank,
     "suit": suit
   });
};

const valueFor = (rank) => {
  return buildCard(rank, "spades").value();
};

const scoreFor = (rank) => {
  return buildCard(rank, "spades").score();
};

test('Calculates values correctly', () => {
  expect(valueFor("A")).toBe(14);
  expect(valueFor("K")).toBe(13);
  expect(valueFor("Q")).toBe(12);
  expect(valueFor("J")).toBe(11);
  expect(valueFor("10")).toBe(10);
  expect(valueFor("9")).toBe(9);
  expect(valueFor("2")).toBe(2);
});


test('Calculates score correctly', () => {
  expect(scoreFor("A")).toBe(10);
  expect(scoreFor("K")).toBe(8);
  expect(scoreFor("Q")).toBe(7);
  expect(scoreFor("J")).toBe(6);
  expect(scoreFor("10")).toBe(5);
  expect(scoreFor("9")).toBe(4.5);
  expect(scoreFor("3")).toBe(1.5);
});
