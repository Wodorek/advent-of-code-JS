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

for (let i = 0; i < inputArr.length; i += 3) {
  const triangle1 = [inputArr[i][0], inputArr[i + 1][0], inputArr[i + 2][0]];
  const triangle2 = [inputArr[i][1], inputArr[i + 1][1], inputArr[i + 2][1]];
  const triangle3 = [inputArr[i][2], inputArr[i + 1][2], inputArr[i + 2][2]];

  [triangle1, triangle2, triangle3].forEach((triangle) => {
    if (checkIfValidTriangle(triangle)) {
      validOnes++;
    }
  });
}

console.log(validOnes);
