import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

let dangerLevel = 0;

for (let i = 0; i < inputArr.length; i++) {
  const row = inputArr[i];

  for (let j = 0; j < row.length; j++) {
    const current = +row[j];

    const left = row[j - 1] || 10;
    const right = row[j + 1] || 10;
    const up = inputArr[i - 1] ? inputArr[i - 1][j] : 10;
    const down = inputArr[i + 1] ? inputArr[i + 1][j] : 10;

    if (current < left && current < right && current < up && current < down) {
      dangerLevel += +current + 1;
    }
  }
}

console.log(dangerLevel);
