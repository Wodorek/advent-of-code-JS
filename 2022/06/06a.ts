import input from './input';

import prepareInput from './helpers/prepareInput';

const inputStr = prepareInput(input);

const windowSize = 4;

function findMarker(buffer: string) {
  let currIdx = 0;

  while (currIdx < buffer.length) {
    const slice = new Set(buffer.slice(currIdx, currIdx + windowSize));

    if (slice.size === windowSize) {
      return currIdx + windowSize;
    }
    currIdx++;
  }
}

console.log(findMarker(inputStr));
