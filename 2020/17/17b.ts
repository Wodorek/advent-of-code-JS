import input from './input';

import prepareInput from './helpers/prepareInput';
import countActiveAround from './helpers/countActiveAround';

const inputArr = prepareInput(input);

function expandCube(cube: string[][][]) {
  const fillLength = cube[0][0].length;

  const fillRow = new Array(fillLength);
  fillRow.fill('.');

  const fillSlice: string[][] = [];
  fillSlice.length = fillLength;

  fillSlice.fill(fillRow);

  const newCube = [fillSlice, ...cube, fillSlice];

  const finalCube = newCube.map((slice) => {
    const newRow = ['.', ...fillRow, '.'];

    return [
      newRow,
      ...slice.map((el) => {
        return ['.', ...el, '.'];
      }),
      newRow,
    ];
  });
  return finalCube;
}

function countActive(cube: string[][][]) {
  let total = 0;

  cube.forEach((slice) => {
    slice.forEach((row) => {
      row.forEach((voxel) => {
        if (voxel === '#') {
          total++;
        }
      });
    });
  });

  return total;
}

function processCube(cube: string[][][]) {
  const expandedCube = expandCube(cube);

  const newCube = expandedCube.map((slice, sliceIdx) => {
    return slice.map((row, rowIdx) => {
      return row.map((voxel, voxelIdx) => {
        const onAround = countActiveAround(
          expandedCube,
          sliceIdx,
          rowIdx,
          voxelIdx
        );

        if (voxel === '#') {
          if (onAround === 2 || onAround === 3) {
            return '#';
          } else {
            return '.';
          }
        } else {
          if (onAround === 3) {
            return '#';
          } else {
            return '.';
          }
        }
      });
    });
  });

  return newCube;
}

let currCube = inputArr;

for (let i = 0; i < 1000; i++) {
  currCube = processCube(currCube);
  const active = countActive(currCube);

  if (active === 848) {
    console.log(i);
    break;
  }
}

console.log(countActive(currCube));
