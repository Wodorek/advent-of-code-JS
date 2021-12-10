import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

const ids = [];

for (let i = 0; i < inputArr.length; i++) {
  const el = inputArr[i];

  const rows = [0, 127];
  const columns = [0, 7];

  el.split('').forEach((char) => {
    if (char === 'F') {
      rows[1] -= Math.ceil((rows[1] - rows[0]) / 2);
    }
    if (char === 'B') {
      rows[0] += Math.ceil((rows[1] - rows[0]) / 2);
    }

    if (char === 'R') {
      columns[0] += Math.ceil((columns[1] - columns[0]) / 2);
    }
    if (char === 'L') {
      columns[1] -= Math.ceil((columns[1] - columns[0]) / 2);
    }
  });

  ids.push(rows[0] * 8 + columns[0]);
}

console.log(
  ids.sort((a, b) => {
    return a > b ? -1 : 1;
  })[0]
);
