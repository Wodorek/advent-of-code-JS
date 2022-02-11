import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let currIdx = 0;
const metadata: number[] = [];

const parse = () => {
  const numberOfChildren = inputArr[currIdx];
  const metaLen = inputArr[currIdx + 1];

  currIdx += 2;

  if (numberOfChildren === 0) {
    for (let i = 0; i < metaLen; i++) {
      metadata.push(inputArr[currIdx]);
      currIdx++;
    }
  } else {
    for (let i = 0; i < numberOfChildren; i++) {
      parse();
    }

    for (let j = 0; j < metaLen; j++) {
      metadata.push(inputArr[currIdx]);
      currIdx++;
    }
  }
};

parse();

console.log(
  metadata.reduce((prev, val) => {
    return prev + val;
  }, 0)
);
