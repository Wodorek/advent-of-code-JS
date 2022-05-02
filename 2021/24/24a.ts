import input from './input';

import prepareInput from './helpers/prepareInput';
import { ALU } from './ALU';

const inputArr = prepareInput(input);
console.log(inputArr);

let num = 99999999999999;
// let num = 11111111111111;
const vars: any[] = [];

let times = 0;
while (true) {
  const alu = new ALU(num, inputArr);

  const isValid = alu.runProgram();

  if (isValid === true) {
    console.log(alu.vars);
    break;
  }

  if (times > 1000) {
    break;
  }

  times++;

  if (alu.vars.z !== 0) vars.push(alu.vars.y);
  num--;
}

console.dir(vars, { maxArrayLength: 300 });
