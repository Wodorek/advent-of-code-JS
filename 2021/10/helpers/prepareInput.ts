/**
 * Trasforms input string into an array of elements
 * @param input string of brackets, each entry separated by newline
 */
const prepareInput = (input: string) => {
  return input.split('\n');
};

export default prepareInput;
