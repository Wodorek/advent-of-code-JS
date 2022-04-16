export class VM {
  memory: number[];
  pointer: number;
  working: boolean;

  constructor(memory: number[]) {
    this.memory = memory;
    this.pointer = 0;
    this.working = true;
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

    99: () => {
      this.working = false;
    },
  };

  executeInstruction() {
    const asStr = this.memory[this.pointer].toString().padStart(5, '0');
    const opcode = parseInt(asStr.slice(3)) as keyof typeof this.ops;

    this.ops[opcode](
      this.memory[this.pointer + 1],
      this.memory[this.pointer + 2],
      this.memory[this.pointer + 3]
    );
  }
}
