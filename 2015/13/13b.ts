import input from './input';

import prepareInput from './helpers/prepareInput';
import permute from './helpers/permute';

const inputArr = prepareInput(input);

const allPeople: string[] = [];

const seatingChanges: { [key: string]: number } = {};

inputArr.forEach((seating) => {
  if (!allPeople.includes(seating[0])) {
    allPeople.push(seating[0]);
  }

  if (!allPeople.includes(seating[1])) {
    allPeople.push(seating[1]);
  }

  const seatValue = `${seating[0]},${seating[1]}`;

  seatingChanges[seatValue] = seating[2] * seating[3];
});

const possibleSeating = permute(allPeople);

const calcualteTableValue = (positions: string[]) => {
  let totalValue = 0;

  for (let i = 0; i < positions.length; i++) {
    const left = positions[i];
    const right = positions[i + 1] || positions[0];

    totalValue += seatingChanges[`${left},${right}`];
    totalValue += seatingChanges[`${right},${left}`];
  }

  return totalValue;
};

let highestTable = 0;
let bestTable: string[] = [];

possibleSeating.forEach((table) => {
  const tableValue = calcualteTableValue(table);
  if (tableValue > highestTable) {
    highestTable = tableValue;
    bestTable = table;
  }
});

console.log(bestTable);

//ACTUAl part 2 code

bestTable.forEach((person) => {
  seatingChanges[`${person},Me`] = 0;
  seatingChanges[`Me,${person}`] = 0;
});

const tablesWithMe: string[][] = [];

for (let i = 0; i < bestTable.length; i++) {
  let newTable = [...bestTable];
  newTable.splice(i, 0, 'Me');

  tablesWithMe.push(newTable);
}

let newHighest = 0;

tablesWithMe.forEach((table) => {
  const tableValue = calcualteTableValue(table);
  if (tableValue > newHighest) {
    newHighest = tableValue;
    bestTable = table;
  }
});

console.log(newHighest);
