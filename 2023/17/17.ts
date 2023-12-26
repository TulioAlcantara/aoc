import { readInput } from '../utils';

let maze: number[][] = [];

type QueueItem = {
  heat: number;
  position: number[];
  direction: string;
  path?: string;
};

function outOfBounds(position: number[]): boolean {
  return (
    position[0] < 0 ||
    position[0] >= maze.length ||
    position[1] < 0 ||
    position[1] >= maze[0].length
  );
}

const getAdjacents = (position: number[]): QueueItem[] => {
  let adjacents = [
    {
      heat: 0,
      position: [position[0] - 1, position[1]],
      direction: 'N',
    },
    {
      heat: 0,
      position: [position[0] + 1, position[1]],
      direction: 'S',
    },
    {
      heat: 0,
      position: [position[0], position[1] - 1],
      direction: 'W',
    },
    {
      heat: 0,
      position: [position[0], position[1] + 1],
      direction: 'E',
    },
  ];

  return adjacents.filter((adj) => !outOfBounds(adj.position));
};

const sortQueue = (queue: QueueItem[]): QueueItem[] => {
  return queue.sort((a, b) => {
    return a.heat - b.heat;
  });
};

const getOpositeDirection = (direction: string): string => {
  switch (direction) {
    case 'N':
      return 'S';
    case 'S':
      return 'N';
    case 'E':
      return 'W';
    case 'W':
      return 'E';
    default:
      return '';
  }
};

const findShortestPath = (): number => {
  let seen = new Set([JSON.stringify([0, 0])]);
  let queue: QueueItem[] = [
    {
      heat: maze[1][0],
      position: [1, 0],
      direction: 'S',
      path: 'S',
    },
    {
      heat: maze[0][1],
      position: [0, 1],
      direction: 'E',
      path: 'E',
    },
  ];

  queue = sortQueue(queue);

  while (queue.length > 0) {
    let current: QueueItem = queue.shift()!;

    if (seen.has(JSON.stringify(current.position))) continue;
    seen.add(JSON.stringify(current.position));

    if (
      current.position[0] === maze.length - 1 &&
      current.position[1] === maze[0].length - 1
    ) {
      console.log(current.path);
      return current.heat;
    }

    getAdjacents(current.position)
      .filter(
        (adj) =>
          !seen.has(JSON.stringify(adj.position)) ||
          adj.direction !== getOpositeDirection(current.direction[0])
      )
      .map((adj) =>
        queue.push({
          ...adj,
          path: current.path + adj.direction,
          heat: current.heat + maze[adj.position[0]][adj.position[1]],
          direction:
            current.direction[0] == adj.direction[0]
              ? current.direction + adj.direction
              : adj.direction,
        })
      );

    queue = sortQueue(queue).filter((q) => q.direction.length <= 3);
    console.log(queue);
  }

  return 0;
};

const firstPart = () => {
  maze = readInput('17/input')
    .trim()
    .split('\n')
    .map((line) => line.split('').map((el) => Number(el)));

  return findShortestPath();
};

console.log(firstPart());
