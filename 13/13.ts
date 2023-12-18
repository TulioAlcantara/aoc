import { readInput } from '../utils';

// const findReflection = (
//   mirror: string
// ): { count: number; rowsAbove: number } => {
//   const lines = mirror.split('\n');
//   let count = 0;
//   for (let i = 0; i < lines.length; i++) {
//     if (lines[i] == lines[i + 1]) {
//       let upper = i;
//       let lower = i + 1;
//       while (lines[upper] == lines[lower]) {
//         count += 1;
//         upper -= 1;
//         lower += 1;
//       }
//       if (count > 1)
//         return {
//           count: count,
//           rowsAbove: i + 1,
//         };
//       count = 0;
//     }
//   }
//   return { count: 0, rowsAbove: 0 };
// };

const findReflection = (mirror: string): number => {
  const lines = mirror.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] == lines[i + 1]) {
      let upper = i;
      let lower = i + 1;

      while (lines[upper] == lines[lower]) {
        if (upper == 0 || lower == lines.length - 1) return i + 1;
        upper -= 1;
        lower += 1;
      }
    }
  }
  return 0;
};

const rotateMirror = (mirror: string): string => {
  const matrix = mirror.split('\n').map((el) => el.split(''));
  const rotatedMatrix = matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex])
  );
  return rotatedMatrix.map((row) => row.join('n')).join('\n');
};

const firstPart = () => {
  const mirrors = readInput('13/input').trim().split('\n\n');
  let result = 0;

  for (let mirror of mirrors) {
    let horizontal = findReflection(mirror);
    if (horizontal) {
      result += horizontal * 100;
    }

    let rotatedMirror = rotateMirror(mirror);
    let veritcal = findReflection(rotatedMirror);

    result += veritcal;
  }

  return result;
};

const secondPart = () => {
  const mirrors = readInput('13/input').trim().split('\n\n');
  let result = 0;

  for (let mirror of mirrors) {
    let horizontal = findReflection(mirror);
    if (horizontal) {
      result += horizontal * 100;
    }

    let rotatedMirror = rotateMirror(mirror);
    let veritcal = findReflection(rotatedMirror);

    result += veritcal;
  }

  return result;
};

console.log(firstPart());
console.log(secondPart());
