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

const tablePoints: number[] = [];

possibleSeating.forEach((table) => {
  const tableValue = calcualteTableValue(table);
  tablePoints.push(tableValue);
});

console.log(Math.max(...tablePoints));
