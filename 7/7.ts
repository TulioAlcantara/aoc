import { readInput } from '../utils';

const order = '23456789TJQKA';
const order2 = 'J23456789TQKA';

const getTypeWeight = (cards: string[], secondPart: boolean) => {
  const counts = new Map();
  let jokerCount = 0;
  for (const card of cards) {
    if (secondPart && card === 'J') {
      jokerCount++;
      continue;
    }
    counts.set(card, (counts.get(card) || 0) + 1);
  }
  const orderedCounts = Array.from(counts).sort((a, b) => b[1] - a[1]);

  if (orderedCounts.length == 0 || orderedCounts.length == 1) {
    return 120;
  }

  if (secondPart && jokerCount) {
    orderedCounts[0][1] += jokerCount;
  }

  const firstCount = orderedCounts[0][1];
  const secondCount = orderedCounts[1][1];
  if (firstCount === 4) return 100;
  if (firstCount === 3 && secondCount === 2) return 80;
  if (firstCount === 3) return 60;
  if (firstCount === 2 && secondCount === 2) return 40;
  if (firstCount === 2) return 20;
  return 0;
};

const orderGames = (games: string[][], secondPart: boolean) => {
  return games.sort((a, b) => {
    const cardsA = a[0].split('');
    const cardsB = b[0].split('');

    for (let i = 0; i < cardsA.length; i++) {
      if (secondPart) {
        const comparison =
          order2.indexOf(cardsA[i]) +
          getTypeWeight(cardsA, true) -
          (order2.indexOf(cardsB[i]) + getTypeWeight(cardsB, true));
        if (comparison !== 0) return comparison;
        continue;
      }

      const comparison =
        order.indexOf(cardsA[i]) +
        getTypeWeight(cardsA, false) -
        (order.indexOf(cardsB[i]) + getTypeWeight(cardsB, false));
      if (comparison !== 0) return comparison;
    }

    return 0;
  });
};

const firstPart = () => {
  const input = readInput('7/input');
  const games = input
    .trim()
    .split('\n')
    .map((v) => [...v.split(' ')]);

  let orderedGames = orderGames(games, false);

  let total = 0;

  for (let i = 0; i < orderedGames.length; i++) {
    total += Number(orderedGames[i][1]) * (i + 1);
  }

  return total;
};

const secondPart = () => {
  const input = readInput('7/input');
  const games = input
    .trim()
    .split('\n')
    .map((v) => [...v.split(' ')]);

  let orderedGames = orderGames(games, true);

  let total = 0;

  for (let i = 0; i < orderedGames.length; i++) {
    total += Number(orderedGames[i][1]) * (i + 1);
  }

  return total;
};

console.log(firstPart());
console.log(secondPart());
