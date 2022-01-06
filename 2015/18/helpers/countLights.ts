const countLights = (grid: string[]) => {
  let onCount = 0;

  grid.forEach((line) => {
    line.split('').forEach((light) => {
      if (light === '#') {
        onCount++;
      }
    });
  });

  return onCount;
};

export default countLights;
