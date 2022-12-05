/**
 *
 * @param input input string
 * @returns initial positions,where first populated cell is at idx of 1, then every 4 spaces and moves formatted as such: [how many, from, where]
 */
function prepareInput(input: string) {
  const [initial, moves] = input.split('\n\n').map((inp) => inp.split('\n'));

  const parsedInitial = initial.map((line) => {
    return line.replaceAll(new RegExp(/\[|\]/g), ' ').split('');
  });

  const parsedMoves = moves.map((move) => {
    return move
      .replaceAll(new RegExp(/move |from |to /g), '')
      .split(' ')
      .map(Number);
  });

  return [parsedInitial.slice(0, parsedInitial.length - 1), parsedMoves] as [
    string[][],
    number[][]
  ];
}

export default prepareInput;
