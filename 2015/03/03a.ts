import input from './input';

let posX = 0;
let posY = 0;

const visitedHouses: { [key: string]: number } = {
  '0,0': 1,
};

for (let i = 0; i < input.length; i++) {
  const house = input[i];

  if (house === 'v') {
    posY--;
  }

  if (house === '^') {
    posY++;
  }

  if (house === '>') {
    posX++;
  }

  if (house === '<') {
    posX--;
  }

  if (visitedHouses[`${posX},${posY}`]) {
    visitedHouses[`${posX},${posY}`]++;
  } else {
    visitedHouses[`${posX},${posY}`] = 1;
  }
}

console.log(Object.keys(visitedHouses).length);
