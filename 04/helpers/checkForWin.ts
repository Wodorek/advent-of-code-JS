import transformMatrix from './transformMatrix';

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
