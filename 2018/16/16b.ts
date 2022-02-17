import input from './input';

import prepareInput from './helpers/prepareInput';
import part2 from './part2';

let inputArr = prepareInput(input);

console.log(inputArr[inputArr.length - 1]);

let possibleOperations = [
  'addr',
  'addi',
  'mulr',
  'muli',
  'banr',
  'bani',
  'boor',
  'bori',
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

  if (operation === 'boor') {
    newRegisters[C] = before[A] | before[B];
  }

  if (operation === 'bori') {
    newRegisters[C] = before[A] | B;
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

  return newRegisters;
};

const count = (
  before: number[],
  after: number[],
  idx: number,
  A: number,
  B: number,
  C: number
) => {
  let matching: string[][] = [];

  possibleOperations.forEach((operation) => {
    const processed = processOperations(operation, before, A, B, C);

    if (processed.join('') === after.join('')) {
      matching.push([idx.toString(), operation]);
    }
  });

  return matching;
};

let total = 0;

const mapped: { [key: string]: string } = {};

while (Object.keys(mapped).length < 16) {
  inputArr.forEach((el) => {
    const matches = count(el[0], el[2], el[1][0], el[1][1], el[1][2], el[1][3]);

    if (matches.length === 1) {
      mapped[matches[0][0]] = matches[0][1];
    }
  });

  const found = Object.values(mapped);
  const vals = Object.keys(mapped).map(Number);

  possibleOperations = possibleOperations.filter((el) => {
    return !found.includes(el);
  });

  inputArr = inputArr.filter((el) => {
    return !vals.includes(el[1][0]);
  });
}

console.log(mapped);

let registers = [0, 0, 0, 0];

part2.forEach((instruction) => {
  registers = processOperations(
    mapped[instruction[0]],
    registers,
    instruction[1],
    instruction[2],
    instruction[3]
  );
});

console.log(registers[0]);
