import input from './input';

let inputArr = input.trim().split('');

let pastValue = 0;

while (true) {
  for (let i = 0; i < inputArr.length - 1; i++) {
    if (
      inputArr[i].toUpperCase() === inputArr[i + 1].toUpperCase() &&
      inputArr[i] !== inputArr[i + 1]
    ) {
      inputArr[i] = '';
      inputArr[i + 1] = '';
    }
  }
  const joined = inputArr.join('');
  inputArr = joined.trim().split('');
  if (pastValue === inputArr.length) {
    break;
  }
  pastValue = inputArr.length;
}

console.log(pastValue);
