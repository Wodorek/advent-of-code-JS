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
