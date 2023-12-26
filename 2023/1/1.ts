import { readInput, splitLines } from '../utils';

const regDigits = /[0-9]/g;
const regDigitsAndWrittenNumbers =
  /(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g;

const firstPart = (): number => {
  const input = readInput('1/input');
  const inputArray = splitLines(input);
  let totalSum = 0;

  inputArray.forEach((line: string) => {
    let numbers = line.match(regDigits);
    if (numbers)
      totalSum += Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
  });

  return totalSum;
};

const secondPart = (): number => {
  const input = readInput('1/input');
  const inputArray = splitLines(input);
  let totalSum = 0;

  inputArray.forEach((line: string) => {
    let numbers = [...line.matchAll(regDigitsAndWrittenNumbers)].map(
      (match) => match[1]
    );

    if (numbers) {
      let firstDigit = numbers[0].match(regDigits)
        ? numbers[0]
        : convertToNumber(numbers[0]);

      let lastDigit = numbers[numbers.length - 1].match(regDigits)
        ? numbers[numbers.length - 1]
        : convertToNumber(numbers[numbers.length - 1]);

      totalSum += Number(`${firstDigit}${lastDigit}`);
    }
  });

  return totalSum;
};

const convertToNumber = (number: string): number => {
  switch (number) {
    case 'one':
      return 1;
    case 'two':
      return 2;
    case 'three':
      return 3;
    case 'four':
      return 4;
    case 'five':
      return 5;
    case 'six':
      return 6;
    case 'seven':
      return 7;
    case 'eight':
      return 8;
    case 'nine':
      return 9;
    default:
      return 0;
  }
};

console.log(firstPart());
console.log(secondPart());
