const getMax = (
  coordinates: [string, number, string, number, number][],
  axis: 'x' | 'y'
) => {
  let max = -Infinity;

  coordinates.forEach((coordinate) => {
    if (coordinate[0] === axis) {
      max = Math.max(max, coordinate[1]);
    }

    if (coordinate[2] === axis) {
      max = Math.max(max, coordinate[3]);
    }
  });

  return max;
};

export default getMax;
