/**
 * Rotates the matrix 90deg, for ease of checking for winning condition
 * @param arr A two dimensional array of size x by x (square)
 * @returns the array with values "rotated" 90deg
 */
const transformMatrix = (arr: any[][]): any[][] => {
  return arr[0].map((_: any, index: number) =>
    arr.map((row) => row[index]).reverse()
  );
};

export default transformMatrix;
