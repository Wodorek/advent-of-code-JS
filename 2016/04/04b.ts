import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const shiftLetter = (letter: string, by: number) => {
  const currIdx = alphabet.indexOf(letter);

  let newIdx = currIdx + by;

  while (newIdx > alphabet.length - 1) {
    newIdx = newIdx - alphabet.length;
  }

  return alphabet[newIdx];
};

const decipherName = (room: [string[], [number, string]]) => {
  const newRoomName = room[0]
    .map((word) => {
      return word
        .split('')
        .map((letter) => {
          return shiftLetter(letter, room[1][0]);
        })
        .join('');
    })
    .join(' ');

  return newRoomName;
};

inputArr.forEach((room) => {
  const newName = decipherName(room);

  if (newName === 'northpole object storage') {
    console.log(room[1][0]);
  }
});
