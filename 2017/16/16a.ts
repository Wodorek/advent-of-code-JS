import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let dancers = 'abcdefghijklmnop';

const danceAMove = (programs: string, move: (string | number)[]) => {
  const split = programs.split('');

  if (move[0] === 's') {
    const removed = split.splice(split.length - +move[1]);

    return [...removed, ...split].join('');
  }

  if (move[0] === 'x') {
    split[+move[1]] = programs[+move[2]];
    split[+move[2]] = programs[+move[1]];

    return split.join('');
  }

  if (move[0] === 'p') {
    const idx1 = programs.indexOf(move[1].toString());
    const idx2 = programs.indexOf(move[2].toString());

    split[idx1] = programs[idx2];
    split[idx2] = programs[idx1];

    return split.join('');
  }

  return split.join('');
};

inputArr.forEach((move) => {
  dancers = danceAMove(dancers, move);
});

console.log(dancers);
