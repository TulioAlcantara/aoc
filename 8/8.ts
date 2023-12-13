import { readInput } from '../utils';
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
    let nextPositionArray = directionsMap.get(currentStep.trim());

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
