import input from './input';

const inputArr = input.split('\n').map((el) => el.split(''));

interface CubesMap {
  [key: string]: boolean;
}

const cubesMap: CubesMap = {};

const cubeSize = 4 + 6 * 2;
const minimal = cubeSize * -1;

for (let z = minimal; z <= cubeSize; z++) {
  for (let y = minimal; y <= cubeSize; y++) {
    for (let x = minimal; x <= cubeSize; x++) {
      const id = `${z},${y},${x}`;

      cubesMap[id] = false;
    }
  }
}

//change the -1 here
inputArr.forEach((column, cidx) => {
  column.forEach((row, ridx) => {
    const id = `0,${cidx - 3},${ridx - 3}`;

    if (row === '#') {
      cubesMap[id] = true;
    }
  });
});

function findNeighbors(position: string, cubesMap: CubesMap) {
  const [z, y, x] = position.split(',').map(Number);

  let totalBlack = 0;

  for (let i = z - 1; i <= z + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      for (let k = x - 1; k <= x + 1; k++) {
        const neighborId = `${i},${j},${k}`;

        if (cubesMap[neighborId] === true && neighborId !== position) {
          totalBlack++;
        }
      }
    }
  }

  return totalBlack;
}

function countBlack(cubesMap: CubesMap) {
  let totalBlack = 0;

  Object.keys(cubesMap).forEach((key) => {
    if (cubesMap[key] === true) {
      totalBlack++;
    }
  });

  return totalBlack;
}

function processCubes(cubesMap: CubesMap) {
  const allCubes = Object.keys(cubesMap);

  const newMap: CubesMap = {};

  allCubes.forEach((cube) => {
    const neigborsCount = findNeighbors(cube, cubesMap);

    if (cubesMap[cube] === true) {
      if (neigborsCount === 2 || neigborsCount === 3) {
        newMap[cube] = true;
      } else [(newMap[cube] = false)];
    } else {
      if (neigborsCount === 3) {
        newMap[cube] = true;
      } else {
        newMap[cube] = false;
      }
    }
  });

  return newMap;
}

let currentMap = cubesMap;

for (let i = 0; i < 6; i++) {
  currentMap = processCubes(currentMap);
}

console.log(countBlack(currentMap));
