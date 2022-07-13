import input from './input';

import prepareInput from './helpers/prepareInput';

const ops = {
  addr: (r: number[], a: number, b: number) => r[a] + r[b],
  addi: (r: number[], a: number, b: number) => r[a] + b,
  mulr: (r: number[], a: number, b: number) => r[a] * r[b],
  muli: (r: number[], a: number, b: number) => r[a] * b,
  banr: (r: number[], a: number, b: number) => r[a] & r[b],
  bani: (r: number[], a: number, b: number) => r[a] & b,
  borr: (r: number[], a: number, b: number) => r[a] | r[b],
  bori: (r: number[], a: number, b: number) => r[a] | b,
  setr: (r: number[], a: number) => r[a],
  seti: (r: number[], a: number) => a,
  gtir: (r: number[], a: number, b: number) => (a > r[b] ? 1 : 0),
  gtri: (r: number[], a: number, b: number) => (r[a] > b ? 1 : 0),
  gtrr: (r: number[], a: number, b: number) => (r[a] > r[b] ? 1 : 0),
  eqir: (r: number[], a: number, b: number) => (a === r[b] ? 1 : 0),
  eqri: (r: number[], a: number, b: number) => (r[a] === b ? 1 : 0),
  eqrr: (r: number[], a: number, b: number) => (r[a] === r[b] ? 1 : 0),
};

const [bound, program] = prepareInput(input);
const register = [0, 0, 0, 0, 0, 0];

//from part 1
let lowerBound = 0;

while (register[bound] >= 0 && register[bound] < program.length) {
  const [op, a, b, c] = program[register[bound]];
  if (op === 'eqrr' && b === 0) {
    lowerBound = register[a];
    break;
  }
  register[c] = ops[op as keyof typeof ops](register, a, b);
  register[bound]++;
}

//I hate those "analaze the input puzzles..."

let r4 = 11840402;
const history: number[] = [];
do {
  if (history.includes(r4)) {
    console.log(history[history.length - 1]);
    break;
  }
  history.push(r4);
  let r2 = r4 | 65536;
  r4 = 16123384;
  do {
    r4 += r2 & 255;
    r4 &= 16777215;
    r4 *= 65899;
    r4 &= 16777215;
    if (r2 < 256) break;
    r2 = Math.floor(r2 / 256);
  } while (true);
} while (true);
