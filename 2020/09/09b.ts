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

const sumUpWindow = (arr: number[], lookFor: number, startFrom: number) => {
  let numbers: number[] = [];

  let sum = 0;

  let idx = startFrom;

  while (idx > 0) {
    sum += arr[idx];

    numbers.push(arr[idx]);

    if (sum === lookFor) {
      return numbers;
    }

    idx--;
  }

  return [];
};

let window: number[] = [];

while (window.length === 0) {
  window = sumUpWindow(inputArr, found, idx);
  idx--;
}

const max = Math.max(...window);
const min = Math.min(...window);

console.log(min + max);
