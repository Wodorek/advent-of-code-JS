import input from './input';

// const input = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`;

let oxygenArr = input.split('\n');

let oxyAcc = 0;

for (let j = 0; j < 12; j++) {
  if (oxygenArr.length === 1) {
    break;
  }

  for (let i = 0; i < oxygenArr.length; i++) {
    oxyAcc += +oxygenArr[i][j];
  }

  if (oxyAcc >= oxygenArr.length / 2) {
    oxygenArr = oxygenArr.filter((el) => {
      return el[j] === '1';
    });
  } else {
    oxygenArr = oxygenArr.filter((el) => {
      return el[j] === '0';
    });
  }

  oxyAcc = 0;
}

let co2Arr = input.split('\n');

let co2Acc = 0;

for (let j = 0; j < 12; j++) {
  if (co2Arr.length === 1) {
    break;
  }

  for (let i = 0; i < co2Arr.length; i++) {
    co2Acc += +co2Arr[i][j];
  }

  if (co2Acc < co2Arr.length / 2) {
    co2Arr = co2Arr.filter((el) => {
      return el[j] === '1';
    });
  } else {
    co2Arr = co2Arr.filter((el) => {
      return el[j] === '0';
    });
  }

  co2Acc = 0;
}

console.log(parseInt(oxygenArr[0], 2) * parseInt(co2Arr[0], 2));
