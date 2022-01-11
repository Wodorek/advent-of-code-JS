import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const bots: { [key: string]: { min: number; max: number } } = {};
const outputs: { [key: string]: number[] } = {};

let theDroidIamLookingFor = 0;

inputArr.forEach((line) => {
  line.forEach((el) => {
    if (el[0] === 'bot') {
      if (!bots[`bot${el[1]}`]) {
        bots[`bot${el[1]}`] = { min: 0, max: 0 };
      }
    }

    if (el[0] === 'output') {
      if (!outputs[`output${el[1]}`]) {
        outputs[`output${el[1]}`] = [];
      }
    }
  });
});

const addToBot = (botNum: number, val: number) => {
  const max = bots[`bot${botNum}`].max;

  if (max > 0) {
    if (max > val) {
      bots[`bot${botNum}`].min = val;
    } else {
      bots[`bot${botNum}`].min = bots[`bot${botNum}`].max;
      bots[`bot${botNum}`].max = val;
    }
  } else {
    bots[`bot${botNum}`].max = val;
  }

  if (max === 61 && bots[`bot${botNum}`].min === 17) {
    theDroidIamLookingFor = botNum;
  }
};

const executeInstruction = (instruction: (string | number)[][]) => {
  let executed = false;

  if (instruction[0][0] === 'value') {
    addToBot(+instruction[1][1], +instruction[0][1]);
    executed = true;
  }

  if (instruction[0][0] === 'bot') {
    const min = bots[`bot${instruction[0][1]}`].min;
    const max = bots[`bot${instruction[0][1]}`].max;

    if (min > 0 && max > 0) {
      if (instruction[1][0] === 'bot') {
        addToBot(+instruction[1][1], min);
        bots[`bot${instruction[0][1]}`].min = 0;
      } else {
        outputs[`output${instruction[1][1]}`].push(min);
        bots[`bot${instruction[0][1]}`].min = 0;
      }

      if (instruction[2][0] === 'bot') {
        addToBot(+instruction[2][1], max);
        bots[`bot${instruction[0][1]}`].max = 0;
      } else {
        outputs[`output${instruction[2][1]}`].push(max);
        bots[`bot${instruction[0][1]}`].max = 0;
      }

      executed = true;
    }
  }

  return executed;
};

let instructions = inputArr;

while (instructions.length > 0) {
  let removedIdx: number[] = [];

  for (let i = 0; i < instructions.length; i++) {
    const executed = executeInstruction(instructions[i]);

    if (executed) {
      removedIdx.push(i);
    }
  }

  instructions = instructions.filter((el, idx) => {
    return !removedIdx.includes(idx);
  });
}
console.log(theDroidIamLookingFor);
