import input from './input';

const inputArr = input.split(',').map(Number);

const maxPos = inputArr.reduce((prev, val) => {
  return Math.max(prev, val);
});

const possibleOutcomes: number[] = [];

for (let i = 0; i < maxPos; i++) {
  let totalFuel = 0;

  for (let j = 0; j < inputArr.length; j++) {
    totalFuel += Math.abs(i - inputArr[j]);
  }
  possibleOutcomes.push(totalFuel);
}

const lowestValue = possibleOutcomes.reduce((prev, val) => {
  return Math.min(prev, val);
});

console.log(lowestValue);
