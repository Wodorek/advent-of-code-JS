import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

let occurences = 0;

inputArr.forEach((el) => {
  const number = el[1];
  number.split(' ').forEach((num) => {
    if (
      num.length === 2 ||
      num.length === 3 ||
      num.length === 4 ||
      num.length === 7
    ) {
      occurences++;
    }
  });
});

console.log(occurences);
