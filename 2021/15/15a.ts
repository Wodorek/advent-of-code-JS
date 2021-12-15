import input from './input';
import prepareInput from './helpers/prepareInput';
import neighbors from './helpers/neighbors';

const inputArr = prepareInput(input);

const shortestPath = (
  length: number,
  map: (y: number, x: number) => number
): number => {
  const dist = [];
  const done = [];
  for (let y = 0; y < length; ++y) {
    const done_row = [];
    const dist_row = [];
    for (let x = 0; x < length; ++x) {
      done_row[x] = 1;
      dist_row[x] = Infinity;
    }
    done.push(done_row);
    dist.push(dist_row);
  }
  dist[0][0] = 0;
  done[0][0] = 2;
  const queue = [[0, 0]];
  while (queue.length > 0) {
    let min_dist = Infinity;
    let min_dist_idx = 0;
    for (let i = 0; i < queue.length; ++i) {
      const [yy, xx] = queue[i];
      if (dist[yy][xx] < min_dist) {
        min_dist = dist[yy][xx];
        min_dist_idx = i;
      }
    }
    const [y, x] = queue[min_dist_idx];
    queue[min_dist_idx] = queue[queue.length - 1];
    queue.length--;
    done[y][x] = 3;
    for (const [yy, xx] of neighbors(inputArr, y, x)) {
      if (done[yy][xx] == 3) continue;
      dist[yy][xx] = Math.min(dist[yy][xx], dist[y][x] + map(yy, xx));
      if (done[yy][xx] == 1) {
        done[yy][xx] = 2;
        queue.push([yy, xx]);
      }
    }
  }
  return dist[length - 1][length - 1];
};

console.log(shortestPath(inputArr.length, (x, y) => inputArr[x][y]));
