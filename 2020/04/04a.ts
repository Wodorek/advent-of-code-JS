import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

console.log(inputArr);

let validPassports = 0;

for (let i = 0; i < inputArr.length; i++) {
  const el = inputArr[i];

  const fields = Object.keys(el);

  if (fields.length === 8) {
    validPassports++;
  } else if (fields.length === 7 && !fields.includes('cid')) {
    validPassports++;
  }
}

console.log(validPassports);
