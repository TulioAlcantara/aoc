import { readFileSync } from 'fs';
export const readInput = (filePath: string): string => {
  const input = readFileSync(filePath).toString();
  return input;
};

export const splitLines = (input: string): string[] => {
  return input.split('\n').filter((line) => line.length > 0);
};
