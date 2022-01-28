const flipMatrix = (matrix: string[][]) => {
  const center = Math.floor(matrix.length / 2);

  const newMatrix: string[][] = JSON.parse(JSON.stringify(matrix));

  for (let i = 0; i < newMatrix.length; i++) {
    for (let j = 0; j < center; j++) {
      [newMatrix[i][j], newMatrix[i][newMatrix.length - 1 - j]] = [
        newMatrix[i][newMatrix.length - 1 - j],
        newMatrix[i][j],
      ];
    }
  }

  return newMatrix;
};

export default flipMatrix;
