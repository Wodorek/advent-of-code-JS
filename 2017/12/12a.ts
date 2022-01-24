import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const checkPrograms = (root: number) => {
  const queue = [root];

  const checked: Set<number> = new Set();

  while (queue.length > 0) {
    const item = queue.pop()!;

    const connections = inputArr[item];

    connections.forEach((connection) => {
      if (!checked.has(connection)) {
        queue.push(connection);
        checked.add(connection);
      }
    });
  }

  return checked.size;
};

console.log(checkPrograms(0));
