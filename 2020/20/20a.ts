import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

const tileset: string[][] = [];

const ids = Object.keys(inputArr);

const chunkSize = 3;

class Tile {
  id: string;
  possibleSides: string[];

  constructor(tileLines: string[], id: string) {
    const possibleSides: string[] = [
      tileLines[0],
      tileLines[tileLines.length - 1],
      tileLines[0].split('').reverse().join(''),
      tileLines[tileLines.length - 1].split('').reverse().join(''),
    ];

    const left: string[] = [];
    const right: string[] = [];
    tileLines.forEach((line) => {
      left.push(line[0]);
      right.push(line[line.length - 1]);
    });

    possibleSides.push(
      left.join(''),
      right.join(''),
      left.reverse().join(''),
      right.reverse().join('')
    );

    this.possibleSides = possibleSides;
    this.id = id;
  }
}

const tiles = [];

for (let key in inputArr) {
  tiles.push(new Tile(inputArr[key], key));
}

console.log(tiles);

class Jigsaw {
  tileset: Tile[];

  constructor(tileset: Tile[]) {
    this.tileset = tileset;
  }
}
