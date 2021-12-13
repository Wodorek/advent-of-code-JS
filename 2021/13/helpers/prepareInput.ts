const prepareInput = (str: string) => {
  const elements = str.split(/\n/);

  const dots: number[][] = [];
  const instructions: string[][] = [];

  elements.forEach((el) => {
    if (el === '') {
      return;
    }

    if (/[0-9]/.test(el[0])) {
      const coords = el.split(',');

      dots.push([+coords[0], +coords[1]]);
    } else {
      const split = el.split(' ');

      const instruction = split[2].split('=');

      instructions.push([instruction[0], instruction[1]]);
    }
  });

  return [dots, instructions] as [number[][], string[][]];
};

export default prepareInput;
