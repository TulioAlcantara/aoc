import { readInput } from '../utils';

const checkPossibleTimes = (time: number, record: number) => {
  let possibleRecordBreaks = 0;

  for (let timePreparing = 1; timePreparing < time; timePreparing++) {
    let result = (time - timePreparing) * timePreparing;
    if (result > record) {
      possibleRecordBreaks++;
    }
  }

  return possibleRecordBreaks;
};

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

    total *= checkPossibleTimes(time, record);
  }

  return total;
};

const secondPart = () => {
  const input = readInput('6/input');
  const lines = input.split('\n');
  let total = 1;

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

  total = checkPossibleTimes(time, record);

  return total;
};

console.log(firstPart());
console.log(secondPart());
