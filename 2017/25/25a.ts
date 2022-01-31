let cursor = 0;
const tape = [0];
let state = 'A' as keyof typeof states;

const moveCursor = (to: number) => {
  cursor = cursor + to;

  if (cursor < 0) {
    tape.unshift(0);
    cursor = 0;
  }

  if (!tape[cursor]) {
    tape[cursor] = 0;
  }
};

const states = {
  A() {
    const currVal = tape[cursor];
    if (currVal === 0) {
      tape[cursor] = 1;
      moveCursor(1);
      return 'B' as keyof typeof states;
    } else {
      tape[cursor] = 1;
      moveCursor(-1);
      return 'E' as keyof typeof states;
    }
  },

  B() {
    const currVal = tape[cursor];
    if (currVal === 0) {
      tape[cursor] = 1;
      moveCursor(1);
      return 'C' as keyof typeof states;
    } else {
      tape[cursor] = 1;
      moveCursor(1);
      return 'F' as keyof typeof states;
    }
  },

  C() {
    const currVal = tape[cursor];
    if (currVal === 0) {
      tape[cursor] = 1;
      moveCursor(-1);
      return 'D' as keyof typeof states;
    } else {
      tape[cursor] = 0;
      moveCursor(1);
      return 'B' as keyof typeof states;
    }
  },

  D() {
    const currVal = tape[cursor];
    if (currVal === 0) {
      tape[cursor] = 1;
      moveCursor(1);
      return 'E' as keyof typeof states;
    } else {
      tape[cursor] = 0;
      moveCursor(-1);
      return 'C' as keyof typeof states;
    }
  },

  E() {
    const currVal = tape[cursor];
    if (currVal === 0) {
      tape[cursor] = 1;
      moveCursor(-1);
      return 'A' as keyof typeof states;
    } else {
      tape[cursor] = 0;
      moveCursor(1);
      return 'D' as keyof typeof states;
    }
  },

  F() {
    const currVal = tape[cursor];
    if (currVal === 0) {
      tape[cursor] = 1;
      moveCursor(1);
      return 'A' as keyof typeof states;
    } else {
      tape[cursor] = 1;
      moveCursor(1);
      return 'C' as keyof typeof states;
    }
  },
};

for (let i = 0; i < 12459852; i++) {
  state = states[state]();
}

let total = 0;

tape.forEach((el) => {
  if (el === 1) {
    total++;
  }
});

console.log(total);
