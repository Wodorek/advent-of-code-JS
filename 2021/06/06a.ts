import input from './input';
import prepareInput from './prepareInput';

let inputArr = prepareInput(input);

//this is a "naive" solution, that will cause problems with more days (iterations). See the 06b.ts for a solution that works with way larger number of iteration, with better O.
for (let i = 0; i < 80; i++) {
  for (let j = 0; j < inputArr.length; j++) {
    if (inputArr[j] === 0) {
      inputArr[j] = 6;
      inputArr.push(9);
    } else {
      inputArr[j]--;
    }
  }
}

console.log(inputArr.length);
