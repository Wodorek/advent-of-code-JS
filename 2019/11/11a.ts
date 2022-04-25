import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

class Robot {
  position: {
    x: number;
    y: number;
  };
  visitedPlaces: string[];
  facing: [number, number];
  standingOn: 1 | 0;

  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.visitedPlaces = [];
    this.facing = [0, -1];
    this.standingOn = 0;
  }

  moveForward() {
    this.position.x += this.facing[0];
    this.position.y += this.facing[1];

    this.visitedPlaces.push(`${this.position.x},${this.position.y}`);
  }

  turnRobot(direction: 0 | 1) {
    const directions = ['0,-1', '1,0', '0,1', '-1,0'];

    const dirIdx = directions.indexOf(`${this.facing[0]},${this.facing[1]}`);

    let newIdx = direction === 0 ? dirIdx - 1 : dirIdx + 1;

    if (newIdx > 3) {
      newIdx = 0;
    } else if (newIdx < 0) {
      newIdx = 3;
    }

    const newDirection = directions[newIdx].split(',').map(Number);

    this.facing = [newDirection[0], newDirection[1]];
    this.moveForward();
  }
}

const vm = new VM(inputArr);

const robot = new Robot();

let tick = 0;

const tiles: { [key: string]: 1 | 0 } = {};

while (vm.working) {
  vm.executeInstruction(robot.standingOn);

  if (vm.lastCommand === 4) {
    tick++;

    if (tick === 2) {
      const outputs = vm.outputs.slice(vm.outputs.length - 2);

      tiles[`${robot.position.x},${robot.position.y}`] = outputs[0] as 1 | 0;
      robot.turnRobot(outputs[1] as 1 | 0);

      if (tiles[`${robot.position.x},${robot.position.y}`]) {
        robot.standingOn = tiles[`${robot.position.x},${robot.position.y}`];
      } else {
        robot.standingOn = 0;
      }

      tick = 0;
    }
  }
}

console.log(
  new Set(
    robot.visitedPlaces.map((el) => {
      const split = el.split(',');
      return `${split[0]},${split[1]}`;
    })
  ).size
);
