function sortFromPoint(asteroids: number[][], point: [number, number]) {
  return asteroids.sort((a, b) => {
    return (
      ((a[0] - point[0]) ** 2 + (a[1] - point[1])) ** 2 -
      ((b[0] - point[0]) ** 2 + (b[1] - point[1]) ** 2)
    );
  });
}

export default sortFromPoint;
