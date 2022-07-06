import input from './input';

import prepareInput from './helpers/prepareInput';

const [bindTo, instructions] = prepareInput(input);

class OpcodeDevice {
  registers: number[];
  working: boolean;
  pointerValue: number;
  pointerBoundTo: number;

  constructor(initialRegisters: number[], pointer: number) {
    this.registers = initialRegisters;
    this.working = true;
    this.pointerBoundTo = pointer;
    this.pointerValue = this.registers[pointer];
  }

  bindPointer(to: number) {
    this.pointerValue = this.registers[to];
  }

  ops = {
    addr: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] + this.registers[B];

      return modifiedRegisters;
    },
    addi: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] + B;

      return modifiedRegisters;
    },
    mulr: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] * this.registers[B];

      return modifiedRegisters;
    },
    muli: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] * B;

      return modifiedRegisters;
    },
    banr: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] & this.registers[B];

      return modifiedRegisters;
    },
    bani: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] & B;

      return modifiedRegisters;
    },
    boor: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] | this.registers[B];

      return modifiedRegisters;
    },
    bori: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] | B;

      return modifiedRegisters;
    },
    setr: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A];

      return modifiedRegisters;
    },
    seti: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = A;

      return modifiedRegisters;
    },
    gtir: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = A > this.registers[B] ? 1 : 0;

      return modifiedRegisters;
    },
    gtri: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] > B ? 1 : 0;

      return modifiedRegisters;
    },
    gtrr: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] > this.registers[B] ? 1 : 0;

      return modifiedRegisters;
    },
    eqir: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = A === this.registers[B] ? 1 : 0;

      return modifiedRegisters;
    },
    eqri: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] === B ? 1 : 0;

      return modifiedRegisters;
    },
    eqrr: (A: number, B: number, C: number) => {
      const modifiedRegisters = [...this.registers];

      modifiedRegisters[C] = this.registers[A] === this.registers[B] ? 1 : 0;

      return modifiedRegisters;
    },
  };

  executeInstruction(operation: string, A: number, B: number, C: number) {
    if (this.pointerValue) {
      this.registers[this.pointerBoundTo] = this.pointerValue;
    }

    const modifiedRegisters = this.ops[operation as keyof typeof this.ops](
      A,
      B,
      C
    );
    this.registers = modifiedRegisters;
    this.pointerValue = this.registers[this.pointerBoundTo];
    this.pointerValue++;

    return this.pointerValue;
  }
}

const halted: number[] = [];

for (let i = 0; i < 600000; i++) {
  const device = new OpcodeDevice([i, 0, 0, 0, 0, 0], bindTo);

  let currentInst = device.registers[bindTo];
  for (let j = 0; j < 1000; j++) {
    currentInst = device.executeInstruction(...instructions[currentInst]);

    if (currentInst > instructions.length - 1 || currentInst < 0) {
      console.log(i);
      halted.push(i);
      break;
    }
  }
}

console.log(halted);
