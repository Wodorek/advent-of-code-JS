import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let checksum = 0;

inputArr.forEach((line) => {
  let left = 0;
  let right = 0;

  while (left < line.length) {
    if (line[left] > line[right] && line[left] % line[right] === 0) {
      checksum += line[left] / line[right];
    }

    if (line[right] > line[left] && line[right] % line[left] === 0) {
      checksum += line[right] / line[left];
    }

    right++;

    if (right >= line.length) {
      left++;
      right = left + 1;
    }
  }
});

console.log(2 % 8);

console.log(checksum);
