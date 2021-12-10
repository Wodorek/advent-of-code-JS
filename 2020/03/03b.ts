import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

const lineLength = inputArr[0].length;

const slopeHeight = inputArr.length - 1;

const calculateTrees = (right: number, down: number) => {
  let trees = 0;

  let posX = 0;
  let posY = 0;

  while (posY < slopeHeight) {
    posY += down;
    posX += right;

    if (posX > lineLength - 1) {
      posX = posX - lineLength;
    }

    if (inputArr[posY][posX] === '#') {
      trees++;
    }
  }

  return trees;
};

//yea, I know, this is pretty lazy

const treeArr = [
  calculateTrees(1, 1),
  calculateTrees(3, 1),
  calculateTrees(5, 1),
  calculateTrees(7, 1),
  calculateTrees(1, 2),
];

console.log(
  treeArr.reduce((prev, next) => {
    return prev * next;
  })
);
