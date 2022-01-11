import input from './input';

import prepareInput from './helpers/prepareInput';
import printArr from './helpers/printArr';
import countLit from './helpers/countLit';

const inputArr = prepareInput(input);

let screen: string[][] = [];
screen.length = 8;
screen.fill([]);

screen = screen.map((el) => {
  el.length = 50;
  return el.fill('.');
});

const modifyScreen = (
  screen: string[][],
  instruction: [string, number, number]
) => {
  let modifiedScreen: string[][] = [];

  if (instruction[0] === 'rect') {
    const cols = instruction[1];
    const rows = instruction[2];

    for (let i = 0; i < rows; i++) {
      const newRow: string[] = [];
      //change to 50
      for (let j = 0; j < 50; j++) {
        if (j < cols) {
          newRow.push('#');
        } else {
          newRow.push(screen[i][j]);
        }
      }

      modifiedScreen.push(newRow);
    }

    for (let i = rows; i < screen.length; i++) {
      modifiedScreen.push(screen[i]);
    }

    return modifiedScreen;
  }

  if (instruction[0] === 'rr') {
    //change to 50
    const rowRotations =
      instruction[2] > 50 ? instruction[2] % 50 : instruction[2];

    for (let i = 0; i < rowRotations; i++) {
      const popped = screen[instruction[1]].pop()!;
      screen[instruction[1]].unshift(popped);
    }
    return screen;
  }

  if (instruction[0] === 'rc') {
    const colRotations =
      instruction[2] > 8 ? instruction[2] % 8 : instruction[2];

    const currCols: string[] = [];

    screen.forEach((row) => {
      currCols.push(row[instruction[1]]);
    });

    for (let i = 0; i < colRotations; i++) {
      const popped = currCols.pop()!;
      currCols.unshift(popped);
    }

    const newArr: string[][] = [];

    screen.forEach((row, idx) => {
      const newRow = row;
      newRow[instruction[1]] = currCols[idx];
      newArr.push([...newRow]);
    });

    return newArr;
  }
  return [[]];
};

inputArr.forEach((instruction) => {
  screen = modifyScreen(screen, instruction);
});

printArr(screen);

console.log(countLit(screen));
