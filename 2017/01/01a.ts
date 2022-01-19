import input from './input';

const countDigits = (num: string) => {
  let left = 0;
  let right = 1;

  let count = 0;

  while (left < num.length) {
    if (num[left] === num[right]) {
      count += +num[left];
    }

    left++;
    right++;
    if (left === num.length - 1) {
      right = 0;
    }
  }

  return count;
};

export default countDigits;

console.log(countDigits(input));
