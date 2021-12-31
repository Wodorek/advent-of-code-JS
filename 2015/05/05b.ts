import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const vowels = ['a', 'e', 'i', 'o', 'u'];
const disallowed = ['ab', 'cd', 'pq', 'xy'];

const parseString = (str: string) => {
  if (!str.match(/([a-z][a-z])[a-z]*\1/)) {
    return false;
  }

  if (!str.match(/([a-z])[a-z]\1/)) {
    return false;
  }

  return true;
};
let niceStrings = 0;

inputArr.forEach((el) => {
  if (parseString(el)) {
    niceStrings++;
  }
});

console.log(niceStrings);
