import { readInput, splitLines } from '../utils';

const firstPart = () => {
  const input = readInput('4/input');
  const cards = splitLines(input);
  let totalScore = 0;

  cards.forEach((card) => {
    const cardData = card.split(':')[1];
    const winningNumbers = cardData
      .split('|')[0]
      .trim()
      .split(' ')
      .filter((val) => val);

    const numbers = cardData
      .split('|')[1]
      .trim()
      .split(' ')
      .filter((val) => val);

    const winningNumberMap = new Map(
      winningNumbers.map((val) => {
        return [val, 0];
      })
    );

    numbers.forEach((number) => {
      if (winningNumberMap.get(number) == 0) {
        winningNumberMap.set(number, 1);
      }
    });

    let gameScore = 0;
    for (let [key, value] of winningNumberMap) {
      if (value == 1) {
        gameScore = gameScore == 0 ? 1 : gameScore * 2;
      }
    }

    totalScore += gameScore;
  });

  return totalScore;
};

const secondPart = () => {
  const input = readInput('4/input');
  const cards = splitLines(input);
  let total = 0;
  const copies = Array(cards.length).fill(1);

  for (let [cardIndex, card] of cards.entries()) {
    const cardData = card.split(':')[1];
    const winningNumbers = cardData
      .split('|')[0]
      .trim()
      .split(' ')
      .filter((val) => val);

    const numbers = cardData
      .split('|')[1]
      .trim()
      .split(' ')
      .filter((val) => val);

    const winningNumberMap = new Map(
      winningNumbers.map((val) => {
        return [val, 0];
      })
    );

    numbers.forEach((number) => {
      if (winningNumberMap.get(number) == 0) {
        winningNumberMap.set(number, 1);
      }
    });

    let gameScore = 0;
    for (let [key, value] of winningNumberMap) {
      if (value == 1) {
        gameScore += 1;
      }
    }

    total += copies[cardIndex];

    if (gameScore == 0) {
      continue;
    }

    for (let i = cardIndex + 1; i <= cardIndex + gameScore; i++) {
      copies[i] += copies[cardIndex];
    }
  }

  return total;
};

console.log(firstPart());
console.log(secondPart());
