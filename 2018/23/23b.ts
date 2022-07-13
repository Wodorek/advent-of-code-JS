import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface IRange {
  x: {
    min: number;
    max: number;
  };
  y: {
    min: number;
    max: number;
  };
  z: {
    min: number;
    max: number;
  };
}

function findBoundaries(bots: number[][]): IRange {
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;

  bots.forEach((bot) => {
    maxX = Math.max(bot[0], maxX);
    maxY = Math.max(bot[1], maxY);
    maxZ = Math.max(bot[2], maxZ);
    minX = Math.min(bot[0], minX);
    minY = Math.min(bot[1], minY);
    minZ = Math.min(bot[2], minZ);
  });

  return {
    x: {
      min: minX,
      max: maxX,
    },
    y: {
      min: minY,
      max: maxY,
    },
    z: {
      min: minZ,
      max: maxZ,
    },
  };
}

function countScanners(range: IRange, scanners: number[][]) {
  let totalInRange = 0;

  for (let i = 0; i < scanners.length; i++) {
    const scanner = scanners[i];
    const [x, y, z] = scanner;
    let leftoverStrength = scanner[3];

    if (x > range.x.max) {
      leftoverStrength -= Math.abs(Math.abs(x) - Math.abs(range.x.max));
    }

    if (range.x.min > x) {
      leftoverStrength -= Math.abs(Math.abs(x) - Math.abs(range.x.min));
    }

    if (y > range.y.max) {
      leftoverStrength -= Math.abs(Math.abs(y) - Math.abs(range.y.max));
    }

    if (range.y.min > y) {
      leftoverStrength -= Math.abs(Math.abs(y) - Math.abs(range.y.min));
    }

    if (z > range.z.max) {
      leftoverStrength -= Math.abs(Math.abs(z) - Math.abs(range.z.max));
    }

    if (range.z.min > z) {
      leftoverStrength -= Math.abs(Math.abs(z) - Math.abs(range.z.min));
    }

    if (leftoverStrength >= 0) {
      totalInRange++;
    }
  }

  return totalInRange;
}

function calculateManhattan(pos: [number, number, number]) {
  const [x, y, z] = pos;

  return Math.abs(x) + Math.abs(y) + Math.abs(z);
}

function divideRanges(initialRange: IRange): IRange[] {
  const midX = Math.floor((initialRange.x.min + initialRange.x.max) / 2);

  const midY = Math.floor((initialRange.y.min + initialRange.y.max) / 2);

  const midZ = Math.floor((initialRange.z.min + initialRange.z.max) / 2);

  const xRanges = [
    [initialRange.x.min, midX],
    [midX + 1, initialRange.x.max],
  ];

  const yRanges = [
    [initialRange.y.min, midY],
    [midY + 1, initialRange.y.max],
  ];

  const zRanges = [
    [initialRange.z.min, midZ],
    [midZ + 1, initialRange.z.max],
  ];

  const ranges: IRange[] = [];

  xRanges.forEach((xRange) => {
    yRanges.forEach((yRange) => {
      zRanges.forEach((zRange) => {
        ranges.push({
          x: {
            min: xRange[0],
            max: xRange[1],
          },
          y: {
            min: yRange[0],
            max: yRange[1],
          },
          z: {
            min: zRange[0],
            max: zRange[1],
          },
        });
      });
    });
  });

  return ranges.filter((el) => {
    return el.x.max >= el.x.min && el.y.max >= el.y.min && el.z.max >= el.z.min;
  });
}

const bestRange = 978;

function selectBestRanges(ranges: IRange[], scanners: number[][]) {
  let bestRanges: IRange[] = [];

  let max = -1;

  ranges.forEach((range) => {
    const foundScanners = countScanners(range, scanners);

    if (foundScanners > max) {
      max = foundScanners;
    }

    if (foundScanners >= bestRange) {
      bestRanges.push(range);
    }
  });

  return bestRanges;
}

function findTheSpot(scanners: number[][]) {
  let ranges = [findBoundaries(scanners)];

  const outputs = [];

  while (ranges.length > 0) {
    const currentRange = ranges.pop()!;

    if (
      currentRange.x.min === currentRange.x.max &&
      currentRange.y.min === currentRange.y.max &&
      currentRange.z.min === currentRange.z.max
    ) {
      outputs.push(currentRange);
    } else {
      const divided = divideRanges(currentRange);

      const best = selectBestRanges(divided, scanners);

      ranges.unshift(...best);
    }
  }

  return outputs;
}

const foundPoints = findTheSpot(inputArr);

console.log(
  Math.min(
    ...foundPoints.map((point) =>
      calculateManhattan([point.x.min, point.y.min, point.z.min])
    )
  )
);
