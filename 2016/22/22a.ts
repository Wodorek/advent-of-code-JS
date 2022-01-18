import input from './input';

import prepareInput from './helpers/prepareInput';

//[[x,y],size,used,avail,use%]
const inputArr = prepareInput(input);

let possiblePairs = 0;

let left = 0;
let right = 1;

while (left < inputArr.length - 1) {
  const leftNode = inputArr[left];
  const rightNode = inputArr[right];
  if (
    (leftNode[2] !== 0 && leftNode[2] <= rightNode[3]) ||
    (rightNode[2] !== 0 && rightNode[2] <= leftNode[3])
  ) {
    possiblePairs++;
  }

  if (right === inputArr.length - 1) {
    left++;
    right = left + 1;
  } else {
    right++;
  }
}

console.log(possiblePairs);
