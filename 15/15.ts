import { readInput } from '../utils';

const getStepValue = (step: string): number => {
  let value = 0;
  for (let char of step) {
    value += char.charCodeAt(0);
    value *= 17;
    value %= 256;
  }

  return value;
};

const firstPart = () => {
  const input = readInput('15/input').trim();
  const steps = input.split(',');
  let total = 0;

  steps.forEach((step) => {
    total += getStepValue(step);
  });

  return total;
};

const secondPart = () => {
  const input = readInput('15/input').trim();
  const steps = input.split(',');
  let total = 0;

  steps.forEach((step) => {
    total += getStepValue(step);
  });

  return total;
};

// console.log(firstPart());
console.log(secondPart());
