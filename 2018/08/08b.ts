import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let currIdx = 0;

const parse = () => {
  const numberOfChildren = inputArr[currIdx];
  const metaLen = inputArr[currIdx + 1];

  currIdx += 2;

  let metaSum = 0;

  if (numberOfChildren === 0) {
    for (let i = 0; i < metaLen; i++) {
      metaSum += inputArr[currIdx];
      currIdx++;
    }
  } else {
    const values = [];

    for (let i = 0; i < numberOfChildren; i++) {
      values.push(parse());
    }

    for (let j = 0; j < metaLen; j++) {
      const val = inputArr[currIdx];
      if (val >= 1 && val <= values.length) {
        metaSum += values[val - 1];
      }
      currIdx++;
    }
  }

  return metaSum;
};

console.log(parse());
