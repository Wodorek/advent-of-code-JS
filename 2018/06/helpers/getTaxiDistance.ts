const getTaxiDistance = (pos1: number[], pos2: number[]) => {
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
};

export default getTaxiDistance;
