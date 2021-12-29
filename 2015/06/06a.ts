import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const lights: number[] = new Array(1000 * 1000);

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
        lights[idx] = 1;
      } else if (command === 'off') {
        lights[idx] = 0;
      } else {
        lights[idx] = lights[idx] === 1 ? 0 : 1;
      }
    }
  }
});

console.log(
  lights.filter((el) => {
    return el === 1;
  }).length
);
