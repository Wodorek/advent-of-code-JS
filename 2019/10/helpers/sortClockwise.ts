function sortClockwise(points: number[][], center: number[]) {
  // Add an angle property to each point using tan(angle) = y/x
  const angles = points.map((asteroid) => {
    return {
      x: asteroid[0],
      y: asteroid[1],
      angle:
        (Math.atan2(asteroid[1] - center[1], asteroid[0] - center[0]) * 180) /
        Math.PI,
    };
  });

  // Sort your points by angle
  const pointsSorted = angles.sort((a, b) => a.angle - b.angle);

  return pointsSorted.map((el) => {
    return [el.x, el.y];
  });
}

export default sortClockwise;
