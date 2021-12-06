/**
 * Converts a string input, to an usable array
 * @param input a string of comma separated numbers
 * @returns an array of numbers
 */
const prepareInput = (input: string) => {
  return input.split(',').map((el) => {
    return +el;
  });
};

export default prepareInput;
