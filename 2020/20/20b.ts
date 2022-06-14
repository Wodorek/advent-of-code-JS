import input from './input';

import prepareInput from './helpers/prepareInput';
import flipHorizontal from './helpers/flipHorizontal';
import flipVertical from './helpers/flipVertical';
import rotateClockwise from './helpers/rotateClockwise';

interface IMove {
  r: number;
  f: 'h' | 'v' | null;
}

const movesMap: { [key: string]: IMove } = {
  '1,2,3,4': { r: 0, f: null },
  '7,0,5,2': { r: 1, f: null },
  '6,7,4,5': { r: 2, f: null },
  '1,6,3,4': { r: 3, f: null },
  '4,3,6,1': { r: 0, f: 'h' },
  '2,5,0,7': { r: 0, f: 'v' },
  '3,2,1,0': { r: 1, f: 'h' },
  '5,4,7,6': { r: 1, f: 'v' },
};

const inputArr = prepareInput(input);

class Tile {
  id: string;
  sides: string[];
  possibleNeighbors: Set<string> = new Set<string>();

  constructor(tileLines: string[], id: string) {
    const left: string[] = [];
    const right: string[] = [];
    tileLines.forEach((line) => {
      left.push(line[0]);
      right.push(line[line.length - 1]);
    });

    this.sides = [
      tileLines[0],
      right.join(''),
      tileLines[tileLines.length - 1],
      left.join(''),
      tileLines[0].split('').reverse().join(''),
      right.reverse().join(''),
      tileLines[tileLines.length - 1].split('').reverse().join(''),
      left.reverse().join(''),
    ];

    this.id = id;
  }
}

class Jigsaw {
  tileset: Tile[];

  constructor(tileset: Tile[]) {
    this.tileset = tileset;
  }

  findPossibleNeighbors() {
    for (let i = 0; i < this.tileset.length; i++) {
      const checking = this.tileset[i];

      for (let j = i + 1; j < this.tileset.length; j++) {
        const possibleNeigbor = this.tileset[j];

        checking.sides.forEach((side) => {
          if (possibleNeigbor.sides.includes(side)) {
            checking.possibleNeighbors.add(possibleNeigbor.id);
            possibleNeigbor.possibleNeighbors.add(checking.id);
          }
        });
      }
    }
  }

  get getCornerTiles() {
    return this.tileset.filter((tile) => {
      return tile.possibleNeighbors.size === 2;
    });
  }

  getConnectionPoints(tileId: string) {
    const foundTile = this.tileset.filter((tile) => tile.id === tileId)[0];

    const neighbors = this.tileset.filter((tile) =>
      foundTile.possibleNeighbors.has(tile.id)
    );

    const connections: { [key: string]: number } = {};

    neighbors.forEach((neighbor) => {
      foundTile.sides.forEach((side, idx) => {
        if (neighbor.sides.includes(side)) {
          connections[neighbor.id] = idx;
        }
      });
    });

    return connections;
  }
}

const tiles = [];

for (let key in inputArr) {
  tiles.push(new Tile(inputArr[key], key));
}

const jigsaw = new Jigsaw(tiles);

jigsaw.findPossibleNeighbors();
const firstCorner = jigsaw.getCornerTiles[0];
console.log(firstCorner.id);
console.log(jigsaw.getConnectionPoints('2971'));

let testTile = inputArr[2971].map((el) => {
  return el.split('');
});

testTile.forEach((line) => {
  console.log(line.join(''));
});

// console.log(firstCorner.sides);

const flipped = flipVertical(rotateClockwise(rotateClockwise(testTile)));

console.log('');

flipped.forEach((line) => {
  console.log(line.join(''));
});

// console.log('c', jigsaw.getConnectionPoints(firstCorner.id));
