import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

let passing = 0;

inputArr.forEach((el) => {
  let pertinent = 0;
  const letters = el.pass.split('');
  letters.forEach((letter) => {
    if (letter === el.letter) {
      pertinent++;
    }
  });

  if (pertinent >= el.min && pertinent <= el.max) {
    passing++;
  }
});

console.log(passing);
