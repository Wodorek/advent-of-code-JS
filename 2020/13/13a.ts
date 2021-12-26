import input from './input';
import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

const filtered = inputArr[1]
  .filter((el) => {
    return el !== 'x';
  })
  .map(Number);

let lowestTime = Infinity;
let selectedBus = 0;
filtered.forEach((bus) => {
  const leavesAt = Math.floor(+inputArr[0] / bus) + 1;
  const timeToLeave = leavesAt * bus;

  if (timeToLeave < lowestTime) {
    lowestTime = timeToLeave;
    selectedBus = bus;
  }
});

console.log((lowestTime - +inputArr[0]) * selectedBus);
