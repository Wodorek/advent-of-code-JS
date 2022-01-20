import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const checkPassphrase = (pass: string) => {
  const words: { [key: string]: number }[] = [];

  const split = pass.split(' ');

  for (let i = 0; i < split.length; i++) {
    const word = split[i];

    const letterCounts: { [key: string]: number } = {};

    word.split('').forEach((letter) => {
      if (letterCounts[letter]) {
        letterCounts[letter]++;
      } else {
        letterCounts[letter] = 1;
      }
    });

    for (let j = 0; j < words.length; j++) {
      const existingLetters = Object.keys(words[j]).sort();
      const wordLetters = Object.keys(letterCounts).sort();

      const existingCounts = existingLetters.map((el) => {
        return words[j][el];
      });

      const wordCounts = wordLetters.map((el) => {
        return letterCounts[el];
      });

      //I am sorry for that
      if (
        JSON.stringify(existingLetters) === JSON.stringify(wordLetters) &&
        JSON.stringify(existingCounts) === JSON.stringify(wordCounts)
      ) {
        return false;
      }
    }

    words.push(letterCounts);
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
