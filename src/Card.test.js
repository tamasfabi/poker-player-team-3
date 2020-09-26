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

const chenScoreFor = (rank) => {
  return buildCard(rank, "spades").chenScore();
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


test('Calculates Chen score correctly', () => {
  expect(chenScoreFor("A")).toBe(10);
  expect(chenScoreFor("K")).toBe(8);
  expect(chenScoreFor("Q")).toBe(7);
  expect(chenScoreFor("J")).toBe(6);
  expect(chenScoreFor("10")).toBe(5);
  expect(chenScoreFor("9")).toBe(4.5);
  expect(chenScoreFor("3")).toBe(1.5);
});
