import neighbors from './helpers/neighbors';
import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

const queue: number[][] = [];

let flashes = 0;

for (let i = 0; i < 100; i++) {
  const flashed: number[][] = [];
  for (let x = 0; x < inputArr.length; x++) {
    const row = inputArr[x];

    for (let y = 0; y < row.length; y++) {
      const energy = row[y];

      if (energy >= 9) {
        queue.push([x, y]);
        flashed.push([x, y]);
        inputArr[x][y] = -50;
      } else {
        inputArr[x][y]++;
      }
    }
  }

  while (queue.length > 0) {
    flashes++;
    const current = queue.pop()!;

    const near = neighbors(inputArr, current[0], current[1]);

    near.forEach((el) => {
      inputArr[el[0]][el[1]]++;
      if (inputArr[el[0]][el[1]] > 9) {
        inputArr[el[0]][el[1]] = -50;
        queue.push([el[0], el[1]]);
        flashed.push([el[0], el[1]]);
      }
    });
  }

  flashed.forEach((el) => {
    inputArr[el[0]][el[1]] = 0;
  });
}

console.log(flashes);
