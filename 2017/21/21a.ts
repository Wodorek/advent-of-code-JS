import input from './input';

import prepareInput from './helpers/prepareInput';
import getAllCombinations from './helpers/getAllCombinations';
import matrixToString from './helpers/matrixToString';
import stringToMatrix from './helpers/stringToMatrix';

const [lookup, outputs] = prepareInput(input);

const initialMatrix = [
  ['.', '#', '.'],
  ['.', '.', '#'],
  ['#', '#', '#'],
];

const divideIntoTiles = (matrix: string[][], size: number) => {
  let tiles: string[][][] = [];

  const slices: string[][][] = [];

  for (let i = 0; i < matrix.length - 1; i += size) {
    slices.push(matrix.slice(i, i + size));
  }

  slices.forEach((slice) => {
    const newTiles = [];

    for (let i = 0; i < slice[0].length; i += size) {
      const newTile: string[][] = [];

      slice.forEach((el) => {
        const frag = el.slice(i, i + size);
        newTile.push(frag);
      });

      newTiles.push(newTile);
    }

    tiles = [...tiles, ...newTiles];
  });

  return tiles;
};

const getOutputString = (matrix: string[][]) => {
  const possibleCombinations = getAllCombinations(matrix);

  for (let i = 0; i < possibleCombinations.length; i++) {
    const combination = matrixToString(possibleCombinations[i]);

    if (outputs[lookup.indexOf(combination)]) {
      return outputs[lookup.indexOf(combination)];
    }
  }
  return '';
};

const processMatrix = (matrix: string[][]) => {
  const size = matrix.length % 2 === 0 ? 2 : 3;

  const tiles = divideIntoTiles(matrix, size);

  const processed = tiles.map((tile) => {
    return stringToMatrix(getOutputString(tile));
  });

  const tileSize = processed[0][0].length;

  let newMatrix: string[][] = [];

  for (let i = 0; i < processed.length; i += Math.sqrt(processed.length)) {
    const newRows: string[][] = [];

    const slice = processed.slice(i, i + Math.sqrt(processed.length));

    slice.forEach((el) => {
      el.forEach((tilePart, idx) => {
        if (!newRows[idx]) {
          newRows[idx] = [];
        }

        newRows[idx] = [...newRows[idx], ...tilePart];
      });
    });

    newMatrix = [...newMatrix, ...newRows];
  }

  return newMatrix;
};

let matrix = initialMatrix;

for (let i = 0; i < 5; i++) {
  matrix = processMatrix(matrix);
}

let totalLit = 0;

matrix.forEach((line) => {
  line.forEach((char) => {
    if (char === '#') {
      totalLit++;
    }
  });
});

console.log(totalLit);
