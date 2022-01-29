import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const registers: { [key: string]: number } = {};

'abcdefgh'.split('').forEach((char) => {
  if (char === 'a') {
    registers[char] = 1;
  } else if (char === 'b' || char === 'c') {
    //coming from part a
    registers[char] = 84;
  } else {
    registers[char] = 0;
  }
});

const optimized = () => {
  registers['b'] = registers['b'] * 100 + 100000;
  registers['c'] = registers['b'] + 17000;
  do {
    registers['f'] = 1;
    registers['d'] = 2;
    for (let d = registers['d']; d * d < registers['b']; ++d) {
      if (registers['b'] % d === 0) {
        registers['f'] = 0;
        break;
      }
    }
    if (registers['f'] === 0) registers['h']++;
    registers['g'] = registers['b'] - registers['c'];
    registers['b'] += 17;
  } while (registers['g'] !== 0);

  return registers['h'];
};

console.log(optimized());
