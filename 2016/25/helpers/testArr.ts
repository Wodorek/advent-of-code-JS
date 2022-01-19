const testArr = (arr: number[]) => {
  let currentNum = arr[0];

  if (![0, 1].includes(arr[0])) {
    return false;
  }

  for (let i = 1; i < arr.length; i++) {
    if (![0, 1].includes(arr[i])) {
      return false;
    }

    if (currentNum === arr[i]) {
      return false;
    }

    currentNum = currentNum === 1 ? 0 : 1;
  }

  return true;
};

export default testArr;
