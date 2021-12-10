/**
 * Creates an array of boards for the game
 *
 * @param input a string of numbers each number is separated by space, each row on the board is separated by newline, and each new board is separated by an empty line
 * @returns an array of two dimensional arrays of size x by x
 */
const createBoards = (input: string) => {
  const arrays = input.split('\n').map((el) => {
    if (el === '') {
      return ' ';
    }
    return [
      ...el.split(' ').filter((el) => {
        return el !== '';
      }),
    ];
  });

  const boards: any[] = [];
  let curr = 0;

  for (let i = 0; i < arrays.length; i++) {
    if (!boards[curr]) {
      boards.push([]);
    }

    if (arrays[i] === ' ') {
      curr++;
      continue;
    }

    boards[curr].push(arrays[i]);
  }

  return boards;
};

export default createBoards;
