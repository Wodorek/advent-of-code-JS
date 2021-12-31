import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const calculateArea = (l: number, w: number, h: number) => {
  const side1 = 2 * l * w;
  const side2 = 2 * w * h;
  const side3 = 2 * h * l;

  return side1 + side2 + side3 + Math.min(side1, side2, side3) / 2;
};

let totalNeeded = 0;

inputArr.forEach((box) => {
  totalNeeded += calculateArea(box[0], box[1], box[2]);
});

console.log(totalNeeded);
