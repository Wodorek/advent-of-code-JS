import input from './input';

const inputArr = input.split(',').map(Number);

console.log(inputArr);

let currTurn = 1;

let previouslySaidAt: { [key: string]: number } = {};

//more recent
let recentlySaidAt: { [key: string]: number } = {};

let toConsider = 0;

inputArr.forEach((num) => {
  recentlySaidAt[num] = currTurn;
  toConsider = num;
  currTurn++;
});

while (currTurn < 2021) {
  if (!previouslySaidAt[toConsider]) {
    toConsider = 0;
  } else {
    toConsider = recentlySaidAt[toConsider] - previouslySaidAt[toConsider];
  }
  previouslySaidAt[toConsider] = recentlySaidAt[toConsider];
  recentlySaidAt[toConsider] = currTurn;
  currTurn++;
}

console.log(currTurn - 1, ':', toConsider);
