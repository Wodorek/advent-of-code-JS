import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const [depth, targetX, targetY] = inputArr;
const xTimes = 16807;
const yTimes = 48271;

const targetId = `${targetX},${targetY}`;

let lookup: { [key: string]: number } = { '0,0': depth, [targetId]: depth };

function calculateErosion(x: number, y: number) {
  const id = `${x},${y}`;

  if (lookup[id]) {
    return lookup[id];
  }

  let geologicIndex = 0;

  if (x === 0) {
    geologicIndex = y * yTimes;
  } else if (y === 0) {
    geologicIndex = x * xTimes;
  } else {
    geologicIndex =
      lookup[id] || calculateErosion(x - 1, y) * calculateErosion(x, y - 1);
  }

  lookup[id] = (geologicIndex + depth) % 20183;

  return (geologicIndex + depth) % 20183;
}

calculateErosion(targetX + 50 - 1, targetY + 50);
calculateErosion(targetX + 50, targetY - 1 + 50);

function findPath() {
  let tool = 1;

  let start = [0, 0, 0, tool];

  let minHeap = [start];
  const steps = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  const timeMap = new Map<string, number>();

  while (minHeap.length > 0) {
    const [min, x, y, tool] = minHeap.shift()!;

    const id = `${x},${y},${tool}`;

    const bestTime = timeMap.get(id) || Infinity;

    if (bestTime <= min) {
      continue;
    }

    if (targetX === x && targetY === y && tool === 1) {
      console.log(`shortest path takes ${min} minutes`);
      return;
    }
    timeMap.set(id, min);

    for (let i = 0; i < 3; i++) {
      if (i !== tool && i !== lookup[`${x},${y}`] % 3) {
        const bt = timeMap.get(`${x},${y},${i}`) || Infinity;
        if (bt > min + 7) {
          minHeap.push([min + 7, x, y, i]);
        }
      }
    }

    for (const [dx, dy] of steps) {
      if (
        x + dx < 0 ||
        x + dx >= targetX + 49 ||
        y + dy < 0 ||
        y + dy >= targetY + 49
      ) {
        continue;
      }

      const terrain = lookup[`${x + dx},${y + dy}`] % 3;

      if (terrain === tool) {
        continue;
      }

      const bt = timeMap.get(`${x + dx},${y + dy},${tool}`) || Infinity;

      if (bt > min + 1) {
        minHeap.push([min + 1, x + dx, y + dy, tool]);
      }

      minHeap.sort((a, b) => {
        let [minA] = a;
        let [minB] = b;
        return minA - minB;
      });
    }
  }
}

findPath();
