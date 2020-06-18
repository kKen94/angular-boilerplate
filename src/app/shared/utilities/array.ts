export const concat = <T>(...args: T[][]): T[] =>
  args.reduce((acc, val) => [...acc, ...val]);
