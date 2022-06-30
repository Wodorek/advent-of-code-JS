import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

inputArr[0] = 2;

const vm = new VM(inputArr);

const grid = [];

let row: string[] = [];

const L = 'L';
const R = 'R';

const routineFunctions = {
  A: [L, 6, R, 12, L, 6, L, 8, L, 8],
  B: [L, 6, R, 12, R, 8, L, 8],
  C: [L, 4, L, 4, L, 6],
};

const parsedFunctions: { [key: string]: number[] } = {};

Object.keys(routineFunctions).forEach((key) => {
  const arr = routineFunctions[key as keyof typeof routineFunctions];

  const parsed: number[] = [];

  arr.forEach((el) => {
    if (!isNaN(+el) && +el >= 10) {
      parsed.push(`${el}`.charCodeAt(0));
      parsed.push(`${el}`.charCodeAt(1));
    } else {
      parsed.push(`${el}`.charCodeAt(0));
    }

    parsed.push(44);
  });

  parsed.pop();
  parsed.push(10);

  parsedFunctions[key] = parsed;
});

const routine = ['A', 'A', 'B', 'C', 'B', 'A', 'C', 'B', 'C', 'A'];

const parsedRoutine: number[] = [];

routine.forEach((el) => {
  parsedRoutine.push(el.charCodeAt(0));
  parsedRoutine.push(44);
});

parsedRoutine.pop();

const inputs: number[] = [
  ...parsedRoutine,
  10,
  ...parsedFunctions['A'],
  ...parsedFunctions['B'],
  ...parsedFunctions['C'],
  121,
  10,
];

let inputIdx = 0;

while (vm.working) {
  vm.executeInstruction(inputs[inputIdx]);

  if (vm.lastCommand === 3) {
    inputIdx++;
  }

  if (vm.lastCommand === 4) {
    const output = vm.getLastOutput;

    if (output === 10) {
      grid.push(row);
      row = [];
    } else {
      row.push(String.fromCharCode(output));
    }
  }
}

console.log('out', vm.getLastOutput);

//below was used to find the path taken, and the movement functions

// const lookaroundMap: {
//   [key: string]: { left: [number, number]; right: [number, number] };
// } = {
//   '-1,0': {
//     left: [0, -1],
//     right: [0, 1],
//   },
//   '0,1': {
//     left: [-1, 0],
//     right: [1, 0],
//   },
//   '1,0': {
//     left: [0, 1],
//     right: [0, -1],
//   },
//   '0,-1': {
//     left: [1, 0],
//     right: [-1, 0],
//   },
// };

// class Robot {
//   facing: [number, number];
//   position: [number, number];
//   scaffoldMap: string[][];
//   finished: boolean;
//   stepsCounter: number = 0;
//   pathTaken: any[] = [];

//   constructor(
//     map: string[][],
//     position: [number, number],
//     facing: [number, number]
//   ) {
//     this.facing = facing;
//     this.position = position;
//     this.scaffoldMap = map;
//     this.finished = false;
//   }

//   turn(direction: 'L' | 'R') {
//     const directions = ['-1,0', '0,1', '1,0', '0,-1'];

//     const currentDirection = `${this.facing[0]},${this.facing[1]}`;
//     let dirIdx = directions.indexOf(currentDirection);

//     if (direction === 'L') {
//       dirIdx--;
//     } else {
//       dirIdx++;
//     }

//     if (dirIdx > 3) {
//       dirIdx = 0;
//     } else if (dirIdx === -1) {
//       dirIdx = 3;
//     }

//     const currFacing = directions[dirIdx].split(',').map(Number);

//     this.facing = [currFacing[0], currFacing[1]];
//   }

//   lookLeftRight() {
//     const { left, right } =
//       lookaroundMap[`${this.facing[0]},${this.facing[1]}`];

//     const toLeft =
//       this.scaffoldMap[this.position[0] + left[0]]?.[
//         this.position[1] + left[1]
//       ] || '.';
//     const toRight =
//       this.scaffoldMap[this.position[0] + right[0]]?.[
//         this.position[1] + right[1]
//       ] || '.';

//     return {
//       toLeft,
//       toRight,
//     };
//   }

//   move() {
//     const inFront =
//       this.scaffoldMap[this.position[0] + this.facing[0]]?.[
//         this.position[1] + this.facing[1]
//       ] || '.';

//     if (inFront === '#') {
//       this.position[0] += this.facing[0];
//       this.position[1] += this.facing[1];
//       this.stepsCounter++;
//     } else {
//       const { toLeft, toRight } = this.lookLeftRight();

//       if (toLeft === '#') {
//         this.turn('L');
//         if (this.stepsCounter > 0) {
//           this.pathTaken.push(this.stepsCounter);
//         }
//         this.pathTaken.push('L');
//         this.stepsCounter = 0;
//       } else if (toRight === '#') {
//         this.turn('R');
//         if (this.stepsCounter > 0) {
//           this.pathTaken.push(this.stepsCounter);
//         }
//         this.pathTaken.push('R');
//         this.stepsCounter = 0;
//       } else {
//         this.finished = true;
//         this.pathTaken.push(this.stepsCounter);
//       }
//     }
//   }
// }

// let position: [number, number] = [-1, -1];

// grid.forEach((row, x) => {
//   row.forEach((char, y) => {
//     if (char === '^') {
//       position = [x, y];
//     }
//   });
// });

// const robot = new Robot(grid, position, [-1, 0]);

// while (!robot.finished) {
//   robot.move();
// }

// console.log(robot.pathTaken);
