import input from './input';

import prepareInput from './helpers/prepareInput';
import { ALU } from './ALU';

const inputArr = prepareInput(input);

//74929995999389

let num = 74929995999389;
const vars: any[] = [];

const alu = new ALU(num, inputArr);

const isValid = alu.runProgram();

console.log(alu.vars);
//  inp w
//   mul x 0
//   add x z
//   mod x 26
//   div z 26 this
//   add x 11 this c x
//   eql x w
//   eql x 0
//   mul y 0
//   add y 25
//   mul y x
//   add y 1
//   mul z y
//   mul y 0
//   add y w
//   add y 14 this o y
//   mul y x
//   add z y

//PUSH 11,14
//PUSH 13,8
//PUSH 11,4
//PUSH 10,10
//POP -3,14
//POP -4,10
//PUSH 12,4
//POP -8,14
//POP -3,1
//POP -12,6
//PUSH 14,0
//POP -6,9
//PUSH 11,13
//POP -12,12

// PUSH input[0] + 14
// PUSH input[1] + 8
// PUSH input[2] + 4-
// PUSH input[3] + 10-
// POP input[4] === popped -3
// POP input[5] === popped -4
// PUSH input[6] + 4 -
// POP input[7] === popped -8
// POP input[8] === popped -3
// POP input[9] === popped -12
// PUSH input[10] + 0
// POP input[11] === popped -6
// PUSH input[12] + 13
// POP input[13] === popped -12

// input[4] === input[3] + 7
// input[5] === input[2]
// input[7] === input[6] - 4
// input[8] === input[1] + 5
// input[9] === input[0] +2
// input[11] == input[10] -6
// input[13] === input[12] +1

//0 = 7
//1 = 4
//2 = 9
//3 = 2
//4 = 9
//5 = 9
//6 = 9
//7 = 5
//8 = 9
//9 = 9
//10 = 9
//11 = 3
//12 = 8
//13 = 9

// const s1 = 74929995999389
// const s2 = 98399959992947
