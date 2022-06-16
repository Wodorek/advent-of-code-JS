import input from './input';

import prepareInput from './helpers/prepareInput';
import flipHorizontal from './helpers/flipHorizontal';
import flipVertical from './helpers/flipVertical';
import rotateClockwise from './helpers/rotateClockwise';

interface IMove {
  r: number;
  f: 'h' | 'v' | null;
}

interface ISides {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const movesMap: { [key: string]: { move: IMove; sides: ISides } } = {
  '1,2,3,4': {
    move: { r: 0, f: null },
    sides: { top: 1, right: 2, bottom: 3, left: 4 },
  },
  '7,0,5,2': {
    move: { r: 1, f: null },
    sides: { top: 7, right: 0, bottom: 5, left: 2 },
  },
  '6,7,4,5': {
    move: { r: 2, f: null },
    sides: { top: 6, right: 7, bottom: 4, left: 5 },
  },
  '1,6,3,4': {
    move: { r: 3, f: null },
    sides: { top: 1, right: 6, bottom: 3, left: 4 },
  },
  '4,3,6,1': {
    move: { r: 0, f: 'v' },
    sides: { top: 4, right: 3, bottom: 6, left: 1 },
  },
  '2,5,0,7': {
    move: { r: 0, f: 'h' },
    sides: { top: 2, right: 5, bottom: 0, left: 7 },
  },
  '3,2,1,0': {
    move: { r: 1, f: 'v' },
    sides: { top: 3, right: 2, bottom: 1, left: 0 },
  },
  '5,4,7,6': {
    move: { r: 1, f: 'h' },
    sides: { top: 5, right: 4, bottom: 7, left: 6 },
  },
};

const possibleSideMap: { [key: string]: number[] } = {
  t: [],
  r: [],
  b: [],
  l: [],
};

Object.keys(movesMap).forEach((key) => {
  const [t, r, b, l] = key.split(',').map(Number);
  possibleSideMap.t.push(t);
  possibleSideMap.r.push(r);
  possibleSideMap.b.push(b);
  possibleSideMap.l.push(l);
});

console.log(possibleSideMap);

const inputArr = prepareInput(input);

class Tile {
  id: string;
  sides: string[] = [];
  possibleNeighbors: Set<string> = new Set<string>();
  right: number | null = null;
  down: number | null = null;

  setPossibleSides(tileLines: string[]) {
    const left: string[] = [];
    const right: string[] = [];
    tileLines.forEach((line) => {
      left.push(line[0]);
      right.push(line[line.length - 1]);
    });

    this.sides = [
      tileLines[0], //0
      right.join(''), //1
      tileLines[tileLines.length - 1], //2
      left.join(''), //3
      tileLines[0].split('').reverse().join(''), //4
      right.reverse().join(''), //5
      tileLines[tileLines.length - 1].split('').reverse().join(''), //6
      left.reverse().join(''), //7
    ];
  }

  constructor(tileLines: string[], id: string) {
    this.setPossibleSides(tileLines);
    this.id = id;
  }
}

class Jigsaw {
  tileset: Tile[];
  size: number = 0;
  grid: string[][] = [];

  constructor(tileset: Tile[]) {
    this.tileset = tileset;
    this.size = Math.sqrt(tileset.length);
    this.grid.length = this.size;

    for (let i = 0; i < this.grid.length; i++) {
      const row: string[] = [];
      row.length = this.size;
      row.fill('');
      this.grid[i] = row;
    }
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

  getCornerTiles() {
    return this.tileset.filter((tile) => {
      return tile.possibleNeighbors.size === 2;
    });
  }

  setFirstCorner() {
    const cornerTiles = this.getCornerTiles();

    const firstCorner = cornerTiles[1];

    const connections = this.getConnectionPoints(firstCorner.id);

    console.log(connections);

    const [right, bottom] = Object.values(connections);

    right.forEach((possibleRight) => {
      bottom.forEach((possibleBottom) => {
        Object.keys(movesMap).forEach((move) => {
          const sides = movesMap[move].sides;

          if (
            sides.right === possibleRight &&
            sides.bottom === possibleBottom
          ) {
            console.log(move);
          }
        });
      });
    });

    console.log(bottom);

    //map rotations, rotate, reassign, done

    this.grid[0][0] = firstCorner.id;
  }

  getConnectionPoints(tileId: string) {
    const foundTile = this.tileset.filter((tile) => tile.id === tileId)[0];

    console.log(foundTile);

    const neighbors = this.tileset.filter((tile) =>
      foundTile.possibleNeighbors.has(tile.id)
    );

    const connections: { [key: string]: number[] } = {};

    neighbors.forEach((neighbor) => {
      neighbor.sides.forEach((side) => {
        const sideIdx = foundTile.sides.indexOf(side);

        if (sideIdx !== -1) {
          console.log(sideIdx);
          if (!connections[neighbor.id]) {
            connections[neighbor.id] = [];
          }
          connections[neighbor.id].push(sideIdx);
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
jigsaw.setFirstCorner();

const tile = inputArr[1951].map((el) => {
  return el.split('');
});

const flipped = flipHorizontal(tile);

flipped.forEach((line) => {
  console.log(line.join(''));
});

console.log(movesMap['2,5,0,7']);

console.log(jigsaw.grid);
