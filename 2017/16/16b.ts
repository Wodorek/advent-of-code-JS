import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let dancers = 'abcdefghijklmnop';

const startingPosition = 'abcdefghijklmnop';

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

const getActualDances = () => {
  // find the formula for numbers at which dancers are in the starting position

  // let idxs = [];

  // let idx = 0;
  // while (idxs.length < 10) {
  //   inputArr.forEach((move) => {
  //     dancers = danceAMove(dancers, move);
  //   });

  //   if (dancers === startingPosition) {
  //     idxs.push(idx);
  //   }
  //   idx++;
  // }
  // the formula turns out to be  an =  42n - 1

  let iter = 1;
  let curr = 0;
  let prev = 0;

  while (curr < 1000000000) {
    prev = curr;
    curr = 42 * iter - 1;

    iter++;
  }

  return prev;
};

console.log(getActualDances());

const dancesToDo = 1000000000 - getActualDances();

console.log(dancesToDo);

for (let i = 0; i < dancesToDo - 1; i++) {
  inputArr.forEach((move) => {
    dancers = danceAMove(dancers, move);
  });
}

console.log(dancers);
