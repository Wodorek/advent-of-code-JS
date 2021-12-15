import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

//0 means instruction at index was not executed, 1 means it was
let lookup: number[] = [];
lookup.length = inputArr.length;

lookup.fill(0);

let acc = 0;
let currIdx = 0;
let exit = false;

while (!exit) {
  const operation = inputArr[currIdx][0];

  if (lookup[currIdx] === 1) {
    break;
  }

  lookup[currIdx] = 1;

  if (operation === 'nop') {
    currIdx++;
  }

  if (operation === 'acc') {
    acc += inputArr[currIdx][1];
    currIdx++;
  }

  if (operation === 'jmp') {
    currIdx += inputArr[currIdx][1];
  }
}

console.log(acc);
