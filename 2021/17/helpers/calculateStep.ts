/**
 *
 * @param position current position of the probe [x-axis, y-axis]
 * @param velocities current velocities of the probe [x-v, y-v]
 * @returns new position and velocities after taking one "step"
 */
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

export default calculateStep;
