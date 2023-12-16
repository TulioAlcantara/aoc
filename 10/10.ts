import { readInput, splitLines } from '../utils';

const pipes: Record<string, string[]> = {
  '|': ['N', 'S'],
  '-': ['E', 'W'],
  L: ['N', 'E'],
  J: ['N', 'W'],
  '7': ['S', 'W'],
  F: ['S', 'E'],
};

let matrix: string[][] = [];
let matrixColLen: number = 0;
let matrixRowLen: number = 0;

const moveCardinalDirection = (
  row: number,
  col: number,
  direction: string
): number[] => {
  if (direction == 'N') return [row - 1, col];
  if (direction == 'E') return [row, col + 1];
  if (direction == 'S') return [row + 1, col];
  return [row, col - 1];
};

const getOpositeDirection = (direction: string): string => {
  if (direction == 'N') return 'S';
  if (direction == 'E') return 'W';
  if (direction == 'S') return 'N';
  return 'E';
};

const findNextPosition = (
  currentRow: number,
  currentCol: number,
  origin: string
): Array<number | string> => {
  const pipe: string = matrix[currentRow][currentCol];
  let possibleDirections: string[] = pipes[pipe];
  const direction = possibleDirections.find(
    (el) => el != getOpositeDirection(origin)
  )!;

  const [newRow, newCol] = moveCardinalDirection(
    currentRow,
    currentCol,
    direction
  );
  return [newRow, newCol, direction];
};

const findFirstMove = (row: number, col: number): Array<number | string> => {
  const possibleMoves = {
    south: ['|', 'J', 'L'],
    north: ['|', 'F', '7'],
    east: ['-', 'J', '7'],
  };

  if (row - 1 >= 0) {
    if (possibleMoves.north.includes(matrix[row - 1][col])) {
      return [row - 1, col, 'N'];
    }
  }

  if (col + 1 < matrix[0].length) {
    if (possibleMoves.east.includes(matrix[row][col + 1])) {
      return [row, col + 1, 'E'];
    }
  }

  if (row + 1 < matrix.length) {
    if (possibleMoves.south.includes(matrix[row + 1][col])) {
      return [row + 1, col, 'S'];
    }
  }

  return [row, col - 1, 'W'];
};

const replaceStartPosition = (
  startDirections: string[],
  startRow: number,
  startCol: number
) => {
  for (const [key, value] of Object.entries(pipes)) {
    if (
      (value[0] == startDirections[0] || value[0] == startDirections[1]) &&
      (value[1] == startDirections[0] || value[1] == startDirections[1])
    ) {
      matrix[startRow][startCol] = key;
    }
  }
};

const searchPath = (startPosition: number[]): number[][] => {
  let startRow = startPosition[0];
  let startCol = startPosition[1];
  let path: number[][] = [[startRow, startCol]];
  let startDirections = [];

  let [currentRow, currentCol, origin] = findFirstMove(startRow, startCol);
  startDirections.push(origin as string);

  while (matrix[currentRow as number][currentCol as number] !== 'S') {
    path.push([currentRow as number, currentCol as number]);

    [currentRow, currentCol, origin] = findNextPosition(
      currentRow as number,
      currentCol as number,
      origin as string
    );
  }

  startDirections.push(getOpositeDirection(origin as string));
  replaceStartPosition(startDirections, startRow, startCol);

  return path;
};

const clearUnusefulPipes = (path: number[][]) => {
  let stringifiedPath = JSON.stringify(path);
  for (let row = 0; row < matrixRowLen; row++) {
    for (let col = 0; col < matrixColLen; col++) {
      if (matrix[row][col] == '.') continue;
      if (!stringifiedPath.includes(JSON.stringify([row, col]))) {
        matrix[row][col] = '.';
      }
    }
  }
};

const countInnerLoop = () => {
  let innerLoopCount = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] !== '.') continue;
      let intersections = 0;

      for (let checkCol = col + 1; checkCol < matrix[0].length; checkCol++) {
        if (['|', 'J', 'L'].includes(matrix[row][checkCol])) {
          intersections = ++intersections;
        }
      }

      innerLoopCount += intersections % 2 ? 1 : 0;
    }
  }

  return innerLoopCount;
};

const printMatrix = () => {
  console.log(matrix.map((el) => el.join('')).join('\n'));
};

const main = () => {
  const input = readInput('10/input');
  matrix = [...splitLines(input).map((el) => el.split(''))];
  matrixRowLen = matrix.length;
  matrixColLen = matrix[0].length;
  const startRow = matrix.findIndex((el) => el.includes('S'));
  const startCol = matrix[startRow].indexOf('S');

  const path = searchPath([startRow, startCol]);
  clearUnusefulPipes(path);
  printMatrix();
  console.log(path.length / 2);
  console.log(countInnerLoop());
};

main();
