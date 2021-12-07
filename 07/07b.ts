import input from './input';

const inputArr = input.split(',').map(Number);

const maxPos = inputArr.reduce((prev, val) => {
  return Math.max(prev, val);
});

const usedFuel = (steps: number) => {
  return (steps * (steps + 1)) / 2;
};

const possibleOutcomes = [];

for (let i = 0; i < maxPos; i++) {
  let totalFuel = 0;

  for (let j = 0; j < inputArr.length; j++) {
    totalFuel += usedFuel(Math.abs(i - inputArr[j]));
  }
  possibleOutcomes.push(totalFuel);
}

const lowestValue = possibleOutcomes.reduce((prev, val) => {
  return Math.min(prev, val);
});

console.log(maxPos);
console.log(lowestValue);
