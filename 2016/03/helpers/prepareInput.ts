const prepareInput = (input: string) => {
  const split = input.split('\n');
  const triangles: number[][] = [];

  split.forEach((el) => {
    const sides = el.match(/[0-9]+/g)!;
    const asNums = sides.map(Number);

    triangles.push(asNums);
  });

  return triangles;
};

export default prepareInput;
