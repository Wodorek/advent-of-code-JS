import input from './input';
import prepareInput from './helpers/prepareInput';
import findIfSum from './helpers/findIfSum';

const inputArr = prepareInput(input);

let found = 0;
let idx = 0;
let lookupIdx = 26;

while (found === 0) {
  const slice = inputArr.slice(idx, idx + 26);

  if (!findIfSum(slice, inputArr[lookupIdx])) {
    found = inputArr[lookupIdx];
  }

  idx++;
  lookupIdx++;
}

console.log(found);
