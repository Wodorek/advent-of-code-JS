import input from './input';

import prepareInput from './helpers/prepareInput';

let inputArr = prepareInput(input);

const infectedNodes: { [key: string]: string } = {};

for (let i = 0; i < inputArr.length; i++) {
  const element = inputArr[i];

  for (let j = 0; j < element.length; j++) {
    if (element[j] === '#') {
      infectedNodes[`${i},${j}`] = '#';
    }
  }
}

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

  getPosition() {
    return `${this.position.row},${this.position.col}`;
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
  }
}

const vector = new InfectionVector(
  Math.round((inputArr.length - 1) / 2),
  Math.round((inputArr.length - 1) / 2)
);

let totalInfections = 0;

for (let i = 0; i < 10000000; i++) {
  const position = vector.getPosition();

  if (!infectedNodes[position]) {
    infectedNodes[position] = 'W';
    vector.rotate('left');
  } else {
    const nodeType = infectedNodes[position];

    if (nodeType === 'W') {
      totalInfections++;
      infectedNodes[position] = '#';
    }

    if (nodeType === '#') {
      infectedNodes[position] = 'F';
      vector.rotate('right');
    }

    if (nodeType === 'F') {
      delete infectedNodes[position];
      vector.rotate('left');
      vector.rotate('left');
    }
  }

  vector.move();
}

console.log(totalInfections);
