import input from './input';

import prepareInput from './helpers/prepareInput';

//[p [num,num,num], v[num,num,num], a[num,num,num]][]
const inputArr = prepareInput(input);

console.log(inputArr.length);

let maxAcceleration = Infinity;
let minIdx = 0;

inputArr.forEach((el, idx) => {
  const totalAcceleration = el[2].reduce((prev, val) => {
    return prev + Math.abs(val);
  }, 0);

  if (totalAcceleration < maxAcceleration) {
    minIdx = idx;
    maxAcceleration = Math.min(maxAcceleration, totalAcceleration);
  }
});

console.log(minIdx);
