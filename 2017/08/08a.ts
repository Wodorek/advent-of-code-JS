import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const createRegisters = (arr: string[][]) => {
  const registers: { [key: string]: number } = {};

  arr.forEach((line) => {
    if (!registers[line[1]]) {
      registers[line[1]] = 0;
    }

    if (!registers[line[3]]) {
      registers[line[3]] = 0;
    }
  });

  return registers;
};

const executeInstruction = (instruction: string[]) => {
  const [op, target, val, conTarget, con, conVal] = instruction;

  const modifier = op === 'inc' ? 1 : -1;

  if (con === '>') {
    if (registers[conTarget] > +conVal) {
      registers[target] += +val * modifier;
    }
  }

  if (con === '<')
    if (registers[conTarget] < +conVal) {
      registers[target] += +val * modifier;
    }

  if (con === '<=')
    if (registers[conTarget] <= +conVal) {
      registers[target] += +val * modifier;
    }

  if (con === '>=')
    if (registers[conTarget] >= +conVal) {
      registers[target] += +val * modifier;
    }

  if (con === '==')
    if (registers[conTarget] === +conVal) {
      registers[target] += +val * modifier;
    }

  if (con === '!=')
    if (registers[conTarget] !== +conVal) {
      registers[target] += +val * modifier;
    }
};

const registers = createRegisters(inputArr);

inputArr.forEach((instruction) => {
  executeInstruction(instruction);
});

console.log(Math.max(...Object.values(registers)));
