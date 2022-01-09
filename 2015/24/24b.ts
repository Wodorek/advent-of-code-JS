import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

let possibleCombos: number[][] = [[]];

const maxWeight =
  inputArr.reduce((prev, val) => {
    return prev + val;
  }, 0) / 4;

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

let minQuant = Infinity;

possibleCombos.forEach((combo) => {
  const quantum = combo.reduce((prev, val) => {
    return prev * val;
  }, 1);

  minQuant = Math.min(minQuant, quantum);
});

console.log(minQuant);
