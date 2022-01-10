import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let possibleCombos: number[][] = [[]];

const maxWeight =
  inputArr.reduce((prev, val) => {
    return prev + val;
  }, 0) / 3;

for (let i = 0; i < inputArr.length; i++) {
  const newArs: number[][] = [];

  possibleCombos.forEach((combo) => {
    newArs.push([...combo]);

    if (combo.length <= 5) {
      newArs.push([...combo, inputArr[i]]);
    }
  });

  console.log('current:', i + 1, ' total elems:', possibleCombos.length);

  possibleCombos = newArs;
}

console.log(possibleCombos.length);

possibleCombos = possibleCombos.filter((el) => {
  return (
    el.reduce((prev, val) => {
      return prev + val;
    }, 0) === maxWeight
  );
});

//this stinking pile of code, turns out, is completely unnecessary. Apparently if you generate every possible combination of the numbers, with len = 5, and with "weight" = 1/3 of total, they all pass

//I am leaving it, maybe for part two
// const canFinish = (first: number[]) => {
//   const numbersLeft = inputArr.filter((el) => {
//     return !first.includes(el);
//   });

//   let compliments: number[][][] = [[[], []]];

//   for (let i = 0; i < numbersLeft.length; i++) {
//     const newComps: number[][][] = [];

//     compliments.forEach((compliment) => {
//       for (let j = 0; j < compliment.length; j++) {
//         const newCompliment = compliment.map((el) => {
//           return el;
//         });
//         newCompliment[j] = [...newCompliment[j], numbersLeft[i]];

//         let maxW = 0;

//         newCompliment.forEach((part) => {
//           const weight = part.reduce((prev, val) => {
//             return prev + val;
//           }, 0);

//           maxW = Math.max(maxW, weight);
//         });

//         if (maxW <= maxWeight) {
//           newComps.push(newCompliment);
//         }
//       }
//     });
//     compliments = newComps;
//   }

//   compliments = compliments.filter((comp) => {
//     const w1 = comp[0].reduce((prev, val) => {
//       return prev + val;
//     }, 0);
//     const w2 = comp[0].reduce((prev, val) => {
//       return prev + val;
//     }, 0);

//     const len1 = comp[0].length;
//     const len2 = comp[1].length;

//     return w2 === maxWeight && w1 === maxWeight && len1 > 5 && len2 > 5;
//   });

//   if (compliments.length > 0) {
//     return true;
//   }

//   return false;
// };

let minQuant = Infinity;

possibleCombos.forEach((combo) => {
  const quantum = combo.reduce((prev, val) => {
    return prev * val;
  }, 1);

  minQuant = Math.min(minQuant, quantum);
});

console.log(minQuant);
