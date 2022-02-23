import input from './input';
import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

const timeOffsets = inputArr[1]
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

const checkTimes = (buses: number[], times: number[], currTime: number) => {
  const matches = buses.every((bus, idx) => {
    return (currTime + times[idx]) % bus === 0;
  });

  return matches;
};

let time = 0;
let times = [];
let sliceSize = 1;
let dt = 1;

while (true) {
  if (
    checkTimes(
      buses.slice(0, sliceSize + 1),
      timeOffsets.slice(0, sliceSize + 1),
      time
    )
  ) {
    times.push(time);

    if (times.length === 2) {
      dt = times[1] - times[0];
      times = [];
      sliceSize++;
    }

    if (sliceSize === buses.length) {
      console.log('timestamp:', time - dt);
      break;
    }
  }
  time += dt;
}
