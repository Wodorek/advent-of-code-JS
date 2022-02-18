const getMin = (
  coordinates: [string, number, string, number, number][],
  axis: 'x' | 'y'
) => {
  let min = Infinity;

  coordinates.forEach((coordinate) => {
    if (coordinate[0] === axis) {
      min = Math.min(min, coordinate[1]);
    }

    if (coordinate[2] === axis) {
      min = Math.min(min, coordinate[3]);
    }
  });

  return min;
};

export default getMin;
