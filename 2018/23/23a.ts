import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function calculateDistance(from: number[], to: number[]) {
  const [x, y, z] = from;
  const [dx, dy, dz] = to;

  return Math.abs(x - dx) + Math.abs(y - dy) + Math.abs(z - dz);
}

function findStrongest(bots: number[][]) {
  let biggestRadius = -Infinity;
  let idx = -1;

  bots.forEach((bot, botIdx) => {
    if (bot[3] > biggestRadius) {
      biggestRadius = bot[3];
      idx = botIdx;
    }
  });

  return idx;
}

function solve() {
  const strongest = inputArr[findStrongest(inputArr)];

  const from = strongest.slice(0, 3);
  const power = strongest[3];

  let inRange = 0;

  inputArr.forEach((probe) => {
    const distance = calculateDistance(from, probe.slice(0, 3));

    if (power >= distance) {
      inRange++;
    }
  });

  return inRange;
}

console.log(solve());
