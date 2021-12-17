/**
 * check if the probe already overshot the target, and is there a point in continuing calculations
 * @param posX horizontal position of the probe
 * @param posY vertical position of the probe
 * @param xMax the furthest edge of the target
 * @param yMax the lowest edge of the target
 * @returns boolean
 */
const isOvershot = (posX: number, posY: number, xMax: number, yMax: number) => {
  if (posX > xMax) {
    return true;
  }
  if (posY < yMax) {
    return true;
  }

  return false;
};

export default isOvershot;
