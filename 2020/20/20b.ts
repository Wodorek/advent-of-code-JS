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
  down: number;
  left: number;
}

const movesMap: { [key: string]: { move: IMove; sides: ISides } } = {
  '0,1,2,3': {
    move: { r: 0, f: null },
    sides: { top: 0, right: 1, down: 2, left: 3 },
  },
  '7,0,5,2': {
    move: { r: 1, f: null },
    sides: { top: 7, right: 0, down: 5, left: 2 },
  },
  '6,7,4,5': {
    move: { r: 2, f: null },
    sides: { top: 6, right: 7, down: 4, left: 5 },
  },
  '1,6,3,4': {
    move: { r: 3, f: null },
    sides: { top: 1, right: 6, down: 3, left: 4 },
  },
  '4,3,6,1': {
    move: { r: 0, f: 'v' },
    sides: { top: 4, right: 3, down: 6, left: 1 },
  },
  '2,5,0,7': {
    move: { r: 0, f: 'h' },
    sides: { top: 2, right: 5, down: 0, left: 7 },
  },
  '3,2,1,0': {
    move: { r: 1, f: 'v' },
    sides: { top: 3, right: 2, down: 1, left: 0 },
  },
  '5,4,7,6': {
    move: { r: 1, f: 'h' },
    sides: { top: 5, right: 4, down: 7, left: 6 },
  },
};

// const possibleSideMap: { [key: string]: number[] } = {
//   t: [],
//   r: [],
//   b: [],
//   l: [],
// };

// Object.keys(movesMap).forEach((key) => {
//   const [t, r, b, l] = key.split(',').map(Number);
//   possibleSideMap.t.push(t);
//   possibleSideMap.r.push(r);
//   possibleSideMap.b.push(b);
//   possibleSideMap.l.push(l);
// });

// console.log(possibleSideMap);

const inputArr = prepareInput(input);

class Tile {
  id: string;
  sides: string[] = [];
  possibleNeighbors: Set<string> = new Set<string>();
  top: string | null = null;
  right: string | null = null;
  down: string | null = null;
  left: string | null = null;

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

  setSides({ top, right, down: bottom, left }: ISides) {
    this.top = this.sides[top];
    this.right = this.sides[right];
    this.down = this.sides[bottom];
    this.left = this.sides[left];
  }
}

class Jigsaw {
  tileset: Tile[];
  size: number = 0;
  grid: string[][] = [];
  rotationMap: { [key: string]: IMove } = {};

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

    const [right, bottom] = Object.values(connections);

    let orientation = '';

    right.forEach((possibleRight) => {
      bottom.forEach((possibleBottom) => {
        Object.keys(movesMap).forEach((move) => {
          const sides = movesMap[move].sides;

          if (sides.right === possibleRight && sides.down === possibleBottom) {
            orientation = move;
          }
        });
      });
    });

    //map rotations, rotate, reassign, done

    firstCorner.setSides(movesMap[orientation].sides);

    this.grid[0][0] = firstCorner.id;
    this.rotationMap[firstCorner.id] = movesMap[orientation].move;
  }

  getConnectionPoints(tileId: string) {
    const foundTile = this.tileset.filter((tile) => tile.id === tileId)[0];

    const neighbors = this.tileset.filter((tile) =>
      foundTile.possibleNeighbors.has(tile.id)
    );

    const connections: { [key: string]: number[] } = {};

    neighbors.forEach((neighbor) => {
      neighbor.sides.forEach((side) => {
        const sideIdx = foundTile.sides.indexOf(side);

        if (sideIdx !== -1) {
          if (!connections[neighbor.id]) {
            connections[neighbor.id] = [];
          }
          connections[neighbor.id].push(sideIdx);
        }
      });
    });

    return connections;
  }

  setNextRight(row: number, column: number) {
    const tileToLeft = this.tileset.find((el) => {
      return this.grid[row][column] === el.id;
    })!;

    const possibleRight = Array.from(tileToLeft.possibleNeighbors);

    const compareTo = tileToLeft.right;

    possibleRight.forEach((tile) => {
      const foundTile = this.tileset.find((el) => {
        return el.id === tile;
      })!;

      if (foundTile.sides.includes(compareTo as string)) {
        console.log('found', foundTile.id);

        foundTile.possibleNeighbors.delete(tileToLeft.id);
        this.grid[row][column + 1] = foundTile.id;
        Object.keys(movesMap).forEach((move) => {
          if (
            movesMap[move].sides.left === foundTile.sides.indexOf(compareTo!)
          ) {
            console.log(move);
            console.log('witam');
            const sides = movesMap[move].sides;
            foundTile.top = foundTile.sides[sides.top];
            foundTile.right = foundTile.sides[sides.right];
            foundTile.down = foundTile.sides[sides.down];
            foundTile.left = foundTile.sides[sides.left];

            this.rotationMap[foundTile.id] = movesMap[move].move;
          }
        });
      }
    });
  }

  setNextDown(row: number, column: number) {
    const tileToTop = this.tileset.find((el) => {
      return this.grid[row - 1][column] === el.id;
    })!;

    const possibleDown = Array.from(tileToTop.possibleNeighbors);

    const compareTo = tileToTop.down;

    possibleDown.forEach((tile) => {
      const foundTile = this.tileset.find((el) => {
        return el.id === tile;
      })!;

      if (foundTile.sides.includes(compareTo as string)) {
        console.log('found', foundTile.id);

        foundTile.possibleNeighbors.delete(tileToTop.id);
        this.grid[row][column] = foundTile.id;
        Object.keys(movesMap).forEach((move) => {
          if (
            movesMap[move].sides.top === foundTile.sides.indexOf(compareTo!)
          ) {
            console.log('down', move);
            const sides = movesMap[move].sides;
            foundTile.top = foundTile.sides[sides.top];
            foundTile.right = foundTile.sides[sides.right];
            foundTile.down = foundTile.sides[sides.down];
            foundTile.left = foundTile.sides[sides.left];

            console.log(movesMap[move]);

            this.rotationMap[foundTile.id] = movesMap[move].move;
          }
        });
      }
    });
  }
}

const tiles = [];

for (let key in inputArr) {
  tiles.push(new Tile(inputArr[key], key));
}

const jigsaw = new Jigsaw(tiles);
jigsaw.findPossibleNeighbors();
jigsaw.setFirstCorner();

jigsaw.setNextRight(0, 0);
jigsaw.setNextRight(0, 1);
jigsaw.setNextDown(1, 0);
console.log(jigsaw.grid);
console.log(jigsaw.rotationMap);

// console.log(
//   tiles.find((el) => {
//     return el.id === '3079';
//   })
// );

// flipped.forEach((line) => {
//   console.log(line.join(''));
// });
