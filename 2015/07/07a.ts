import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input).sort((a, b) => {
  return a[0] > b[0] ? -1 : 0;
});

const foundValues: { [key: string]: number } = {};
const processedIdx: number[] = [];

const processSignal = (instruction: [string, string[]], idx: number) => {
  const [operation, args] = instruction;

  if (operation === 'PROVIDE') {
    if (isNaN(+args[0])) {
      if (Object.keys(foundValues).includes(args[0])) {
        foundValues[args[1]] = foundValues[args[0]];
        processedIdx.push(idx);
      }
    } else {
      foundValues[args[1]] = +args[0];
      processedIdx.push(idx);
    }
  }

  if (!Object.keys(foundValues).includes(args[0]) && isNaN(+args[0])) {
    return;
  }

  if (operation === 'LSHIFT') {
    foundValues[args[2]] = foundValues[args[0]] << +args[1];
    processedIdx.push(idx);
  }

  if (operation === 'RSHIFT') {
    foundValues[args[2]] = foundValues[args[0]] >> +args[1];
    processedIdx.push(idx);
  }

  if (operation === 'NOT') {
    foundValues[args[1]] = ~foundValues[args[0]] & 0xffff;
    processedIdx.push(idx);
  }

  if (!Object.keys(foundValues).includes(args[1])) {
    return;
  }

  if (operation === 'AND') {
    const firstArg = (
      foundValues[args[0]] ? foundValues[args[0]] : args[0]
    ) as number;

    foundValues[args[2]] = firstArg & foundValues[args[1]];
    processedIdx.push(idx);
  }

  if (operation === 'OR') {
    foundValues[args[2]] = foundValues[args[0]] | foundValues[args[1]];
    processedIdx.push(idx);
  }
};

const parse = () => {
  inputArr.forEach((el, idx) => {
    processSignal(el, idx);
  });

  while (processedIdx.length > 0) {
    const idx = processedIdx.pop()!;
    inputArr.splice(idx, 1);
  }
};

while (inputArr.length > 0) {
  parse();
  console.log(inputArr.length);
}

console.log(foundValues['a']);
