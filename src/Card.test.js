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

test('Calculates values correctly', () => {
  expect(valueFor("A")).toBe(14);
  expect(valueFor("K")).toBe(13);
  expect(valueFor("Q")).toBe(12);
  expect(valueFor("J")).toBe(11);
  expect(valueFor("10")).toBe(10);
  expect(valueFor("9")).toBe(9);
  expect(valueFor("2")).toBe(2);
});