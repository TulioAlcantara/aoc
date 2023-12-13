import { readFileSync } from 'fs';
export const readInput = (filePath: string): string => {
  return readFileSync(filePath).toString();
};

export const splitLines = (input: string): string[] => {
  return input.split('\n').filter((line) => line.length > 0);
};
