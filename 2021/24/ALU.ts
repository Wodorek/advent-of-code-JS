export class ALU {
  pointer: number = 0;
  vars: {
    w: number;
    x: number;
    y: number;
    z: number;
  };
  checking: number[];
  input: string[][];

  constructor(checking: number, input: string[][]) {
    this.pointer = 0;
    this.vars = {
      w: 0,
      x: 0,
      y: 0,
      z: 0,
    };
    this.checking = checking.toString().split('').map(Number);

    this.input = [...input];
  }

  ops = {
    inp: (p1: any, p2: any) => {
      const val = this.checking.shift()!;
      this.vars[p1 as keyof typeof this.vars] = val;
    },
    add: (p1: any, p2: any) => {
      const toAdd = !isNaN(p2) ? +p2 : this.vars[p2 as keyof typeof this.vars];

      this.vars[p1 as keyof typeof this.vars] += toAdd;
    },
    mul: (p1: any, p2: any) => {
      const multiplyBy = !isNaN(p2)
        ? +p2
        : this.vars[p2 as keyof typeof this.vars];

      this.vars[p1 as keyof typeof this.vars] *= multiplyBy;
    },
    div: (p1: any, p2: any) => {
      const divideBy = !isNaN(p2)
        ? +p2
        : this.vars[p2 as keyof typeof this.vars];

      this.vars[p1 as keyof typeof this.vars] = Math.floor(
        this.vars[p1 as keyof typeof this.vars] / divideBy
      );
    },
    mod: (p1: any, p2: any) => {
      const modBy = !isNaN(p2) ? +p2 : this.vars[p2 as keyof typeof this.vars];

      this.vars[p1 as keyof typeof this.vars] =
        this.vars[p1 as keyof typeof this.vars] % modBy;
    },
    eql: (p1: any, p2: any) => {
      const toCompare = !isNaN(p2)
        ? +p2
        : this.vars[p2 as keyof typeof this.vars];

      if (this.vars[p1 as keyof typeof this.vars] === toCompare) {
        this.vars[p1 as keyof typeof this.vars] = 1;
      } else {
        this.vars[p1 as keyof typeof this.vars] = 0;
      }
    },
  };

  runProgram() {
    if (this.checking.includes(0)) {
      return false;
    }

    while (this.input.length > 0) {
      const [operation, p1, p2] = this.input.shift()!;

      this.ops[operation as keyof typeof this.ops](p1, p2);
    }
    if (this.vars.z === 0) {
      return true;
    } else {
      return false;
    }
  }
}
