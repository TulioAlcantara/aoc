import { readInput } from '../utils';

const firstPart = () => {
  const input = readInput('8/input');

  const [steps, directions] = input.trim().split('\n\n');

  const stepsArray: string[] = steps.split('');
  const directionsMap: Map<string, string[]> = new Map(
    directions.split('\n').map((line) => {
      return [line.split('=')[0].trim(), line.split('=')[1].trim().split(',')];
    })
  );

  console.log(directionsMap);
};

console.log(firstPart());
