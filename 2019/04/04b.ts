import input from './input';

const ranges = input.split('-').map(Number);

const [min, max] = ranges;

const checkPassword = (pass: number) => {
  let hasDouble = false;

  const split = pass.toString().split('');

  for (let i = 0; i < split.length - 1; i++) {
    if (split[i] > split[i + 1]) {
      return false;
    }

    let x = 1;

    while (split[i] === split[i + x]) {
      x++;
    }

    if (x === 2) {
      hasDouble = true;
    } else if (x > 2) {
      i += x - 2;
    }
  }

  return hasDouble;
};

let matchingPasswords = 0;

for (let i = min; i < max; i++) {
  if (checkPassword(i)) {
    matchingPasswords++;
  }
}

console.log(matchingPasswords);
