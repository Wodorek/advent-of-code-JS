// Full credit to that page
// https://en.wikipedia.org/wiki/Shunting_yard_algorithm#:~:text=In%20computer%20science%2C%20the%20shunting,abstract%20syntax%20tree%20(AST).

import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

function weirdSum(str: string) {
  const split = str.split('').filter((el) => {
    return el !== ' ';
  });

  const RPN: string[] = [];
  const operators: string[] = [];

  for (let i = 0; i < split.length; i++) {
    if (!isNaN(+split[i])) {
      RPN.push(split[i]);
    } else if (split[i] === '+' || split[i] === '*') {
      while (
        operators.length !== 0 &&
        !(operators[operators.length - 1] === '(')
      ) {
        RPN.push(operators.pop()!);
      }
      operators.push(split[i]);
    } else if (split[i] === '(') {
      operators.push(split[i]);
    } else if (split[i] === ')') {
      while (operators[operators.length - 1] !== '(') {
        RPN.push(operators.pop()!);
      }
      if (operators[operators.length - 1] === '(') {
        operators.pop();
      }
    }
  }

  while (operators.length !== 0) {
    RPN.push(operators.pop()!);
  }

  const finalStack: string[] = [];

  RPN.forEach((el) => {
    if (!isNaN(+el)) {
      finalStack.push(el);
    } else {
      const right = finalStack.pop()!;
      const left = finalStack.pop()!;
      finalStack.push(eval(`${left} ${el} ${right}`));
    }
  });

  return finalStack[0];
}

let total = 0;

inputArr.forEach((num) => {
  total += +weirdSum(num);
});

console.log(total);
