import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

for (let i = 0; i < inputArr.length; i++) {
  for (let j = i + 1; j < inputArr.length; j++) {
    const chars1 = inputArr[i].split('');
    const chars2 = inputArr[j].split('');

    const diff = chars1.reduce(
      (prev, curr, idx) => prev + (curr === chars2[idx] ? 0 : 1),
      0
    );

    if (diff === 1) {
      let result = '';

      inputArr[i].split('').forEach((el, idx) => {
        if (el === inputArr[j][idx]) {
          result = result.concat(el);
        }
      });

      console.log(result);
    }
  }
}
