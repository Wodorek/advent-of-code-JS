export class VM {
  memory: number[];
  pointer: number;
  working: boolean;
  outputs: number[];

  constructor(memory: number[]) {
    this.memory = memory;
    this.pointer = 0;
    this.working = true;
    this.outputs = [];
  }

  ops = {
    1: (p1: number, p2: number, p3: number) => {
      this.memory[p3] = this.memory[p1] + this.memory[p2];

      this.pointer += 4;
    },

    2: (p1: number, p2: number, p3: number) => {
      this.memory[p3] = this.memory[p1] * this.memory[p2];

      this.pointer += 4;
    },

    3: (p1: number, p2: number, p3: number, input: number) => {
      this.memory[p1] = input;

      this.pointer += 2;
    },

    4: (p1: number) => {
      this.outputs.push(this.memory[p1]);

      this.pointer += 2;
    },

    5: (p1: number, p2: number) => {
      if (this.memory[p1] !== 0) {
        this.pointer = this.memory[p2];
      } else {
        this.pointer += 3;
      }
    },

    6: (p1: number, p2: number) => {
      if (this.memory[p1] === 0) {
        this.pointer = this.memory[p2];
      } else {
        this.pointer += 3;
      }
    },

    7: (p1: number, p2: number, p3: number) => {
      if (this.memory[p1] < this.memory[p2]) {
        this.memory[p3] = 1;
      } else {
        this.memory[p3] = 0;
      }
      this.pointer += 4;
    },

    8: (p1: number, p2: number, p3: number) => {
      if (this.memory[p1] === this.memory[p2]) {
        this.memory[p3] = 1;
      } else {
        this.memory[p3] = 0;
      }
      this.pointer += 4;
    },

    99: () => {
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
}
