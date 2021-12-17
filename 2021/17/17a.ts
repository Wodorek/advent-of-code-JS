import input from './input';
import prepareInput from './helpers/prepareInput';

const [xRange, yRange] = prepareInput(input);

console.log(xRange, yRange);

const isWithinRange = (
  posX: number,
  posY: number,
  xRange: number[],
  yRange: number[]
) => {
  if (
    posX >= xRange[0] &&
    posX <= xRange[1] &&
    posY >= yRange[0] &&
    posY <= yRange[1]
  ) {
    return true;
  }
  return false;
};

//if we already overshot, there is no point in doing more calculations, since we can't go back
const isOvershot = (posX: number, posY: number, xMax: number, yMax: number) => {
  if (posX > xMax) {
    return true;
  }
  if (posY < yMax) {
    return true;
  }

  return false;
};

const calculateStep = (position: number[], velocities: number[]) => {
  const newPosition = [
    position[0] + velocities[0],
    position[1] + velocities[1],
  ];

  let newXV = velocities[0];

  if (newXV > 0) {
    newXV--;
  } else if (newXV < 0) {
    newXV++;
  }

  const newYV = velocities[1] - 1;

  return [newPosition, [newXV, newYV]];
};

let currPosition = [0, 0];

const yvs = [];

for (let x = 1; x < xRange[1] + 1; x++) {
  for (let y = 1; y < xRange[1]; y++) {
    let velocities = [x, y];

    while (
      !isOvershot(currPosition[0], currPosition[1], xRange[1], yRange[0])
    ) {
      if (isWithinRange(currPosition[0], currPosition[1], xRange, yRange)) {
        yvs.push(y);
        break;
      }

      const [newPos, newVelocities] = calculateStep(currPosition, velocities);

      currPosition = newPos;
      velocities = newVelocities;
    }

    currPosition = [0, 0];
  }
}

const maxYV = Math.max(...yvs);

const solution = (maxYV * (maxYV + 1)) / 2;

console.log(solution);
