/**
 *
 * @param str an input string in a format of "x1,y1 -> x2,y2", each value separated by newline
 * @returns an array of arrays containing values: [[x1, y1],[x2,y2]]
 */
const prepareInput = (str: string) => {
  return str.split('\n').map((el) => {
    const split = el.split(' -> ');
    return [split[0].split(','), split[1].split(',')];
  });
};

export default prepareInput;
