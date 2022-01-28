const matrixToString = (matrix: string[][]) => {
  return matrix
    .map((el) => {
      return el.join('');
    })
    .join('/');
};

export default matrixToString;
