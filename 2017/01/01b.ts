import input from './input';

const countDigits = (num: string) => {
  let left = 0;
  let right = left + num.length / 2;

  let count = 0;

  while (left < num.length) {
    if (right > num.length - 1) {
      right = left + num.length / 2 - num.length;
    }

    if (num[left] === num[right]) {
      count += +num[left];
    }

    left++;
    right = left + num.length / 2;
  }

  return count;
};

export default countDigits;

console.log(countDigits(input));
