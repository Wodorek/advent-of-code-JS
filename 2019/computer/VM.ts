class VM {
  pointer: number;
  memory: number[];
  inputIdx: number;

  constructor(memory: number[]) {
    this.pointer = 0;
    this.memory = memory;
    this.inputIdx = 0;
  }

  ops = {
    1: (p1: number, p2: number, p3: number) => {
      this.memory[p3] = this.memory[p1] + this.memory[p2];
      this.pointer += 4;
      return true;
    },
    2: (p1: number, p2: number, p3: number) => {
      this.memory[p3] = this.memory[p1] * this.memory[p2];
      this.pointer += 4;
      return true;
    },
    3: (p1: number, p2: number, p3: number, inputs: number[]) => {
      this.memory[p1] = inputs[this.inputIdx];
      this.pointer += 2;
      this.inputIdx++;
      return true;
    },
    4: (
      p1: number,
      p2: number,
      p3: number,
      inputs: number[],
      outputs: number[]
    ) => {
      outputs.push(this.memory[p1]);
      this.pointer += 2;
      return true;
    },
    5: (p1: number, p2: number) => {
      if (this.memory[p1] !== 0) {
        this.pointer = this.memory[p2];
      } else {
        this.pointer += 3;
      }
      return true;
    },
    6: (p1: number, p2: number) => {
      if (this.memory[p1] === 0) {
        this.pointer = this.memory[p2];
      } else {
        this.pointer += 3;
      }
      return true;
    },
    7: (p1: number, p2: number, p3: number) => {
      if (this.memory[p1] < this.memory[p2]) {
        this.memory[p3] = 1;
      } else {
        this.memory[p3] = 0;
      }
      this.pointer += 4;
      return true;
    },
    8: (p1: number, p2: number, p3: number) => {
      if (this.memory[p1] === this.memory[p2]) {
        this.memory[p3] = 1;
      } else {
        this.memory[p3] = 0;
      }
      this.pointer += 4;
      return true;
    },
    99: () => {
      return false;
    },
  };

  exectuteOperation(inputs: number[], outputs: number[]) {
    const asStr = this.memory[this.pointer].toString().padStart(5, '0');
    const opcode = parseInt(asStr.slice(3)) as keyof typeof this.ops;

    const param1 =
      asStr[2] === '0' ? this.memory[this.pointer + 1] : this.pointer + 1;
    const param2 =
      asStr[1] === '0' ? this.memory[this.pointer + 2] : this.pointer + 2;
    const param3 =
      asStr[0] === '0' ? this.memory[this.pointer + 3] : this.pointer + 3;

    return this.ops[opcode](param1, param2, param3, inputs, outputs);
  }
}

export default VM;
