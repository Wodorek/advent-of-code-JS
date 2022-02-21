import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const valuesInMemory: { [key: string]: string } = {};

const saveValue = (val: string, mask: string) => {
  const splitVal = val.split(',');

  const address = splitVal[0];
  const value = +splitVal[1];

  const binary = value.toString(2).padStart(36, '0').split('');

  mask.split('').forEach((bit, idx) => {
    if (bit !== 'X') {
      binary[idx] = bit;
    }
  });

  valuesInMemory[address] = binary.join('');
};

let mask = '';

inputArr.forEach((line) => {
  if (line[0] === 'mask') {
    mask = line[1];
  } else {
    saveValue(line[1], mask);
  }
});

let total = 0;

Object.values(valuesInMemory).forEach((val) => {
  total += parseInt(val, 2);
});

console.log(total);
