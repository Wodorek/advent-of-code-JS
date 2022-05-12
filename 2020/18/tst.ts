//Full credit to that page
//https://en.wikipedia.org/wiki/Shunting_yard_algorithm#:~:text=In%20computer%20science%2C%20the%20shunting,abstract%20syntax%20tree%20(AST).

// function weirdSum(str: string) {
//   const split = str.split('').filter((el) => {
//     return el !== ' ';
//   });

//   const RPN: string[] = [];
//   const operators: string[] = [];

//   const precedence = {
//     '+': 1,
//     '*': 0,
//   };

//   for (let i = 0; i < split.length; i++) {
//     if (!isNaN(+split[i])) {
//       RPN.push(split[i]);
//     } else if (split[i] === '+' || split[i] === '*') {
//       while (
//         operators.length !== 0 &&
//         precedence[
//           operators[operators.length - 1] as keyof typeof precedence
//         ] >= precedence[split[i] as keyof typeof precedence] &&
//         !(operators[operators.length - 1] === '(')
//       ) {
//         RPN.push(operators.pop()!);
//       }
//       operators.push(split[i]);
//     } else if (split[i] === '(') {
//       operators.push(split[i]);
//     } else if (split[i] === ')') {
//       while (operators[operators.length - 1] !== '(') {
//         RPN.push(operators.pop()!);
//       }
//       if (operators[operators.length - 1] === '(') {
//         operators.pop();
//       }
//     }
//   }

//   while (operators.length !== 0) {
//     RPN.push(operators.pop()!);
//   }

//   const postfixEval = (postfix: string[]) => {
//     let nums = new RegExp('[0-9]', 'g');
//     let stack: string[] = [];

//     for (const token of postfix) {
//       if (token.match(nums)) {
//         stack.push(token);
//       } else {
//         let right = stack.pop();
//         let left = stack.pop();
//         stack.push(eval(`${left} ${token} ${right}`));
//       }
//     }

//     console.log(stack);

//     return stack;
//   };

//   postfixEval(RPN);
// }

// console.log(weirdSum(`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`));
