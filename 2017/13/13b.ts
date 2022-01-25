import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let delay = 0;
let caught = true;

while (caught) {
  let gotCaught = false;
  inputArr.forEach((el) => {
    const time = (+el[0] + delay) % (el[1] * 2 - 2);
    if (time === 0) {
      gotCaught = true;
    }
  });

  caught = gotCaught;
  delay++;
}

console.log(delay - 1);
