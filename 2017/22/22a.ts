import input from './input';

import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

class InfectionVector {
  position: {
    row: number;
    col: number;
  };
  facing: number[];

  constructor(row: number, col: number) {
    this.position = { row, col };
    this.facing = [-1, 0];
  }

  getPosition(): [number, number] {
    return [this.position.row, this.position.col];
  }

  rotate(dir: 'left' | 'right') {
    const directions = ['-1,0', '0,1', '1,0', '0,-1'];

    let currPosIdx = directions.indexOf(this.facing.join(','));
    const side = dir === 'left' ? -1 : 1;

    currPosIdx += side;

    if (currPosIdx === -1) {
      currPosIdx = 3;
    }

    if (currPosIdx === 4) {
      currPosIdx = 0;
    }

    this.facing = [...directions[currPosIdx].split(',').map(Number)];
  }

  move() {
    this.position.row += this.facing[0];
    this.position.col += this.facing[1];

    if (this.position.col > inputArr[0].length - 1) {
      inputArr = inputArr.map((el) => {
        return [...el, '.'];
      });
    }

    if (this.position.col < 0) {
      this.position.col = 0;
      inputArr = inputArr.map((el) => {
        return ['.', ...el];
      });
    }

    if (this.position.row > inputArr.length - 1) {
      const newRow: string[] = [];
      newRow.length = inputArr[0].length;
      newRow.fill('.');
      inputArr.push(newRow);
    }

    if (this.position.row < 0) {
      this.position.row = 0;
      const newRow: string[] = [];
      newRow.length = inputArr[0].length;
      newRow.fill('.');
      inputArr.unshift(newRow);
    }
  }
}

const vector = new InfectionVector(
  Math.round((inputArr.length - 1) / 2),
  Math.round((inputArr.length - 1) / 2)
);

let infections = 0;

for (let i = 0; i < 10000; i++) {
  const position = vector.getPosition();

  const node = inputArr[position[0]][position[1]];

  if (node === '#') {
    vector.rotate('right');
    inputArr[position[0]][position[1]] = '.';
  } else {
    infections++;
    vector.rotate('left');
    inputArr[position[0]][position[1]] = '#';
  }

  vector.move();
}

console.log(infections);
