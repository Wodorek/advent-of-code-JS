import input from './input';

let inputArr = input.trim().split('');

let pastValue = 0;

//reuse part 1, those element would be removed anyway
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

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const mappedToLetters: { [key: string]: number } = {};

alphabet.split('').forEach((letter) => {
  const regex = new RegExp(letter, 'g');
  const regex2 = new RegExp(letter.toUpperCase(), 'g');
  let newArr = inputArr
    .map((el) => el)
    .join('')
    .replace(regex, '')
    .replace(regex2, '')
    .split('');

  let pastValue = 0;

  while (true) {
    for (let i = 0; i < newArr.length - 1; i++) {
      if (
        newArr[i].toUpperCase() === newArr[i + 1].toUpperCase() &&
        newArr[i] !== newArr[i + 1]
      ) {
        newArr[i] = '';
        newArr[i + 1] = '';
      }
    }
    const joined = newArr.join('');
    newArr = joined.trim().split('');
    if (pastValue === newArr.length) {
      break;
    }
    pastValue = newArr.length;
  }

  mappedToLetters[letter] = pastValue;
});

console.log(Math.min(...Object.values(mappedToLetters)));
