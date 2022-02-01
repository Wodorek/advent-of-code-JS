import input from './input';

import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

inputArr = inputArr.sort((a, b) => {
  const dateA = new Date(a[0]).getTime();
  const dateB = new Date(b[0]).getTime();

  return dateA > dateB ? 1 : -1;
});

const guards: { [key: string]: { slept: number; ranges: string[] } } = {};

inputArr.forEach((el) => {
  if (!isNaN(+el[1])) {
    guards[el[1]] = { slept: 0, ranges: [] };
  }
});

let currentGuard = inputArr[0][1];

for (let i = 0; i < inputArr.length; i++) {
  const [date, val] = inputArr[i];

  if (!isNaN(+val)) {
    currentGuard = val;
  }

  if (val === 'wakes') {
    guards[currentGuard].slept +=
      +date.slice(date.length - 2, date.length) -
      +inputArr[i - 1][0].slice(date.length - 2, date.length);
    guards[currentGuard].ranges.push(
      `${+inputArr[i - 1][0].slice(date.length - 2, date.length)}-${+date.slice(
        date.length - 2,
        date.length
      )}`
    );
  }
}

let sleepiestGuard = Object.keys(guards)[0];

Object.keys(guards).forEach((guard) => {
  if (guards[guard].slept > guards[sleepiestGuard].slept) {
    sleepiestGuard = guard;
  }
});

const minutes: { [key: string]: number } = {};

guards[sleepiestGuard].ranges.forEach((range) => {
  const split = range.split('-');

  for (let i = +split[0]; i < +split[1]; i++) {
    if (!minutes[i]) {
      minutes[i] = 1;
    } else {
      minutes[i]++;
    }
  }
});

let maxMinute = Object.keys(minutes)[0];

Object.keys(minutes).forEach((minute) => {
  if (minutes[minute] > minutes[maxMinute]) {
    maxMinute = minute;
  }
});

console.log(+sleepiestGuard * +maxMinute);
