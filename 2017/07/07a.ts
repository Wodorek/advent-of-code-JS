import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

// filter out discs not holding anything, the are not the bottom of the tower
const filtered = inputArr.filter((el) => {
  return el[1];
});

// check which program is not being held by any other program

for (let i = 0; i < filtered.length; i++) {
  const program = filtered[i][0][0];

  let isRoot = true;

  for (let j = 0; j < filtered.length; j++) {
    const held = filtered[j][1];

    if (held.includes(program)) {
      isRoot = false;
    }
  }

  if (isRoot) {
    console.log(program);
  }
}
