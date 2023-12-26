import { readInput, splitLines } from '../utils';

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;
const regNumber = /^[0-9]*$/;

const isImpossibleCondition = (color: string, quantity: number): boolean => {
  return (
    (color.includes('red') && quantity > MAX_RED) ||
    (color.includes('green') && quantity > MAX_GREEN) ||
    (color.includes('blue') && quantity > MAX_BLUE)
  );
};

const firstPart = () => {
  const input = readInput('2/input');
  const inputArray = splitLines(input);
  let result = 0;

  gameLoop: for (const line of inputArray) {
    let id = line.split(':')[0],
      game = line.split(':')[1];
    let tokens = game.split(' ');

    for (let i = 0; i < tokens.length; i++) {
      if (!tokens[i].match(regNumber)) continue;
      if (Number(tokens[i]) <= 12) continue;

      let color = tokens[i + 1];
      let quantity = Number(tokens[i]);

      if (isImpossibleCondition(color, quantity)) continue gameLoop;
    }

    result += Number(id.split(' ')[1]);
  }

  return result;
};

const secondPart = () => {
  const input = readInput('2/input');
  const inputArray = splitLines(input);
  let result = 0;

  for (const line of inputArray) {
    let game = line.split(':')[1];
    let tokens = game.trim().split(' ');

    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    for (let i = 0; i < tokens.length; i++) {
      if (!tokens[i].match(regNumber)) continue;

      let color = tokens[i + 1];
      let quantity = Number(tokens[i]);

      if (color.includes('red')) {
        maxRed = quantity > maxRed ? quantity : maxRed;
      }

      if (color.includes('green')) {
        maxGreen = quantity > maxGreen ? quantity : maxGreen;
      }

      if (color.includes('blue')) {
        maxBlue = quantity > maxBlue ? quantity : maxBlue;
      }
    }

    result += maxRed * maxBlue * maxGreen;
  }

  return result;
};

console.log(firstPart());
console.log(secondPart());
