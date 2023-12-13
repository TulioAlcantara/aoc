import { readInput, splitLines } from '../utils';

const expandData = (numbers: number[]): number[][] => {
  let resultMatrix = [numbers];
  let targetLine = numbers;
  let newLine = [];
  while (true) {
    for (let i = 0; i < targetLine.length - 1; i++) {
      let difference = targetLine[i + 1] - targetLine[i];
      newLine.push(difference);
    }

    resultMatrix.push(newLine);

    if (newLine.every((v) => v == 0)) {
      break;
    }

    targetLine = newLine;
    newLine = [];
  }

  return resultMatrix;
};

const extrapolate = (numbers: number[], isSecondPart: boolean): number => {
  const expandedMatrix = expandData(numbers);
  if (isSecondPart) {
    return expandedMatrix.reverse().reduce((acc, value) => value[0] - acc, 0);
  }
  return expandedMatrix.reduce(
    (acc, value) => acc + value[value.length - 1],
    0
  );
};

const firstPart = () => {
  const input: string = readInput('9/input');
  const lines: number[][] = splitLines(input).map((line) =>
    line.split(' ').map((item) => Number(item))
  );

  let total = 0;
  lines.forEach((line) => {
    total += extrapolate(line, false);
  });

  return total;
};

const secondPart = () => {
  const input: string = readInput('9/input');
  const lines: number[][] = splitLines(input).map((line) =>
    line.split(' ').map((item) => Number(item))
  );

  let total = 0;
  lines.forEach((line) => {
    total += extrapolate(line, true);
  });

  return total;
};

console.log(firstPart());
console.log(secondPart());
