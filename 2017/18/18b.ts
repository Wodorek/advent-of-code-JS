import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const registers0: { [key: string]: number } = {};
const registers1: { [key: string]: number } = {};
const queues: { 0: number[]; 1: number[] } = {
  0: [],
  1: [],
};

const execIdxs: { 0: number; 1: number } = {
  0: 0,
  1: 0,
};
//initialize registers

inputArr.forEach((el) => {
  if (isNaN(+el[1])) {
    registers0[el[1]] = 0;
    registers1[el[1]] = 0;
  }

  if (el[2] && isNaN(+el[2])) {
    registers0[el[2]] = 0;
    registers1[el[2]] = 0;
  }
});

registers1.p = 1;
let timesSent = 0;

const executeInstruction = (inst: string[], programId: 0 | 1) => {
  const [type, val1, val2] = inst;

  const registers = programId === 0 ? registers0 : registers1;

  let actualVal = 0;

  if (val2) {
    actualVal = isNaN(+val2) ? registers[val2] : +val2;
  }

  if (type === 'snd') {
    if (programId === 1) {
      timesSent++;
    }
    const sendTo = programId === 0 ? '1' : '0';
    queues[sendTo].unshift(registers[val1]);
  }

  if (type === 'set') {
    registers[val1] = actualVal;
  }

  if (type === 'add') {
    registers[val1] += actualVal;
  }

  if (type === 'mul') {
    registers[val1] = registers[val1] * +val2;
  }

  if (type === 'mod') {
    registers[val1] = registers[val1] % actualVal;
  }

  if (type === 'rcv') {
    if (queues[programId].length > 0) {
      const item = queues[programId].pop()!;
      registers[val1] = item;
    } else {
      return false;
    }
  }

  if (type === 'jgz') {
    const canJump = isNaN(+val1) ? registers[val1] : +val1;

    if (canJump > 0) {
      execIdxs[programId] += actualVal;
      if (
        execIdxs[programId] > inputArr.length - 1 ||
        execIdxs[programId] < 0
      ) {
        return false;
      }
      return true;
    }
  }

  execIdxs[programId]++;
  return true;
};

let running0 = true;
let running1 = true;

while (running1 || running0) {
  running0 = executeInstruction(inputArr[execIdxs[0]], 0);
  running1 = executeInstruction(inputArr[execIdxs[1]], 1);
}

console.log(timesSent);
