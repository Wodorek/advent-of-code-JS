import countSafe from './helpers/countsSafe';
import input from './input';

const createNextRow = (input: string) => {
  let newRow = '';

  const split = input.split('');

  for (let i = 0; i < split.length; i++) {
    const left = split[i - 1] || '.';
    const center = split[i];
    const right = split[i + 1] || '.';

    if (
      (left === '^' && center === '^' && right === '.') ||
      (center === '^' && right === '^' && left === '.') ||
      (left === '^' && center === '.' && right === '.') ||
      (right === '^' && center === '.' && left === '.')
    ) {
      newRow = newRow.concat('^');
    } else {
      newRow = newRow.concat('.');
    }
  }

  return newRow;
};

const rows = [input];

for (let i = 0; i < 40 - 1; i++) {
  const currRow = rows[rows.length - 1];

  rows.push(createNextRow(currRow));
}

console.log(countSafe(rows));

export default createNextRow;
