import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const roomIsReal = (room: [string[], [number, string]]) => {
  const letterCounts: { [key: string]: number } = {};

  room[0].forEach((line) => {
    line.split('').forEach((char) => {
      if (letterCounts[char]) {
        letterCounts[char]++;
      } else {
        letterCounts[char] = 1;
      }
    });
  });

  let previousLetterCount = Infinity;
  let previousLetter = 'Z';

  let isReal = true;

  room[1][1].split('').forEach((letter) => {
    const letterCount = letterCounts[letter];

    if (!letterCounts[letter]) {
      isReal = false;
    }

    if (letterCount > previousLetterCount) {
      isReal = false;
    }

    if (letterCount === previousLetterCount) {
      if (letter.charCodeAt(0) < previousLetter.charCodeAt(0)) {
        isReal = false;
      }
    }

    previousLetterCount = letterCount;
    previousLetter = letter;
  });

  return isReal;
};

let idSum = 0;

inputArr.forEach((room) => {
  if (roomIsReal(room)) {
    idSum += room[1][0];
  }
});

console.log(idSum);
