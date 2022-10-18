/**
 * Prepare input by changing the string provided in the challenge into a workable format
 * @param input a string of values, separated by a newline
 */
const prepareInput = (input: string) => {
  const split = input.split(/\n+/g);

  const arr: string[][] = [];

  for (let i = 0; i < split.length; i++) {
    const element = split[i].split(' | ');

    arr.push([element[0], element[1]]);
  }

  return arr;
};

export default prepareInput;
