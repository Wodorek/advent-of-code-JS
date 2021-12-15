import input from './input';
import prepareInput from './helpers/prepareInput';
import neighbors from './helpers/neighbors';
import inflateInput from './helpers/inflateInput';

let inputArr = prepareInput(input);

// why be clever when you can be lazy
inputArr = inflateInput(inputArr);

const distances = [];
const visited = [];

for (let i = 0; i < inputArr.length; i++) {
  const distancesRow = [];
  const visitedRow = [];

  for (let j = 0; j < inputArr[0].length; j++) {
    distancesRow.push(Infinity);
    visitedRow.push(1);
  }

  distances.push(distancesRow);
  visited.push(visitedRow);
}

const queue = [[0, 0]];
//do not factor in value of start, since you never enter it
distances[0][0] = 0;
visited[0][0] = 0;

while (queue.length > 0) {
  let minDistance = Infinity;
  let minDistanceIdx = 0;
  for (let i = 0; i < queue.length; ++i) {
    const [row, column] = queue[i];
    if (distances[row][column] < minDistance) {
      minDistance = distances[row][column];
      minDistanceIdx = i;
    }
  }

  const [y, x] = queue[minDistanceIdx];
  queue[minDistanceIdx] = queue[queue.length - 1];
  queue.length--;

  visited[y][x] = 3;

  for (const [yy, xx] of neighbors(inputArr, y, x)) {
    if (visited[yy][xx] === 3) continue;
    distances[yy][xx] = Math.min(
      distances[yy][xx],
      distances[y][x] + inputArr[yy][xx]
    );
    if (visited[yy][xx] === 1) {
      visited[yy][xx] = 2;
      queue.push([yy, xx]);
    }
  }
}

console.log(distances[inputArr.length - 1][inputArr.length - 1]);
