import { readInput } from '../utils';

const lcm = (numbers: number[]) => {
  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    result = (result * numbers[i]) / gcd(result, numbers[i]);
  }

  return result;
};

const gcd = (a: number, b: number): number => {
  if (b == 0) {
    return a;
  }

  return gcd(b, a % b);
};

const secondPart = () => {
  const input = readInput('8/input');
  const [stepsList, directionsList] = input.trim().split('\n\n');

  const stepsArray: string[] = stepsList.split('');
  const directionsMap: Map<string, string[]> = new Map(
    directionsList.split('\n').map((line) => {
      return [
        line.split('=')[0].trim(),
        line
          .split('=')[1]
          .trim()
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim()),
      ];
    })
  );

  let startPositions = Array.from(directionsMap.keys()).filter((k) =>
    k.endsWith('A')
  );

  let totalCycles = [];

  for (let startPostion of startPositions) {
    let currentPosition = startPostion;
    let stepIndex = 0;
    let currentCycles = [];
    let firstZPosition = null;
    let stepsCount = 0;

    while (true) {
      while (!currentPosition.endsWith('Z') || stepsCount == 0) {
        let nextStep = stepsArray[stepIndex];
        let nextPositionArray = directionsMap.get(currentPosition);

        currentPosition =
          nextStep == 'L' ? nextPositionArray![0] : nextPositionArray![1];

        stepsCount = stepsCount + 1;

        if (stepIndex == stepsArray.length - 1) {
          stepIndex = 0;
          continue;
        }

        stepIndex = stepIndex + 1;
      }

      currentCycles.push(stepsCount);

      if (firstZPosition == null) {
        firstZPosition = currentPosition;
        stepsCount = 0;
        continue;
      }

      if (currentPosition == firstZPosition) {
        break;
      }
    }

    totalCycles.push(currentCycles);
  }

  return lcm(totalCycles.flat());
};

const firstPart = () => {
  const input = readInput('8/input');
  const [stepsList, directionsList] = input.trim().split('\n\n');

  const stepsArray: string[] = stepsList.split('');
  const directionsMap: Map<string, string[]> = new Map(
    directionsList.split('\n').map((line) => {
      return [
        line.split('=')[0].trim(),
        line
          .split('=')[1]
          .trim()
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim()),
      ];
    })
  );

  let currentStep = 'AAA';
  let stepIndex = 0;
  let total = 0;

  while (currentStep != 'ZZZ') {
    let nextStep = stepsArray[stepIndex];
    let nextPositionArray = directionsMap.get(currentStep);

    currentStep =
      nextStep == 'L' ? nextPositionArray![0] : nextPositionArray![1];

    total = ++total;

    if (stepIndex == stepsArray.length - 1) {
      stepIndex = 0;
      continue;
    }

    stepIndex = ++stepIndex;
  }

  return total;
};

console.log(firstPart());
console.log(secondPart());
