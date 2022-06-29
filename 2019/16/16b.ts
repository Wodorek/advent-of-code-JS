import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const offset = +inputArr.slice(0, 7).join('');

const repeat = Math.ceil((inputArr.length * 10000 - offset) / inputArr.length);

const digits = [];

for (let i = 0; i < repeat; i++) {
  digits.push([inputArr]);
}

const final = digits.flat(3).slice(offset % inputArr.length);
console.log('here');

for (let i = 0; i < 100; i++) {
  for (let j = final.length - 2; j >= 0; j--) {
    const num = final[j] + final[j + 1];
    final[j] = Math.abs(num) % 10;
  }
}

console.log(final.slice(0, 8).join(''));
