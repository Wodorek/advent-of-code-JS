import input from './input';

const positions = {
  santa: {
    x: 0,
    y: 0,
  },
  roboSanta: {
    x: 0,
    y: 0,
  },
};

const visitedHouses: { [key: string]: number } = {
  '0,0': 2,
};

for (let i = 0; i < input.length; i++) {
  const house = input[i];
  const currentSanta = i % 2 === 0 ? 'santa' : 'roboSanta';

  if (house === 'v') {
    positions[currentSanta].y--;
  }

  if (house === '^') {
    positions[currentSanta].y++;
  }

  if (house === '>') {
    positions[currentSanta].x++;
  }

  if (house === '<') {
    positions[currentSanta].x--;
  }

  if (!visitedHouses[`${positions.santa.x},${positions.santa.y}`]) {
    visitedHouses[`${positions.santa.x},${positions.santa.y}`] = 1;
  }

  if (!visitedHouses[`${positions.roboSanta.x},${positions.roboSanta.y}`]) {
    visitedHouses[`${positions.roboSanta.x},${positions.roboSanta.y}`] = 1;
  }
}

console.log(Object.keys(visitedHouses).length);
