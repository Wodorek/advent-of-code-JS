import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const nums: number[] = [];

for (let i = 0; i < 256; i++) {
  nums.push(i);
}

let skipSize = 0;
let position = 0;

const executeInstruction = (arr: number[], pos: number, size: number) => {
  const end = pos + size > arr.length ? arr.length : pos + size;

  const newArr = arr.map((el) => {
    return el;
  });

  if (size > 255) {
    return newArr;
  }

  const idxs: number[] = [];
  const values: number[] = [];

  for (let i = pos; i < end; i++) {
    values.push(arr[i]);
    idxs.push(i);
  }

  let idx = 0;

  while (values.length !== size) {
    values.push(arr[idx]);
    idxs.push(idx);
    idx++;
  }

  values.reverse();

  if (values.length === arr.length) {
    return values;
  }

  for (let i = 0; i < idxs.length; i++) {
    newArr[idxs[i]] = values[i];
  }

  position += size + skipSize;
  while (position > arr.length - 1) {
    position = position - arr.length;
  }
  skipSize++;

  return newArr;
};

let arr = nums;

const tests = inputArr;

tests.forEach((el) => {
  arr = executeInstruction(arr, position, el);
  console.log(arr);
});
console.log(arr[0] * arr[1]);
