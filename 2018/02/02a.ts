import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const sumUpLetters = (str: string) => {
  const split = str.split('');

  const letterCounts: { [key: string]: number } = {};

  split.forEach((letter) => {
    if (letterCounts[letter]) {
      letterCounts[letter]++;
    } else {
      letterCounts[letter] = 1;
    }
  });

  const values = [0, 0];

  if (Object.values(letterCounts).includes(2)) {
    values[0] = 1;
  }

  if (Object.values(letterCounts).includes(3)) {
    values[1] = 1;
  }

  return values;
};

let twos = 0;
let threes = 0;

inputArr.forEach((line) => {
  const [has2, has3] = sumUpLetters(line);

  twos += has2;
  threes += has3;
});

console.log(twos * threes);
