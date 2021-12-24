const compareCycles = (cycle1: string[], cycle2: string[]) => {
  for (let i = 0; i < cycle1.length; i++) {
    const row1 = cycle1[i];
    const row2 = cycle2[i];

    if (row1 !== row2) {
      return false;
    }
  }

  return true;
};

export default compareCycles;
