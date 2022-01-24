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

  return checked;
};

let totalGroups = 0;

while (Object.keys(inputArr).length > 0) {
  totalGroups++;
  const currentGroup = Object.keys(inputArr)[0];

  const programsInGroup = checkPrograms(+currentGroup);

  for (let program of programsInGroup) {
    delete inputArr[program];
  }

  console.log(Object.keys(inputArr).length);
}

console.log(totalGroups);
