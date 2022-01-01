import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const checkIfValidTriangle = (sides: number[]) => {
  const [side1, side2, side3] = sides;

  if (side1 + side2 > side3 && side2 + side3 > side1 && side1 + side3 > side2) {
    return true;
  }

  return false;
};

let validOnes = 0;

inputArr.forEach((el) => {
  if (checkIfValidTriangle(el)) {
    validOnes++;
  }
});

console.log(validOnes);
