export const concat = <T>(...args: T[][]): T[] =>
  args.reduce((acc, val) => [...acc, ...val]);

export const sum = (arr: number[]): number =>
  arr.reduce((reducer, x) => reducer + x);
