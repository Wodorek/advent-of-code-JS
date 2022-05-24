function flipHorizontal(matrix: string[][]) {
  const flipped: string[][] = [];
  flipped.length = matrix.length;

  for (let i = 0; i < matrix.length; i++) {
    flipped[i] = matrix[matrix.length - 1 - i];
  }

  return flipped;
}

export default flipHorizontal;
