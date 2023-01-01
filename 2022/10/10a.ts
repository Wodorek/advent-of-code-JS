import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

class Computer {
  operations: [string, number][] = [];
  currentCycle = 0;
  register = 1;
  twoLeft: number = 0;
  oneLeft: number = 0;
  toAdd: number = 0;
  signals: number[] = [];

  constructor(ops: [string, number][]) {
    this.operations = ops;
  }

  checkSignal() {
    if (this.currentCycle === 20 || (this.currentCycle + 20) % 40 === 0) {
      this.signals.push(this.currentCycle * this.register);
    }
  }

  processCycle(op: string, num: number) {
    if (op === 'noop') {
      this.currentCycle++;
      this.checkSignal();
    }

    if (op === 'addx') {
      this.currentCycle++;
      this.checkSignal();
      this.currentCycle++;
      this.checkSignal();
      this.register += num;
    }
  }

  runProgram() {
    this.operations.forEach((operation) => {
      this.processCycle(...operation);
    });
  }
}

const computer = new Computer(inputArr);
computer.runProgram();

console.log(
  computer.signals.reduce((prev, val) => {
    return prev + val;
  }, 0)
);
