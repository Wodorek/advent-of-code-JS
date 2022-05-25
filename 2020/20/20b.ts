import input from './input';

import prepareInput from './helpers/prepareInput';
import flipHorizontal from './helpers/flipHorizontal';
import flipVertical from './helpers/flipVertical';

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

const testTile = inputArr[firstCorner.id].map((el) => {
  return el.split('');
});

console.log(firstCorner.sides);

const flipped = flipHorizontal(testTile);

testTile.forEach((line) => {
  console.log(line.join(''));
});

console.log('');

flipped.forEach((line) => {
  console.log(line.join(''));
});

console.log(jigsaw.getConnectionPoints(firstCorner.id));
