import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const printMessage = (arr: string[][]) => {
  arr.forEach((line) => {
    console.log(line.join(''));
  });
};

let mod = 10000;

console.log(inputArr.length);

const display: string[][] = [];

for (let i = 0; i < 280; i++) {
  const row: string[] = [];
  row.length = 200;
  row.fill('.');

  display.push(row);
}

// the number here was found by trial and error
//could be replaced by finding a straight line of # in the array
while (mod < 10512) {
  const newInput = inputArr.map((el) => {
    return [el[0] + mod * el[2], el[1] + mod * el[3]];
  });

  const newArr = display.map((line) => {
    return line.map((el) => {
      return el;
    });
  });

  newInput.forEach((el) => {
    if (newArr?.[el[1]]?.[el[0]]) {
      newArr[el[1]][el[0]] = '#';
    }
  });

  let total = 0;

  newArr.forEach((line) => {
    line.forEach((char) => {
      if (char === '#') {
        total++;
      }
    });
  });

  if (total > 180) {
    console.log('   ');
    console.log(mod);
    printMessage(newArr);
    console.log('   ');
  }

  mod++;
}
