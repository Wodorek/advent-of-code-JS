import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const [depth, targetX, targetY] = inputArr;
const xTimes = 16807;
const yTimes = 48271;

const targetId = `${targetX},${targetY}`;

let mem: { [key: string]: number } = { '0,0': depth, [targetId]: depth };

function calculateErosion(x: number, y: number) {
  const id = `${x},${y}`;

  if (mem[id]) {
    return mem[id];
  }

  let geologicIndex = 0;

  if (x === 0) {
    geologicIndex = y * yTimes;
  } else if (y === 0) {
    geologicIndex = x * xTimes;
  } else {
    geologicIndex =
      mem[id] || calculateErosion(x - 1, y) * calculateErosion(x, y - 1);
  }

  mem[id] = (geologicIndex + depth) % 20183;

  return (geologicIndex + depth) % 20183;
}

calculateErosion(targetX - 1, targetY);
calculateErosion(targetX, targetY - 1);

let total = 0;

console.log(mem);

Object.values(mem).forEach((el) => {
  total += el % 3;
});

console.log(total);
