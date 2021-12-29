import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const vowels = ['a', 'e', 'i', 'o', 'u'];
const disallowed = ['ab', 'cd', 'pq', 'xy'];

const parseString = (str: string) => {
  let vowelCount = 0;
  let containsDouble = false;

  for (let i = 0; i < str.length; i++) {
    if (disallowed.includes(str.slice(i, i + 2))) {
      return false;
    }

    if (vowels.includes(str[i])) {
      vowelCount++;
    }

    if (containsDouble === false) {
      if (str[i] === str[i + 1]) {
        containsDouble = true;
      }
    }
  }

  return vowelCount >= 3 && containsDouble ? true : false;
};

let niceStrings = 0;

inputArr.forEach((el) => {
  if (parseString(el)) {
    niceStrings++;
  }
});

console.log(niceStrings);
