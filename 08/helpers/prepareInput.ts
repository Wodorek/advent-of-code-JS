/**
 * Prepare input by changing the string provided in the challenge into a workable format
 * @param input a string of values, separated by a newline
 */
const prepareInput = (input: string) => {
  // for real input
  // const split = input.split(/[a-z]\n+/g);

  //for test input
  const split = input.split('\n');

  const arr: string[][] = [];

  //real input

  // for (let i = 0; i < split.length; i++) {
  //   const element = split[i].split(' | ');

  //   arr.push([element[0], element[1]]);
  // }

  //test input

  for (let i = 0; i < split.length; i += 2) {
    arr.push([split[0].replace(' |', ''), split[1]]);
  }

  return arr;
};

export default prepareInput;
