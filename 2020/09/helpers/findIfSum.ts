const findIfSum = (arr: number[], lookFor: number) => {
  const sorted = arr.sort((a, b) => {
    return a > b ? 1 : -1;
  });

  let left = 0;
  let right = arr.length - 1;

  while (left !== right) {
    const sum = sorted[left] + sorted[right];

    if (sum === lookFor) {
      return true;
    }

    if (sum > lookFor) {
      right--;
    }

    if (sum < lookFor) {
      left++;
    }
  }

  return false;
};

export default findIfSum;
