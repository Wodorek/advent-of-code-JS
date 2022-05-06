const prepareInput = (input: string) => {
  const split = input.split('\n');

  const fillerSlice: string[][] = [];
  fillerSlice.length = split.length;

  const fillerRow: string[] = [];
  fillerRow.length = split.length;
  fillerRow.fill('.');
  fillerSlice.fill(fillerRow);

  const cubed: string[][][] = [];

  for (let index = 0; index < split.length; index++) {
    cubed.push(fillerSlice);
  }

  const actualSlice = split.map((el) => {
    return el.split('');
  });

  cubed[Math.floor(cubed.length / 2)] = actualSlice;

  return cubed;
};

export default prepareInput;
