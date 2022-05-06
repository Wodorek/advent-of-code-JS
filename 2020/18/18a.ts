import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function calculate(numString: string) {
  const operations: { [key: number]: '+' | '*' } = {};

  let currOp = 0;

  const split = numString.split('');

  // numString.split('').forEach((el) => {
  //   if (el === '+' || el === '*') {
  //     operations[currOp] = el;
  //     currOp++;
  //   }
  // });

  console.log(
    split.filter((el) => {
      return el !== ' ';
    })
  );
}

calculate(`2 * 3 + (4 * 5)`);
