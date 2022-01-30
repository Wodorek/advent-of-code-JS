import input from './input';

import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

const startingPieces = inputArr.filter((el) => {
  return el[0] === 0 || el[1] === 0;
});

let builtBridges: [number[], number[][]][] = [];

startingPieces.forEach((piece) => {
  builtBridges.push([
    [Math.max(...piece), Math.max(...piece)],
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
  const [totals, socket] = bridge;

  const bridges: [number[], number[][]][] = [];

  pieces.forEach((piece, pIdx) => {
    if (socket === piece[0]) {
      bridges.push([
        [totals + piece[1] + piece[0], piece[1]],
        pieces.filter((_, idx) => {
          return idx !== pIdx;
        }),
      ]);
    }

    if (socket === piece[1]) {
      bridges.push([
        [totals + piece[0] + piece[1], piece[0]],
        pieces.filter((_, idx) => {
          return idx !== pIdx;
        }),
      ]);
    }
  });

  return bridges;
};

let strongestBridge = -Infinity;

while (builtBridges.length > 0) {
  const bridge = builtBridges.pop()!;

  const nextBridges = attachPieces(bridge[0], bridge[1]);

  if (nextBridges.length === 0) {
    strongestBridge = Math.max(strongestBridge, bridge[0][0]);
  } else {
    builtBridges = [...builtBridges, ...nextBridges];
  }
}

console.log(strongestBridge);
