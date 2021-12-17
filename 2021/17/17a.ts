import input from './input';
import prepareInput from './helpers/prepareInput';
import isOvershot from './helpers/isOvershot';
import isWithinRange from './helpers/isWithinRange';
import calculateStep from './helpers/calculateStep';

const [xRange, yRange] = prepareInput(input);

console.log(xRange, yRange);

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
