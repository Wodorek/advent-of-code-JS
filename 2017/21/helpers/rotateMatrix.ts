const rotateMatrix = (matrix: string[][]) => {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
};

export default rotateMatrix;
