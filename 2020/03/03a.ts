import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

const lineLength = inputArr[0].length;

const slopeHeight = inputArr.length - 1;
let posX = 0;
let posY = 0;

let trees = 0;

while (posY < slopeHeight) {
  posY++;
  posX += 3;

  if (posX > lineLength - 1) {
    posX = posX - lineLength;
  }

  if (inputArr[posY][posX] === '#') {
    trees++;
  }
}

console.log(trees);
