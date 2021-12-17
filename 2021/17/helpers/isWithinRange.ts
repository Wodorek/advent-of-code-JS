/**
 * check if the probe is on the target
 * @param posX horizontal position of the probe
 * @param posY vertical position of the probe
 * @param xRange horizontal target range
 * @param yRange vertical target range
 * @returns if probe is on the target
 */
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

export default isWithinRange;
