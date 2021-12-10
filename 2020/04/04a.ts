import prepareInput from './helpers/prepareInput';
import input from './input';

const inputArr = prepareInput(input);

let validPassports = 0;

for (let i = 0; i < inputArr.length; i++) {
  const el = inputArr[i];

  const fields = Object.keys(el);

  if (fields.length === 8 || (fields.length === 7 && !fields.includes('cid'))) {
    validPassports++;
  }
}

console.log(validPassports);
