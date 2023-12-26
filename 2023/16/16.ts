import { readInput } from '../utils';

let maze: string[][] = [];

type Direction = 'up' | 'down' | 'left' | 'right';

const reflections: any = {
  '/': {
    up: 'right',
    down: 'left',
    left: 'down',
    right: 'up',
  },
  '\\': {
    up: 'left',
    down: 'right',
    left: 'up',
    right: 'down',
  },
  '-': {
    up: ['left', 'right'],
    down: ['left', 'right'],
    left: 'left',
    right: 'right',
  },
  '|': {
    up: 'up',
    down: 'down',
    left: ['up', 'down'],
    right: ['up', 'down'],
  },
};

const coordinates = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

const visited = new Set();
const loops = new Set();

function outOfBounds(position: number[]): boolean {
  return (
    position[0] < 0 ||
    position[0] >= maze.length ||
    position[1] < 0 ||
    position[1] >= maze[0].length
  );
}

function checkLoop(position: number[], direction: Direction): boolean {
  return loops.has(JSON.stringify([position[0], position[1], direction]));
}

function navigateMaze(pos: number[], direction: Direction) {
  if (outOfBounds(pos) || checkLoop(pos, direction)) return;

  let symbol = maze[pos[0]][pos[1]];
  let newPos = [];

  visited.add(JSON.stringify([pos[0], pos[1]]));
  loops.add(JSON.stringify([pos[0], pos[1], direction]));

  if (symbol !== '.') {
    let newDirection: Direction | Direction[] = reflections[symbol][direction];

    if (Array.isArray(newDirection)) {
      newPos = [
        pos[0] + coordinates[newDirection[0]][0],
        pos[1] + coordinates[newDirection[0]][1],
      ];
      let newPos2 = [
        pos[0] + coordinates[newDirection[1]][0],
        pos[1] + coordinates[newDirection[1]][1],
      ];

      navigateMaze(newPos, newDirection[0]);
      navigateMaze(newPos2, newDirection[1]);
      return;
    }

    newPos = [
      pos[0] + coordinates[newDirection as Direction][0],
      pos[1] + coordinates[newDirection as Direction][1],
    ];

    navigateMaze(newPos, newDirection as Direction);
    return;
  }

  newPos = [
    pos[0] + coordinates[direction][0],
    pos[1] + coordinates[direction][1],
  ];

  navigateMaze(newPos, direction);
}

function findOptimalStartPos(): number {
  let result = 0;

  //DOWN
  for (let i = 0; i < maze[0].length; i++) {
    navigateMaze([0, i], 'down');
    result = visited.size > result ? visited.size : result;

    loops.clear();
    visited.clear();
  }

  //UP
  for (let i = 0; i < maze[0].length; i++) {
    navigateMaze([maze.length - 1, i], 'up');
    result = visited.size > result ? visited.size : result;

    loops.clear();
    visited.clear();
  }

  //RIGHT
  for (let i = 0; i < maze.length; i++) {
    navigateMaze([i, 0], 'right');
    result = visited.size > result ? visited.size : result;

    loops.clear();
    visited.clear();
  }

  //LEFT
  for (let i = 0; i < maze.length; i++) {
    navigateMaze([i, maze[0].length - 1], 'left');
    result = visited.size > result ? visited.size : result;

    loops.clear();
    visited.clear();
  }

  return result;
}

function firstPart() {
  maze = readInput('16/input')
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  navigateMaze([0, 0], 'right');

  return visited.size;
}

function secondPart() {
  maze = readInput('16/input')
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  return findOptimalStartPos();
}

console.log(firstPart());
console.log(secondPart());
