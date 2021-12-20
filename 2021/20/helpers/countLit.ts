const countLit = (arr: string[][]) => {
  let count = 0;

  for (let row = 0; row < arr.length; row++) {
    const element = arr[row];

    for (let j = 0; j < element.length; j++) {
      const pixel = element[j];

      if (pixel === '#') {
        count++;
      }
    }
  }
  console.log(count);
  return count;
};
export default countLit;
