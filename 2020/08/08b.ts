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

const possibleChangeIndexes = [];

for (let i = 0; i < inputArr.length; i++) {
  const operation = inputArr[i][0];

  if (operation === 'jmp' || operation === 'nop') {
    possibleChangeIndexes.push(i);
  }
}

while (possibleChangeIndexes.length > 0 && !exit) {
  const changeIdx = possibleChangeIndexes.pop()!;

  while (!exit) {
    if (currIdx > inputArr.length - 1) {
      console.log('this is the one!');
      exit = true;
      break;
    }

    let operation = inputArr[currIdx][0];

    if (currIdx === changeIdx) {
      if (operation === 'jmp') {
        operation = 'nop';
      } else if (operation === 'nop') {
        operation = 'jmp';
      }
    }

    if (lookup[currIdx] === 1) {
      acc = 0;
      currIdx = 0;

      lookup = [];
      lookup.fill(0);
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
}

console.log(acc);
