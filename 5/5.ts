import { readInput } from '../utils';

type fromTo = {
  fromRange: number[];
  toRange: number[];
};

const allFromTo: fromTo[][] = [];

const prepareFromTo = (almanac: string[]) => {
  for (let i = 1; i < almanac.length; i++) {
    const section = almanac[i]
      .split('\n')
      .slice(1)
      .map((el) => el.split(' ').map((el) => Number(el)));

    const aux: fromTo[] = [];

    for (const item of section) {
      aux.push({
        fromRange: [item[1], item[1] + item[2] - 1],
        toRange: [item[0], item[0] + item[2] - 1],
      });
    }

    allFromTo.push(aux);
  }
};

const findLowestLocation = (seeds: number[]): number => {
  let lowest = 0;
  for (let seed of seeds) {
    let nextPosition = seed;
    for (let fromTo of allFromTo) {
      const target = fromTo.find(
        (el) =>
          nextPosition <= el.fromRange[1] && nextPosition >= el.fromRange[0]
      );
      if (target) {
        const toPosition = nextPosition - target.fromRange[0];
        nextPosition = target.toRange[0] + toPosition;
      }
    }
    if (lowest == 0) {
      lowest = nextPosition;
      continue;
    }
    lowest = nextPosition < lowest ? nextPosition : lowest;
  }
  return lowest;
};

const findLowestLocation2 = (seedsRange: number[][]): number => {
  let lowest = 0;
  for (let seedRange of seedsRange) {
    console.log(seedRange);
    for (let i = 0; i < seedRange[1]; i++) {
      let nextPosition = seedRange[0] + i;
      for (let fromTo of allFromTo) {
        const target = fromTo.find(
          (el) =>
            nextPosition <= el.fromRange[1] && nextPosition >= el.fromRange[0]
        );
        if (target) {
          const toPosition = nextPosition - target.fromRange[0];
          nextPosition = target.toRange[0] + toPosition;
        }
      }
      if (lowest == 0) {
        lowest = nextPosition;
        continue;
      }
      lowest = nextPosition < lowest ? nextPosition : lowest;
    }
  }
  return lowest;
};

const getSeedsRange = (seeds: number[]): number[][] => {
  const seedsRange: number[][] = [];
  for (let i = 0; i < seeds.length; i = i + 2) {
    let seedRange = [seeds[i], seeds[i + 1]];
    seedsRange.push(seedRange);
  }
  return seedsRange;
};

const firstPart = () => {
  const input = readInput('5/input');
  const sections = input.trim().split('\n\n');

  const seeds = sections[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((el) => Number(el));

  prepareFromTo(sections);
  return findLowestLocation(seeds);
};

const secondPart = () => {
  const input = readInput('5/input');
  const sections = input.trim().split('\n\n');

  const seeds = sections[0]
    .split(':')[1]
    .trim()
    .split(' ')
    .map((el) => Number(el));

  prepareFromTo(sections);
  const seedsRange = getSeedsRange(seeds);
  return findLowestLocation2(seedsRange);
};

console.log(firstPart());
// console.log(secondPart());
