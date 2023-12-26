import { readInput } from '../utils';

const expand = (matrix: string[][]): string[][] => {
  let galaxy = [...matrix];

  let emptyRowIndexes: number[] = matrix
    .filter((el) => el.every((el) => el == '.'))
    .map((el) => matrix.indexOf(el));

  let fillValue = matrix[emptyRowIndexes[0]];
  emptyRowIndexes.reverse().forEach((row) => {
    galaxy.splice(row, 0, fillValue);
  });

  let rotateGalaxy: string[][] = [];
  let emptyColumnIndexes: number[] = [];
  for (let i = 0; i < galaxy[0].length; i++) {
    let col = galaxy.map((el) => el[i]);
    rotateGalaxy.push(col);
    if (col.every((el) => el == '.')) {
      emptyColumnIndexes.push(i);
    }
  }

  fillValue = rotateGalaxy[emptyColumnIndexes[0]];
  emptyColumnIndexes.reverse().forEach((row) => {
    rotateGalaxy.splice(row, 0, fillValue);
  });

  let finalGalaxy: string[][] = [];
  for (let i = 0; i < rotateGalaxy.length; i++) {
    let col = rotateGalaxy.map((el) => el[i]);
    finalGalaxy.push(col);
  }

  return finalGalaxy;
};

const getEmptyRowCols = (matrix: string[][]): number[][] => {
  let galaxy = [...matrix];

  let emptyRowIndexes: number[] = matrix
    .filter((el) => el.every((el) => el == '.'))
    .map((el) => matrix.indexOf(el));

  let emptyColumnIndexes: number[] = [];
  for (let i = 0; i < galaxy[0].length; i++) {
    let col = galaxy.map((el) => el[i]);
    if (col.every((el) => el == '.')) {
      emptyColumnIndexes.push(i);
    }
  }

  return [emptyRowIndexes, emptyColumnIndexes];
};

const getPlanetsPositions = (galaxy: string[][]): number[][] => {
  let planetsPositions: number[][] = [];
  for (let i = 0; i < galaxy.length; i++) {
    for (let j = 0; j < galaxy[i].length; j++) {
      if (galaxy[i][j] == '#') {
        planetsPositions.push([i, j]);
      }
    }
  }
  return planetsPositions;
};

const getPlanetsCombinations = (planetsPositions: number[][]): number[][][] => {
  const planetsCombinations: number[][][] = [];
  for (let i = 0; i < planetsPositions.length; i++) {
    let planet = planetsPositions[i];
    let combinations = [];
    for (let j = i + 1; j < planetsPositions.length; j++) {
      combinations.push([planet, planetsPositions[j]]);
    }
    planetsCombinations.push(...combinations);
  }

  return planetsCombinations;
};

const getPlanetsDistancesSum = (planetsCombinations: number[][][]): number => {
  let planetsDistancesSum = 0;
  for (let i = 0; i < planetsCombinations.length; i++) {
    let combination = planetsCombinations[i];
    let distance =
      Math.abs(combination[0][0] - combination[1][0]) +
      Math.abs(combination[0][1] - combination[1][1]);
    planetsDistancesSum += distance;
  }
  return planetsDistancesSum;
};

const getPlanetsDistancesSum2 = (
  planetsCombinations: number[][][],
  emptyRows: number[],
  emptyCols: number[]
): number => {
  let planetsDistancesSum = 0;
  for (let combination of planetsCombinations) {
    let distance =
      Math.abs(combination[0][0] - combination[1][0]) +
      Math.abs(combination[0][1] - combination[1][1]);
    planetsDistancesSum += distance;

    let combinationRows = [combination[0][0], combination[1][0]].sort(
      (a, b) => a - b
    );
    if (combinationRows[1] != combinationRows[0]) {
      for (let emptyRow of emptyRows) {
        if (combinationRows[0] < emptyRow && combinationRows[1] > emptyRow)
          planetsDistancesSum += 999999;
      }
    }

    let combinationCols = [combination[0][1], combination[1][1]].sort(
      (a, b) => a - b
    );
    if (combinationCols[1] != combinationCols[0]) {
      for (let emptyCol of emptyCols) {
        if (combinationCols[0] < emptyCol && combinationCols[1] > emptyCol)
          planetsDistancesSum += 999999;
      }
    }
  }

  return planetsDistancesSum;
};

const firstPart = () => {
  const input = readInput('11/input');
  const matrix: string[][] = input
    .trim()
    .split('\n')
    .map((el) => el.split(''));

  const galaxy = expand(matrix);
  const planetsPositions = getPlanetsPositions(galaxy);
  const planetsCombinations = getPlanetsCombinations(planetsPositions);
  return getPlanetsDistancesSum(planetsCombinations);
};

const secondPart = () => {
  const input = readInput('11/input');
  const matrix: string[][] = input
    .trim()
    .split('\n')
    .map((el) => el.split(''));

  const [emptyRows, emptyCols] = getEmptyRowCols(matrix);
  const planetsPositions = getPlanetsPositions(matrix);
  const planetsCombinations = getPlanetsCombinations(planetsPositions);
  return getPlanetsDistancesSum2(planetsCombinations, emptyRows, emptyCols);
};

console.log(firstPart());
console.log(secondPart());
