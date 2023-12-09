import { readInput, splitLines } from '../utils';

const isNumeric = (str: string) => {
  return /^\d+$/.test(str);
};

const checkAdjacent = (position: number, lineLenght: number) => {
  const topline = [
    position - lineLenght - 1,
    position - lineLenght,
    position - lineLenght + 1,
  ];

  const middleLine = [position - 1, position + 1];

  const bottomLine = [
    position + lineLenght - 1,
    position + lineLenght,
    position + lineLenght + 1,
  ];

  const adjacentPositions = [...topline, ...middleLine, ...bottomLine];
  console.log(adjacentPositions);
};

const firstStep = () => {
  const input = readInput('./input');
  const lineLenght = input.indexOf('\n');
  const result = 0;
  const isSymbol = (i: number): boolean =>
    !isNumeric(input[i]) && input[i] !== '.';

  for (let i = 0; i < input.length; i++) {
    if (isSymbol(i)) {
      checkAdjacent(i, lineLenght);
    }
  }
};

console.log(firstStep());
