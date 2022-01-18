import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let password = 'abcdefgh';

const executeInstruciton = (
  instruction: (string | number)[],
  password: string
) => {
  const command = instruction[0];

  const split = password.split('');

  if (command === 'swap') {
    let idx1 = +instruction[1];
    let idx2 = +instruction[2];

    if (isNaN(+instruction[1])) {
      idx1 = split.indexOf(`${instruction[1]}`);
      idx2 = split.indexOf(`${instruction[2]}`);
    }

    const temp = split[idx1];
    split[idx1] = split[idx2];
    split[idx2] = temp;
  }

  if (command === 'rotate') {
    let rotations = instruction.length === 3 ? +instruction[2] : 0;
    let dir = `${instruction[1]}`.length > 1 ? instruction[1] : 'right';

    if (instruction.length === 2) {
      const idx = split.indexOf(`${instruction[1]}`);
      rotations = idx >= 4 ? idx + 2 : idx + 1;
    }

    for (let i = 0; i < rotations; i++) {
      if (dir === 'right') {
        const popped = split.pop()!;
        split.unshift(popped);
      }

      if (dir === 'left') {
        const shifted = split.shift()!;
        split.push(shifted);
      }
    }
  }

  if (command === 'move') {
    const spliced = split.splice(+instruction[1], 1);
    split.splice(+instruction[2], 0, ...spliced);
  }

  if (command === 'reverse') {
    const slice = split.splice(
      +instruction[1],
      +instruction[2] - +instruction[1] + 1
    );
    slice.reverse();
    split.splice(+instruction[1], 0, ...slice);
  }

  return split.join('');
};

for (let i = 0; i < inputArr.length; i++) {
  password = executeInstruciton(inputArr[i]!, password);
}

console.log(password);
