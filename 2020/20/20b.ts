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

function processManipulation(
  tile: string[][],
  rotations: number,
  flip: 'h' | 'v' | null
) {
  let manipulatedTile = tile;

  for (let i = 0; i < rotations; i++) {
    manipulatedTile = rotateClockwise(manipulatedTile);
  }
  if (flip === 'h') {
    manipulatedTile = flipHorizontal(manipulatedTile);
  } else if (flip === 'v') {
    manipulatedTile = flipVertical(manipulatedTile);
  }
  return manipulatedTile;
}

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

    const firstCorner = cornerTiles[0];

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
        foundTile.possibleNeighbors.delete(tileToLeft.id);
        this.grid[row][column + 1] = foundTile.id;
        Object.keys(movesMap).forEach((move) => {
          if (
            movesMap[move].sides.left === foundTile.sides.indexOf(compareTo!)
          ) {
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
      return this.grid[row][column] === el.id;
    })!;

    const possibleDown = Array.from(tileToTop.possibleNeighbors);

    const compareTo = tileToTop.down;

    possibleDown.forEach((tile) => {
      const foundTile = this.tileset.find((el) => {
        return el.id === tile;
      })!;

      if (foundTile.sides.includes(compareTo as string)) {
        foundTile.possibleNeighbors.delete(tileToTop.id);
        this.grid[row + 1][column] = foundTile.id;
        Object.keys(movesMap).forEach((move) => {
          if (
            movesMap[move].sides.top === foundTile.sides.indexOf(compareTo!)
          ) {
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

  solveJigsaw() {
    this.setFirstCorner();
    for (let i = 0; i < this.size - 1; i++) {
      this.setNextRight(0, i);
    }

    for (let i = 0; i < this.size - 1; i++) {
      this.setNextDown(i, 0);

      for (let j = 0; j < this.size - 1; j++) {
        this.setNextRight(i + 1, j);
      }
    }

    const solved = this.grid.map((row) => {
      return row.map((id) => {
        const asTile = inputArr[id].map((line) => {
          return line.split('');
        });
        const rotations = this.rotationMap[id].r;
        let flip = this.rotationMap[id].f;
        const manipulatedTile = processManipulation(asTile, rotations, flip);

        return manipulatedTile;
      });
    });

    return solved;
  }
}

const tiles = [];

for (let key in inputArr) {
  tiles.push(new Tile(inputArr[key], key));
}

const jigsaw = new Jigsaw(tiles);
jigsaw.findPossibleNeighbors();
const solved = jigsaw.solveJigsaw();

function removeBorders(tiles: string[][][][]) {
  const bordersRemoved = tiles.map((row) => {
    row.map((tile) => {
      tile.splice(0, 1);
      tile.splice(tile.length - 1, 1);
      tile.forEach((tileLine) => {
        tileLine.pop();
        tileLine.shift();
      });

      return tile;
    });
    return row;
  });

  return bordersRemoved;
}

function mergeBorders(tiles: string[][][][], puzzleSize: number) {
  const finalImage: string[][] = [];

  for (let i = 0; i < puzzleSize * 8 * 2; i++) {
    finalImage.push([]);
  }

  tiles.forEach((tileRow, rowIdx) => {
    tileRow.forEach((tileCol) => {
      tileCol.forEach((tileLine, lineIdx) => {
        finalImage[rowIdx * 8 + lineIdx].push(...tileLine);
      });
    });
  });

  return finalImage.filter((line) => {
    return line.length > 0;
  });
}

const withRemoved = removeBorders(solved);

const mergedImage = mergeBorders(withRemoved, jigsaw.size);

const monster = `                  #
#    ##    ##    ###
 #  #  #  #  #  #   `;

const mosterPartsCoords: [number, number][] = [];

monster.split('\n').forEach((line, lineIdx) => {
  line.split('').forEach((char, charIdx) => {
    if (char === '#') {
      mosterPartsCoords.push([lineIdx, charIdx]);
    }
  });
});

function takeLines(
  arr: string[][],
  rowStart: number,
  colStart: number,
  len: number,
  linesNum: number
) {
  const lines = [];

  for (let i = 0; i < linesNum; i++) {
    lines.push(arr[rowStart + i].slice(colStart, colStart + len));
  }

  return lines;
}

function findMosters(arr: string[][]) {
  const len = arr.length;

  let totalMonsters = 0;

  for (let i = 0; i < len - 2; i++) {
    for (let j = 0; j < len; j++) {
      const lines = takeLines(arr, i, j, len, 3);

      const isMonster = mosterPartsCoords.every(([row, column]) => {
        return lines[row][column] === '#';
      });

      if (isMonster) {
        totalMonsters++;
      }
    }
  }

  return totalMonsters;
}

let monstersFound = 0;

for (let key in movesMap) {
  const { r, f } = movesMap[key].move;

  let solvedCopy = mergedImage.map((img) => img.map((line) => line));

  solvedCopy = processManipulation(solvedCopy, r, f);

  const totalMonsters = findMosters(solvedCopy);

  if (totalMonsters > 0) {
    monstersFound = totalMonsters;
    break;
  }
}

let solution = 0;

solution -= monstersFound * 15;

mergedImage.forEach((line) => {
  line.forEach((char) => {
    if (char === '#') {
      solution++;
    }
  });
});

console.log(solution);
