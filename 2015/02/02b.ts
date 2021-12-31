import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const calculateArea = (l: number, w: number, h: number) => {
  const ribbon = [l, w, h]
    .sort((a, b) => a - b)
    .slice(0, 2)
    .reduce((prev, val) => {
      return (prev += val * 2);
    }, 0);

  const bow = l * w * h;

  return ribbon + bow;
};

let totalNeeded = 0;

inputArr.forEach((box) => {
  totalNeeded += calculateArea(box[0], box[1], box[2]);
});

console.log(totalNeeded);
