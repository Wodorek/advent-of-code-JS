import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const lights: number[] = new Array(1000 * 1000).fill(0);

console.log(inputArr[0]);

inputArr.forEach((el) => {
  const command = el[0];

  const fromX = el[1][0][0] as number;
  const toX = el[1][1][0] as number;

  const fromY = el[1][0][1] as number;
  const toY = el[1][1][1] as number;

  for (let i = fromX; i <= toX; i++) {
    for (let j = fromY; j <= toY; j++) {
      const idx = 1000 * i + j;

      if (command === 'on') {
        lights[idx] += 1;
      } else if (command === 'off') {
        if (lights[idx] > 0) {
          lights[idx]--;
        }
      } else {
        lights[idx] += 2;
      }
    }
  }
});

let total = 0;

lights.forEach((el) => {
  total += el;
});

console.log(total);
