import input from './input';

import prepareInput from './helpers/prepareInput';

interface IStacks {
  [key: number]: string[];
}

const [initialPositions, moves] = prepareInput(input);

function populateStacks(initial: string[][]) {
  const stacks: IStacks = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  };

  initial.forEach((line) => {
    line.forEach((char, idx) => {
      if (char !== ' ') {
        stacks[(idx - 1) / 4 + 1].push(char);
      }
    });
  });

  return stacks;
}

const stacks = populateStacks(initialPositions);

function moveItems(stacks: IStacks, move: number[]) {
  const [size, from, to] = move;

  const itemsToMove = stacks[from].splice(0, size);

  stacks[to].unshift(...itemsToMove);
}

moves.forEach((move) => {
  moveItems(stacks, move);
});

let outcome = '';

Object.values(stacks).forEach((stack) => {
  outcome = outcome + stack[0];
});

console.log(outcome);
