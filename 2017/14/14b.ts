import checkNeighbors from './helpers/checkNeighbors';
import knotHash from './helpers/knotHash';

const toBinary = (str: string) => {
  let output = '';

  str.split('').forEach((el) => {
    output = output.concat(parseInt(el, 16).toString(2).padStart(4, '0'));
  });

  return output;
};

const disk: string[][] = [];

for (let i = 0; i < 128; i++) {
  const hashed = knotHash(`amgozmfv-${i}`);

  const binary = toBinary(hashed);

  const row: string[] = [];

  binary.split('').forEach((el) => {
    if (el === '1') {
      row.push('#');
    } else {
      row.push('.');
    }
  });

  disk.push(row);
}

const countRegion = (row: number, column: number) => {
  const queue = [[row, column]];

  disk[row][column] = '.';

  let size = 0;

  while (queue.length > 0) {
    const location = queue.pop()!;
    size++;

    const neighbors = checkNeighbors(disk, location[0], location[1]);

    neighbors.forEach((neighbor) => {
      disk[neighbor[0]][neighbor[1]] = '.';
      queue.push(neighbor);
    });
  }
  return size;
};

let totalRegions = 0;

for (let i = 0; i < disk.length; i++) {
  for (let j = 0; j < disk[i].length; j++) {
    if (disk[i][j] === '#') {
      countRegion(i, j);
      totalRegions++;
    }
  }
}

console.log(totalRegions);
