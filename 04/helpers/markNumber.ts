const markNumber = (matrix: any[][], number: number) => {
  for (let i = 0; i < matrix.length; i++) {
    const el = matrix[i];

    for (let j = 0; j < el.length; j++) {
      let element = el[j];

      if (+element === number) {
        matrix[i][j] = +matrix[i][j];
      }
    }
  }
  return matrix;
};
export default markNumber;
