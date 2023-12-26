import { readInput } from '../utils';

let grid: string[][] = [];

const startGrid = () => {
  for (let i = 0; i < 1000; i++) {
    grid.push([]);
    for (let j = 0; j < 1000; j++) {
      grid[i].push('.');
    }
  }
};

const outOfBounds = (x: number, y: number) => {
  return x < 0 || y < 0 || x >= grid.length || y >= grid[0].length;
};

const floodFill = () => {
  let queue = [[0, 0]];
  let visited = new Set<string>();

  while (queue.length > 0) {
    let [x, y] = queue.shift()!;
    if (outOfBounds(x, y)) continue;
    if (visited.has(`${x},${y}`)) continue;
    visited.add(`${x},${y}`);

    if (grid[x][y] === '#') {
      continue;
    }

    if (grid[x][y] === '.') {
      grid[x][y] = 'o';
      queue.push([x + 1, y]);
      queue.push([x - 1, y]);
      queue.push([x, y + 1]);
      queue.push([x, y - 1]);
    }
  }
};

const minimizeGrid = () => {
  let maxRow = 0;
  let maxCol = 0;
  let minRow = 0;
  let minCol = 0;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].includes('#')) {
      minRow = i;
      break;
    }
  }

  for (let i = grid.length - 1; i >= 0; i--) {
    if (grid[i].includes('#')) {
      maxRow = i;
      break;
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (minCol === 0 && grid[i][j] === '#') minCol = j;
      if (grid[i][j] === '#') minCol = Math.min(minCol, j);
    }
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = grid[i].length - 1; j >= 0; j--) {
      if (grid[i][j] === '#') maxCol = Math.max(maxCol, j);
    }
  }

  grid = grid
    .slice(minRow, maxRow + 1)
    .map((line) => line.slice(minCol, maxCol + 1));

  grid.push(Array(grid[0].length).fill('.'));
  grid.unshift(Array(grid[0].length).fill('.'));
  grid.forEach((line) => {
    line.push('.');
    line.unshift('.');
  });
};

const dig = (digPlan: string[][]) => {
  let gridCurrentPosition = [500, 500];
  digPlan.forEach((line) => {
    let [dir, steps, color] = line;
    let stepsNumber = Number(steps);
    switch (dir) {
      case 'U':
        for (let i = 0; i < stepsNumber; i++) {
          grid[gridCurrentPosition[0] - i][gridCurrentPosition[1]] = '#';
        }
        gridCurrentPosition[0] -= stepsNumber;
        break;

      case 'D':
        for (let i = 0; i < stepsNumber; i++) {
          grid[gridCurrentPosition[0] + i][gridCurrentPosition[1]] = '#';
        }
        gridCurrentPosition[0] += stepsNumber;
        break;

      case 'R':
        for (let i = 0; i < stepsNumber; i++) {
          grid[gridCurrentPosition[0]][gridCurrentPosition[1] + i] = '#';
        }
        gridCurrentPosition[1] += stepsNumber;
        break;

      case 'L':
        for (let i = 0; i < stepsNumber; i++) {
          grid[gridCurrentPosition[0]][gridCurrentPosition[1] - i] = '#';
        }
        gridCurrentPosition[1] -= stepsNumber;
        break;
    }
  });
};

const printGrid = () => {
  console.log(grid.map((line) => line.join('')).join('\n'));
};

const countGrid = () => {
  let count = 0;
  grid.forEach((line) => {
    line.forEach((cell) => {
      if (cell === '#' || cell === '.') count++;
    });
  });
  return count;
};

const firstPart = () => {
  const digPlan = readInput('18/input')
    .trim()
    .split('\n')
    .map((line) => line.split(' '));

  startGrid();
  dig(digPlan);
  minimizeGrid();
  floodFill();
  printGrid();
  return countGrid();
};

console.log(firstPart());
