import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

let passing = 0;

inputArr.forEach((el) => {
  const letters = el.pass.split('');

  if (
    (letters[el.min - 1] === el.letter && letters[el.max - 1] !== el.letter) ||
    (letters[el.max - 1] === el.letter && letters[el.min - 1] !== el.letter)
  ) {
    passing++;
  }
});

console.log(passing);
