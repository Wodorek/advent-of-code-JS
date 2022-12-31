import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

class Computer {
  operations: [string, number][] = [];
  currentCycle = 1;
  register = 1;
  currRow = 0;
  signals: number[] = [];
  crt: string[][] = [];

  constructor(ops: [string, number][]) {
    this.operations = ops;

    for (let i = 0; i <= 5; i++) {
      const row: string[] = [];

      for (let j = 0; j <= 39; j++) {
        row.push('.');
      }

      this.crt.push(row);
    }
  }

  display() {
    this.crt.forEach((row) => {
      console.log(row.join(' '));
    });
  }

  checkSignal() {}

  processCycle(op: string, num: number) {
    if (op === 'noop') {
      this.currentCycle++;
      this.checkSignal();
    }

    if (op === 'addx') {
      this.checkSignal();
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
computer.display();
