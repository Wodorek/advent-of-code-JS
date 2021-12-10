import transformMatrix from './transformMatrix';

/**
 * Checks if all numbers in a row or column are selected, determining the state of the board
 *
 * @param arr two dimensional array of size x by x
 * @returns winning state of the board
 */
const checkForWin = (arr: any[][]) => {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];

    if (
      el.every((el) => {
        return typeof el === 'number';
      })
    ) {
      return true;
    }
  }

  //check for win in columns
  const rotated = transformMatrix(arr);
  for (let i = 0; i < rotated.length; i++) {
    const el = rotated[i];

    if (
      el.every((el) => {
        return typeof el === 'number';
      })
    ) {
      return true;
    }
  }

  return false;
};
export default checkForWin;
