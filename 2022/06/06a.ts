import input from './input';

import prepareInput from './helpers/prepareInput';

const inputStr = prepareInput(input);

function findMarker(buffer: string) {
  let currIdx = 0;

  while (currIdx < buffer.length) {
    const slice = new Set(buffer.slice(currIdx, currIdx + 4));

    if (slice.size === 4) {
      return currIdx + 4;
    }
    currIdx++;
  }
}

console.log(findMarker(inputStr));
