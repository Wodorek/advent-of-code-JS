import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const initialDiscs: { [key: string]: { positions: number; current: number } } =
  {};

inputArr.forEach((disc) => {
  initialDiscs[disc[0]] = { positions: disc[1], current: disc[2] };
});

const advanceDiscs = (
  discs: {
    [key: string]: { positions: number; current: number };
  },
  by: number
) => {
  const discsKeys = Object.keys(discs);

  //can you find a more dirty way to copy an object?
  const newDiscs = JSON.parse(JSON.stringify(discs));

  discsKeys.forEach((key) => {
    let newIdx = (newDiscs[key].current + by) % newDiscs[key].positions;

    if (newIdx < 0) {
      newIdx = newDiscs[key].positions + newIdx;
    }

    newDiscs[key].current = newIdx;
  });

  return newDiscs;
};

const canWin = (
  discs: {
    [key: string]: { positions: number; current: number };
  },
  idx: number
) => {
  discs = advanceDiscs(discs, idx + 1);

  for (let j = 1; j < inputArr.length + 1; j++) {
    if (discs[j].current !== 0) {
      return false;
    }
    discs = advanceDiscs(discs, 1);
  }

  return true;
};

let currTime = 0;

while (!canWin(initialDiscs, currTime)) {
  currTime++;
}

console.log(currTime);

console.log(canWin(initialDiscs, 5));
