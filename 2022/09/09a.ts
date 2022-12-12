import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const moves = {
  D: { x: 0, y: -1 },
  U: { x: 0, y: 1 },
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
};
