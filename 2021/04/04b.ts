import checkForWin from './helpers/checkForWin';
import createBoards from './helpers/crateBoards';
import markNumber from './helpers/markNumber';
import calculateScore from './helpers/calculateScore';
import input from './input';

const draws = [
  23, 91, 18, 32, 73, 14, 20, 4, 10, 55, 40, 29, 13, 25, 48, 65, 2, 80, 22, 16,
  93, 85, 66, 21, 9, 36, 47, 72, 88, 58, 5, 42, 53, 69, 52, 8, 54, 63, 76, 12,
  6, 99, 35, 95, 82, 49, 41, 17, 62, 34, 51, 77, 94, 7, 28, 71, 92, 74, 46, 79,
  26, 19, 97, 86, 87, 37, 57, 64, 1, 30, 11, 96, 70, 44, 83, 0, 56, 90, 59, 78,
  61, 98, 89, 43, 3, 84, 67, 38, 68, 27, 81, 39, 15, 50, 60, 24, 45, 75, 33, 31,
];

const boards = createBoards(input);

let possibleWins: any[][] = [];

const findWinning = () => {
  for (let i = 0; i < draws.length; i++) {
    const draw = draws[i];

    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];

      markNumber(board, draw);
      if (checkForWin(board)) {
        possibleWins.push([board, draw]);
        boards[j] = [[], []];
      }
    }
  }
  possibleWins = possibleWins.filter((el) => {
    return el[0][0].length > 0;
  });
};

findWinning();

console.log(possibleWins);

console.log(
  calculateScore(
    possibleWins[possibleWins.length - 1][0],
    possibleWins[possibleWins.length - 1][1]
  )
);
