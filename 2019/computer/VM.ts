export class VM {
  memory: number[];
  pointer: number;
  working: boolean;
  outputs: number[];
  lastCommand: number;
  inputIdx: number;
  //refrence itself?

  constructor(memory: number[]) {
    this.memory = memory;
    this.pointer = 0;
    this.working = true;
    this.outputs = [];
    this.lastCommand = 0;
    this.inputIdx = 0;
  }

  ops = {
    //needs rewrite
    1: (p1: number, p2: number, p3: number) => {
      this.memory[p3] = this.memory[p1] + this.memory[p2];

      this.pointer += 4;
      this.lastCommand = 1;
    },

    2: (p1: number, p2: number, p3: number) => {
      this.memory[p3] = this.memory[p1] * this.memory[p2];

      this.pointer += 4;
      this.lastCommand = 2;
    },

    3: (p1: number, p2: number, p3: number, input: number) => {
      this.memory[p1] = input;

      this.pointer += 2;
      this.lastCommand = 3;
    },

    4: (p1: number) => {
      this.outputs.push(this.memory[p1]);

      this.pointer += 2;
      this.lastCommand = 4;
    },

    5: (p1: number, p2: number) => {
      if (this.memory[p1] !== 0) {
        this.pointer = this.memory[p2];
      } else {
        this.pointer += 3;
      }
      this.lastCommand = 5;
    },

    6: (p1: number, p2: number) => {
      if (this.memory[p1] === 0) {
        this.pointer = this.memory[p2];
      } else {
        this.pointer += 3;
      }
      this.lastCommand = 6;
    },

    7: (p1: number, p2: number, p3: number) => {
      if (this.memory[p1] < this.memory[p2]) {
        this.memory[p3] = 1;
      } else {
        this.memory[p3] = 0;
      }
      this.pointer += 4;
      this.lastCommand = 7;
    },

    8: (p1: number, p2: number, p3: number) => {
      if (this.memory[p1] === this.memory[p2]) {
        this.memory[p3] = 1;
      } else {
        this.memory[p3] = 0;
      }
      this.pointer += 4;
      this.lastCommand = 8;
    },

    99: () => {
      this.lastCommand = 99;
      this.working = false;
    },
  };

  executeInstruction(input = 0) {
    const asStr = this.memory[this.pointer].toString().padStart(5, '0');
    const opcode = parseInt(asStr.slice(3)) as keyof typeof this.ops;

    const param1 =
      asStr[2] === '0' ? this.memory[this.pointer + 1] : this.pointer + 1;
    const param2 =
      asStr[1] === '0' ? this.memory[this.pointer + 2] : this.pointer + 2;
    const param3 =
      asStr[0] === '0' ? this.memory[this.pointer + 3] : this.pointer + 3;

    this.ops[opcode](param1, param2, param3, input);
  }

  get getLastOutput() {
    return this.outputs[this.outputs.length - 1];
  }
}
