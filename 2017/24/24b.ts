import input from './input';

import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

const startingPieces = inputArr.filter((el) => {
  return el[0] === 0 || el[1] === 0;
});

let builtBridges: [number[], number[][]][] = [];

startingPieces.forEach((piece) => {
  builtBridges.push([
    [1, Math.max(...piece), Math.max(...piece)],
    inputArr.filter((el) => {
      if (el[0] === piece[0] && el[1] === piece[1]) {
        return false;
      } else {
        return true;
      }
    }),
  ]);
});

const attachPieces = (bridge: number[], pieces: number[][]) => {
  const [len, totals, socket] = bridge;

  const bridges: [number[], number[][]][] = [];

  pieces.forEach((piece, pIdx) => {
    if (socket === piece[0]) {
      bridges.push([
        [len + 1, totals + piece[1] + piece[0], piece[1]],
        pieces.filter((_, idx) => {
          return idx !== pIdx;
        }),
      ]);
    }

    if (socket === piece[1]) {
      bridges.push([
        [len + 1, totals + piece[0] + piece[1], piece[0]],
        pieces.filter((_, idx) => {
          return idx !== pIdx;
        }),
      ]);
    }
  });

  return bridges;
};

let maxLen = 40;
let maxStrength = -Infinity;

//running below gives us maxLen of 40
// while (builtBridges.length > 0) {
//   const bridge = builtBridges.pop()!;

//   const nextBridges = attachPieces(bridge[0], bridge[1]);

//   if (nextBridges.length === 0) {
//     maxLen = Math.max(maxLen, bridge[0][0]);
//   } else {
//     builtBridges = [...builtBridges, ...nextBridges];
//   }
// }

//this gives actual answer
while (builtBridges.length > 0) {
  const bridge = builtBridges.pop()!;

  const nextBridges = attachPieces(bridge[0], bridge[1]);

  if (nextBridges.length === 0) {
    if (bridge[0][0] === maxLen) {
      maxStrength = Math.max(maxStrength, bridge[0][1]);
    }
  } else {
    builtBridges = [...builtBridges, ...nextBridges];
  }
}

console.log(maxStrength);
