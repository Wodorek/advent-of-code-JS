import input from './input';
import { modInv, modPow } from 'bigint-crypto-utils';

const prepareInput = (rawInput: string, parse: Function) =>
  rawInput.split('\n').map((x) => {
    if (x.startsWith('deal with')) {
      return { type: 'inc', val: parse(x.split('deal with increment ')[1]) };
    }
    if (x.startsWith('deal into')) {
      return { type: 'rev' };
    }
    if (x.startsWith('cut')) {
      return { type: 'cut', val: parse(x.split('cut')[1]) };
    }
  });

const solve = (rawInput: string) => {
  const moves = prepareInput(rawInput, BigInt);
  const times = 101741582076661n;
  const deckSize = 119315717514047n;
  const cardPosition = 2020n;

  let incMultiplier = 1n;
  let offsetDiff = 0n;
  moves.forEach((move) => {
    const { type, val } = move as { type: any; val: any };

    switch (type) {
      case 'rev': {
        incMultiplier = -incMultiplier % deckSize;
        offsetDiff = (offsetDiff + incMultiplier) % deckSize;
        break;
      }
      case 'cut': {
        offsetDiff = (offsetDiff + val * incMultiplier) % deckSize;
        break;
      }
      case 'inc': {
        incMultiplier = (incMultiplier * modInv(val, deckSize)) % deckSize;
        break;
      }
    }
  });

  const inc: bigint = modPow(incMultiplier, times, deckSize);

  let offset =
    (offsetDiff *
      (1n - inc) *
      modInv((1n - incMultiplier) % deckSize, deckSize)) %
    deckSize;

  return Number((offset + inc * cardPosition) % deckSize);
};

console.log(solve(input));
