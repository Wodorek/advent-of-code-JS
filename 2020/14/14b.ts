import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const valuesInMemory: { [key: string]: number } = {};

const saveValue = (val: string, mask: string) => {
  const splitVal = val.split(',');

  const address = +splitVal[0];
  const value = +splitVal[1];

  const binary = address.toString(2).padStart(36, '0').split('');

  mask.split('').forEach((bit, idx) => {
    if (bit === 'X' || bit === '1') {
      binary[idx] = bit;
    }
  });

  const addresses: string[][] = [];

  addresses.push(binary);

  while (addresses.length > 0) {
    const currAddress = addresses.pop()!;

    if (currAddress.includes('X')) {
      const xIndex = currAddress.findIndex((el) => {
        return el === 'X';
      })!;

      const address0 = currAddress.map((el, idx) => {
        if (idx === xIndex) {
          return '0';
        } else {
          return el;
        }
      });

      const address1 = currAddress.map((el, idx) => {
        if (idx === xIndex) {
          return '1';
        } else {
          return el;
        }
      });

      addresses.unshift(address0);
      addresses.unshift(address1);
    } else {
      const saveTo = parseInt(currAddress.join(''), 2);
      valuesInMemory[saveTo] = value;
    }
  }
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
  total += val;
});

console.log(total);
