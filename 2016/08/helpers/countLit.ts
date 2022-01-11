const countLit = (arr: string[][]) => {
  let count = 0;

  arr.forEach((row) => {
    row.forEach((light) => {
      if (light === '#') {
        count++;
      }
    });
  });

  return count;
};

export default countLit;
