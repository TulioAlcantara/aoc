import { readInput } from '../utils';

const firstPart = () => {
  const input = readInput('6/input');
  const lines = input.split('\n');
  let total = 1;

  const times: number[] = lines[0]
    .split(':')[1]
    .split(' ')
    .filter((v) => v)
    .map((v) => Number(v));

  const distances: number[] = lines[1]
    .split(':')[1]
    .split(' ')
    .filter((v) => v)
    .map((v) => Number(v));

  for (let race = 0; race < times.length; race++) {
    const time = times[race];
    const record = distances[race];

    const [lowerLimit, upperLimit] = solveEquation(time, record);
    console.log(lowerLimit, upperLimit);
    total *= upperLimit - lowerLimit + 1;
  }

  return total;
};

const solveEquation = (time: number, record: number): number[] => {
  let lowerLimit = (time - Math.sqrt(Math.pow(time, 2) - 4 * record)) / 2;
  let upperLimit = (time + Math.sqrt(Math.pow(time, 2) - 4 * record)) / 2;

  if (Number.isInteger(lowerLimit)) lowerLimit = ++lowerLimit;
  if (Number.isInteger(upperLimit)) upperLimit = ++upperLimit;

  return [Math.ceil(lowerLimit), Math.floor(upperLimit)];
};

const secondPart = () => {
  const input = readInput('6/input');
  const lines = input.split('\n');

  const time: number = +lines[0]
    .split(':')[1]
    .split(' ')
    .filter((v) => v)
    .join('');

  const record: number = +lines[1]
    .split(':')[1]
    .split(' ')
    .filter((v) => v)
    .join('');

  const [lowerLimit, upperLimit] = solveEquation(time, record);
  return upperLimit - lowerLimit + 1;
};

console.log(firstPart());
console.log(secondPart());
