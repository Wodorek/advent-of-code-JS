import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr[inputArr.length - 1]);

const possibleOperations = [
  'addr',
  'addi',
  'mulr',
  'muli',
  'banr',
  'bani',
  'setr',
  'seti',
  'gtir',
  'gtri',
  'gtrr',
  'eqir',
  'eqri',
  'eqrr',
];

const processOperations = (
  operation: string,
  before: number[],
  after: number[],
  A: number,
  B: number,
  C: number
) => {
  const newRegisters = [...before];

  if (operation === 'addr') {
    newRegisters[C] = before[A] + before[B];
  }

  if (operation === 'addi') {
    newRegisters[C] = before[A] + B;
  }

  if (operation === 'mulr') {
    newRegisters[C] = before[A] * before[B];
  }

  if (operation === 'muli') {
    newRegisters[C] = before[A] * B;
  }

  if (operation === 'banr') {
    newRegisters[C] = before[A] & before[B];
  }

  if (operation === 'bani') {
    newRegisters[C] = before[A] & B;
  }

  if (operation === 'setr') {
    newRegisters[C] = before[A];
  }

  if (operation === 'seti') {
    newRegisters[C] = A;
  }

  if (operation === 'gtir') {
    newRegisters[C] = A > before[B] ? 1 : 0;
  }

  if (operation === 'gtri') {
    newRegisters[C] = before[A] > B ? 1 : 0;
  }

  if (operation === 'gtrr') {
    newRegisters[C] = before[A] > before[B] ? 1 : 0;
  }

  if (operation === 'eqir') {
    newRegisters[C] = A === before[B] ? 1 : 0;
  }

  if (operation === 'eqri') {
    newRegisters[C] = before[A] === B ? 1 : 0;
  }

  if (operation === 'eqrr') {
    newRegisters[C] = before[A] === before[B] ? 1 : 0;
  }

  return newRegisters.join('') === after.join('');
};

const count = (
  before: number[],
  after: number[],
  A: number,
  B: number,
  C: number
) => {
  let matching = 0;

  possibleOperations.forEach((operation) => {
    const isPossible = processOperations(operation, before, after, A, B, C);

    if (isPossible) {
      matching++;
    }
  });

  return matching >= 3;
};

let total = 0;

inputArr.forEach((el) => {
  const isHigher = count(el[0], el[2], el[1][1], el[1][2], el[1][3]);

  if (isHigher) {
    total++;
  }
});

console.log(total);
