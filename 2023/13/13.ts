import { readInput } from '../utils';

const compareWithSmudge = (row1: string, row2: string): boolean => {
  let smudgeCount = 0;
  for (let i = 0; i < row1.length; i++) {
    if (row1[i] != row2[i]) smudgeCount += 1;
  }
  return smudgeCount == 1;
};

const findReflection = (mirror: string): number => {
  const rows = mirror.split('\n');
  for (let i = 0; i < rows.length; i++) {
    if (rows[i] == rows[i + 1]) {
      let upper = i;
      let lower = i + 1;

      while (rows[upper] == rows[lower]) {
        if (upper == 0 || lower == rows.length - 1) return i + 1;
        upper -= 1;
        lower += 1;
      }
    }
  }
  return 0;
};

const findReflection2 = (mirror: string): number => {
  const rows = mirror.split('\n');
  for (let i = 0; i < rows.length; i++) {
    if (i == rows.length - 1) return 0;

    if (rows[i] == rows[i + 1]) {
      let upper = i;
      let lower = i + 1;
      let smudgeCount = 0;

      while (true) {
        if (smudgeCount == 1 && (upper == 0 || lower == rows.length - 1))
          return i + 1;

        if (upper == 0 || lower == rows.length - 1) break;

        upper -= 1;
        lower += 1;

        if (rows[upper] == rows[lower]) {
          continue;
        }

        if (compareWithSmudge(rows[upper], rows[lower])) {
          smudgeCount += 1;
          continue;
        }

        break;
      }
    }

    if (compareWithSmudge(rows[i], rows[i + 1])) {
      if (i == 0 || i + 1 == rows.length - 1) return i + 1;

      let upper = i - 1;
      let lower = i + 2;

      while (rows[upper] == rows[lower]) {
        if (upper == 0 || lower == rows.length - 1) return i + 1;
        upper -= 1;
        lower += 1;
      }
    }
  }
  return 0;
};

const rotateMatrix = (mirror: string): string => {
  const matrix = mirror.split('\n').map((el) => el.split(''));
  const rotatedMatrix = matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex])
  );
  return rotatedMatrix.map((row) => row.join('')).join('\n');
};

const firstPart = () => {
  const mirrors = readInput('13/input').trim().split('\n\n');
  let result = 0;

  for (let mirror of mirrors) {
    let horizontal = findReflection(mirror);
    if (horizontal) {
      result += horizontal * 100;
      continue;
    }

    let rotatedMatrix = rotateMatrix(mirror);
    let veritcal = findReflection(rotatedMatrix);

    result += veritcal;
  }

  return result;
};

const secondPart = () => {
  const input = readInput('13/input').trim().split('\n\n');
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    let matrix = input[i];
    let horizontal = findReflection2(matrix);
    if (horizontal) {
      result += horizontal * 100;
      continue;
    }

    let rotatedMatrix = rotateMatrix(matrix);
    let veritcal = findReflection2(rotatedMatrix);

    result += veritcal;
  }

  return result;
};

console.log(firstPart());
console.log(secondPart());
