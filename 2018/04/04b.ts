import input from './input';

import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

inputArr = inputArr.sort((a, b) => {
  const dateA = new Date(a[0]).getTime();
  const dateB = new Date(b[0]).getTime();

  return dateA > dateB ? 1 : -1;
});

const guards: {
  [key: string]: { slept: number; minutes: { [key: string]: number } };
} = {};

inputArr.forEach((el) => {
  if (!isNaN(+el[1])) {
    guards[el[1]] = { slept: 0, minutes: {} };
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

    for (
      let j = +inputArr[i - 1][0].slice(date.length - 2, date.length);
      j < +date.slice(date.length - 2, date.length);
      j++
    ) {
      if (!guards[currentGuard].minutes[j]) {
        guards[currentGuard].minutes[j] = 1;
      } else {
        guards[currentGuard].minutes[j]++;
      }
    }
  }
}

const getMinute = (times: { [key: string]: number }) => {
  let minute = Object.keys(times)[0];
  let repeats = -1;

  Object.keys(times).forEach((time) => {
    if (times[time] > times[minute]) {
      minute = time;
      repeats = times[time];
    }
  });

  return [+minute, repeats];
};

let sleepiestGuard = Object.keys(guards)[0];
let relevantMinute = 0;
let mostRepeats = 0;

Object.keys(guards).forEach((guard) => {
  const [minute, repeats] = getMinute(guards[guard].minutes);

  if (repeats > mostRepeats) {
    mostRepeats = repeats;
    relevantMinute = minute;
    sleepiestGuard = guard;
  }
});

console.log(+sleepiestGuard * relevantMinute);
