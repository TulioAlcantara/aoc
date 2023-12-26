import { readInput } from '../utils';

const tilt = (matrix: string[][]): string[][] => {
  for (let row of matrix) {
    let minIndex = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i] === '#') {
        minIndex = i + 1;
        continue;
      }

      if (row[i] === '.') {
        continue;
      }

      if (i == minIndex) {
        minIndex++;
        continue;
      }

      row[minIndex] = 'O';
      row[i] = '.';
      minIndex++;
    }
  }

  return matrix;
};

const countMatrix = (matrix: string[][]): number => {
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 'O') {
        count += matrix.length - i;
      }
    }
  }

  return count;
};

const transposeMatrix = (matrix: string[][]): string[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

const flipMatrix = (matrix: string[][]): string[][] => {
  return matrix.map((row) => row.reverse());
};

const cycle = (matrix: string[][]): string[][] => {
  //NORTH
  let targetMatrix = transposeMatrix(matrix);
  targetMatrix = tilt(targetMatrix);

  //WEST
  targetMatrix = transposeMatrix(targetMatrix);
  targetMatrix = tilt(targetMatrix);

  //SOUTH
  targetMatrix = transposeMatrix(targetMatrix);
  targetMatrix = flipMatrix(targetMatrix);
  targetMatrix = tilt(targetMatrix);

  //EAST
  targetMatrix = flipMatrix(targetMatrix);
  targetMatrix = transposeMatrix(targetMatrix);
  targetMatrix = flipMatrix(targetMatrix);
  targetMatrix = tilt(targetMatrix);

  // BACK TO ORIGINAL
  targetMatrix = flipMatrix(targetMatrix);

  return targetMatrix;
};

const findLoop = (matrix: string[][]): number[] => {
  let cycleCount = 0;
  let loopStartPos = 0;
  const seenMap = new Map();

  while (true) {
    const matrixStr = JSON.stringify(matrix);

    if (seenMap.get(matrixStr)) {
      loopStartPos = seenMap.get(matrixStr);
      break;
    }

    seenMap.set(matrixStr, cycleCount);
    cycleCount++;
    matrix = cycle(matrix);
  }

  return [cycleCount, loopStartPos];
};

const firstPart = () => {
  const matrix = readInput('14/input')
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  const transposedMatrix: string[][] = transposeMatrix(matrix);
  const tiltedMatrix = tilt(transposedMatrix);
  return countMatrix(tiltedMatrix);
};

const secondPart = () => {
  let matrix = readInput('14/input')
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  const [cycleCount, loopStartPos] = findLoop(matrix);
  const cyclesRemaining = 1000000000 - loopStartPos;
  let cyclesEquivalentTo1B = cyclesRemaining % (cycleCount - loopStartPos);
  cyclesEquivalentTo1B += loopStartPos;

  while (cyclesEquivalentTo1B) {
    matrix = cycle(matrix);
    cyclesEquivalentTo1B--;
  }

  console.log(matrix.map((el) => el.join('')).join('\n'));

  return countMatrix(matrix);
};

console.log(firstPart());
console.log(secondPart());
