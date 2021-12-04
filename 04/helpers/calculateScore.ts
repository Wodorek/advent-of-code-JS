const calculateScore = (board: any[][], number: number) => {
  let acc = 0;

  for (let i = 0; i < board.length; i++) {
    const element = board[i];

    for (let j = 0; j < element.length; j++) {
      if (typeof board[i][j] === 'string') {
        acc += +board[i][j];
      }
    }
  }

  return acc * number;
};
export default calculateScore;
