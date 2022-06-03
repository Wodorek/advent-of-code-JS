import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

function findLoopSize(expectedResult: number) {
  let value = 1;
  const subjectNumber = 7;
  const divider = 20201227;

  let iterations = 0;
  while (value !== expectedResult) {
    iterations++;
    value = value * subjectNumber;
    value = value % divider;
  }

  return iterations;
}

const loopSizes = [findLoopSize(inputArr[0]), findLoopSize(inputArr[1])];

function findHandshake(publicKey: number, loopSize: number) {
  let value = 1;
  const subjectNumber = publicKey;
  const divider = 20201227;

  for (let i = 0; i < loopSize; i++) {
    value = value * subjectNumber;
    value = value % divider;
  }

  return value;
}

console.log(findHandshake(inputArr[0], loopSizes[1]));
