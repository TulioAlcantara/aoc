import { markAsUntransferable } from 'worker_threads';
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
    N: ['|', 'L', 'J'],
    E: ['-', 'L', 'F'],
    S: ['|', '7', 'F'],
    W: ['-', 'J', '7'],
  };

  if (possibleMoves['N'].includes(matrix[row - 1][col])) {
    return [row - 1, col, 'N'];
  }

  if (possibleMoves['E'].includes(matrix[row][col + 1])) {
    return [row, col + 1, 'E'];
  }

  if (possibleMoves['S'].includes(matrix[row + 1][col])) {
    return [row + 1, col, 'S'];
  }

  return [row, col - 1, 'W'];
};

const searchPath = (startPosition: number[]): number[][] => {
  let startRow = startPosition[0];
  let startCol = startPosition[1];
  let path: number[][] = [[startRow, startCol]];

  let [currentRow, currentCol, origin] = findFirstMove(startRow, startCol);

  while (matrix[currentRow as number][currentCol as number] !== 'S') {
    console.log(currentRow, currentCol);
    path.push([currentRow as number, currentCol as number]);

    [currentRow, currentCol, origin] = findNextPosition(
      currentRow as number,
      currentCol as number,
      origin as string
    );
  }
  return path;
};

const countInnerLoop = (path: number[][]) => {
  let innerLoopCount = 0;

  for (let i = 0; i < matrix.length; i++) {
    let pathInThisRow = path
      .filter((el) => el[0] == i)
      .map((el) => el[1])
      .sort((a, b) => a - b);
    // console.log(pathInThisRow);

    if (pathInThisRow.length == 0) continue;

    if (pathInThisRow.length == 2) {
      innerLoopCount += pathInThisRow[1] - pathInThisRow[0] - 1;
      continue;
    }

    for (let j = 0; j < pathInThisRow.length; j = j + 2) {
      if (pathInThisRow[j + 1] == undefined) continue;
      if (pathInThisRow[j] + 1 == pathInThisRow[j + 1]) continue;
      // console.log(pathInThisRow[j], pathInThisRow[j + 1]);
      innerLoopCount += pathInThisRow[j + 1] - pathInThisRow[j] - 1;
    }
  }
  return innerLoopCount;
};

const main = () => {
  const input = readInput('10/input');
  matrix = [...splitLines(input).map((el) => el.split(''))];
  matrixRowLen = matrix.length;
  matrixColLen = matrix[0].length;
  const startRow = matrix.findIndex((el) => el.includes('S'));
  const startCol = matrix[startRow].indexOf('S');

  const path = searchPath([startRow, startCol]);
  // console.log(path.length / 2);
  // console.log(countInnerLoop(path));
};

console.log(main());
