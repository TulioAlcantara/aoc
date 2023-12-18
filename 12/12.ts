import { readInput } from '../utils';

type Spring = {
  instructions: number[];
  row: string;
};

const getBlockCombinations = (block: string, insts: number[]): number => {
  if (insts.length == 1) {
    return block.length - insts[0] + 1;
  }

  let instsSum = insts.reduce((acc, el) => acc + el, 0);
  let minBlockSize = instsSum + insts.length - 1;

  if (minBlockSize == block.length) {
    return 1;
  }

  console.log(block, insts);

  return 0;
};

const getAllCombinations = (spring: Spring): number => {
  let blocks = spring.row.split('.').filter((el) => el !== '');
  let insts = spring.instructions;
  let combinations = 1;

  for (const block of blocks) {
    if (block.split('').every((el) => el == '#')) {
      insts.shift();
      continue;
    }

    let possibleInst: number[] = [];
    let possibleInstsSum = 0;
    let blockSize = block.length;

    for (let i = 0; i < insts.length; i++) {
      let firstIteration = i == 0 ? 0 : 1;
      if (possibleInstsSum + insts[i] + firstIteration > blockSize) break;
      possibleInst.push(insts[i]);
      possibleInstsSum += insts[i] + firstIteration;
    }

    possibleInst.forEach(() => insts.shift());
    combinations *= getBlockCombinations(block, possibleInst);
  }

  return combinations;
};

const firstPart = () => {
  const rows = readInput('12/input').trim().split('\n');

  const springs: Spring[] = rows.map((row) => {
    return {
      instructions: row
        .split(' ')[1]
        .split(',')
        .map((el) => Number(el)),
      row: row.split(' ')[0],
    } as Spring;
  });

  let total = 0;
  springs.forEach((spring) => {
    total += getAllCombinations(spring);
  });
};

console.log(firstPart());
