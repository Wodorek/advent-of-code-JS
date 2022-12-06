import input from './input';

import prepareInput from './helpers/prepareInput';

const inputStr = prepareInput(input);

function findMarker(buffer: string) {
  let currIdx = 0;

  while (currIdx < buffer.length) {
    const slice = new Set(buffer.slice(currIdx, currIdx + 14));

    if (slice.size === 14) {
      return currIdx + 14;
    }
    currIdx++;
  }
}

console.log(findMarker(inputStr));
