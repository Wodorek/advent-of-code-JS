import input from './input';
import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

console.log(inputArr);

const timeDiffs = inputArr[1]
  .map((el, idx) => {
    if (!isNaN(+el)) {
      return idx;
    }
  })
  .filter((el) => {
    return el !== undefined;
  }) as number[];

const buses = inputArr[1]
  .filter((el) => {
    return el !== 'x';
  })
  .map(Number);

// or buses[0] for examples
let time = 100000000000000;

while (time % buses[0] !== 0) {
  time++;
}

console.log(time);

const checkTimes = (buses: number[], times: number[]) => {
  const matches = buses.every((bus, idx) => {
    return (time + times[idx]) % bus === 0;
  });

  if (matches) {
    return true;
  } else {
    return false;
  }
};

while (true) {
  if (checkTimes(buses, timeDiffs)) {
    console.log(time);
    break;
  }
  time += buses[0];
}
