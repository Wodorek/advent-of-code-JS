import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

class Computer {
  operations: [string, number][] = [];
  currentCycle = 1;
  register = 1;
  signals: number[] = [];
  crt: string[][] = [];
  scanline: string[] = [];
  row = 0;

  constructor(ops: [string, number][]) {
    this.operations = ops;
  }

  display() {
    this.crt.forEach((row) => {
      console.log(row.join(' '));
    });
  }

  checkSignal() {
    const sprite = [this.register - 1, this.register, this.register + 1];

    if (sprite.includes(this.currentCycle - 1 - 40 * this.row)) {
      this.scanline.push('#');
    } else {
      this.scanline.push(' ');
    }

    if (this.scanline.length === 40) {
      this.crt.push(this.scanline);
      this.scanline = [];
      this.row++;
    }
  }

  processCycle(op: string, num: number) {
    if (op === 'noop') {
      this.checkSignal();
      this.currentCycle++;
    }

    if (op === 'addx') {
      this.checkSignal();
      this.currentCycle++;
      this.checkSignal();
      this.currentCycle++;
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
console.log(computer.scanline.join(''));
