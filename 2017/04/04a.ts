import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const checkPassphrase = (pass: string) => {
  const words: string[] = [];

  const split = pass.split(' ');

  for (let i = 0; i < split.length; i++) {
    const word = split[i];

    if (words.includes(word)) {
      return false;
    }

    words.push(word);
  }

  return true;
};

let totalCorrect = 0;

inputArr.forEach((phrase) => {
  if (checkPassphrase(phrase)) {
    totalCorrect++;
  }
});

console.log(totalCorrect);
