import { readInput, splitLines } from '../utils';

const isNumeric = (str: string) => /^\d+$/.test(str);
const isSymbol = (value: string): boolean =>
  !isNumeric(value) && value !== '.' && value !== '\n';

const starMap = new Map<number, number>();

const checkAdjacent = (
  valueRange: number[],
  lineLenght: number,
  input: string
) => {
  for (let position of valueRange) {
    const topline =
      position > lineLenght
        ? [
            position - lineLenght,
            position - lineLenght - 1,
            position - lineLenght - 2,
          ]
        : [];

    const middleLine = [position - 1, position + 1];

    const bottomLine =
      position < input.length - lineLenght
        ? [
            position + lineLenght,
            position + lineLenght + 1,
            position + lineLenght + 2,
          ]
        : [];

    const adjacentPositions = [...topline, ...middleLine, ...bottomLine];

    for (let adjacentIndex of adjacentPositions) {
      if (isSymbol(input[adjacentIndex])) return true;
    }
  }
  return false;
};

const checkAdjacent2 = (
  valueRange: number[],
  lineLenght: number,
  input: string
): number => {
  for (let position of valueRange) {
    const topline =
      position > lineLenght
        ? [
            position - lineLenght,
            position - lineLenght - 1,
            position - lineLenght - 2,
          ]
        : [];

    const middleLine = [position - 1, position + 1];

    const bottomLine =
      position < input.length - lineLenght
        ? [
            position + lineLenght,
            position + lineLenght + 1,
            position + lineLenght + 2,
          ]
        : [];

    const adjacentPositions = [...topline, ...middleLine, ...bottomLine];
    const currentValue = Number(valueRange.map((v) => input[v]).join(''));

    for (let adjacentIndex of adjacentPositions) {
      if (input[adjacentIndex] !== '*') continue;

      if (starMap.get(adjacentIndex)) {
        let starAdjacentProduct = currentValue * starMap.get(adjacentIndex)!;
        starMap.delete(adjacentIndex);
        return starAdjacentProduct;
      }

      starMap.set(adjacentIndex, currentValue);
      return 0;
    }
  }
  return 0;
};

const firstPart = () => {
  const input = readInput('3/input');
  const lineLenght = input.indexOf('\n');
  let result = 0;

  for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
    if (isNumeric(input[inputIndex])) {
      let valueRange = [];
      let valueIndex = inputIndex;

      while (isNumeric(input[valueIndex])) {
        valueRange.push(valueIndex);
        valueIndex++;
      }

      if (checkAdjacent(valueRange, lineLenght, input)) {
        result += Number(valueRange.map((v) => input[v]).join(''));
      }
      inputIndex = valueIndex;
    }
  }

  return result;
};

const secondPart = () => {
  const input = readInput('3/input');
  const lineLenght = input.indexOf('\n');
  let result = 0;

  for (let inputIndex = 0; inputIndex < input.length; inputIndex++) {
    if (isNumeric(input[inputIndex])) {
      let valueRange = [];
      let valueIndex = inputIndex;

      while (isNumeric(input[valueIndex])) {
        valueRange.push(valueIndex);
        valueIndex++;
      }

      result += checkAdjacent2(valueRange, lineLenght, input);
      inputIndex = valueIndex;
    }
  }

  return result;
};

console.log(firstPart());
console.log(secondPart());
