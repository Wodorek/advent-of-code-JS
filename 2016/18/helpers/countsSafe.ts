const countSafe = (rows: string[]) => {
  let count = 0;

  rows.forEach((row) => {
    const split = row.split('');

    split.forEach((char) => {
      if (char === '.') {
        count++;
      }
    });
  });

  return count;
};

export default countSafe;
