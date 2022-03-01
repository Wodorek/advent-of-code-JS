import input from './input';

const inputArr = input.split(',').map(Number);

console.log(inputArr);

let currTurn = 1;

const memoized = new Map<number, number>();

inputArr.forEach((num) => {
  memoized.set(num, currTurn);
  currTurn++;
});

let current = 0;

while (currTurn < 30000000) {
  if (memoized.has(current)) {
    const prevTime = memoized.get(current) as number;
    memoized.set(current, currTurn);
    current = currTurn - prevTime;
  } else {
    memoized.set(current, currTurn);
    current = 0;
  }
  currTurn++;
}

console.log(current);
