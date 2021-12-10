/**
 * Marks the selected number on the board
 *
 * @param matrix a two dimensional array of size x by x (square)
 * @param number number which should be marked on the board, if it can be found on it
 * @returns the same matrix, with "marked" value having type changed from string to number
 */
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
