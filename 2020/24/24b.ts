import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface Position {
  e: number;
  ne: number;
}

function parseIntoMoves(line: string) {
  const regexes = {
    se: new RegExp('se', 'g'),
    ne: new RegExp('ne', 'g'),
    sw: new RegExp('sw', 'g'),
    nw: new RegExp('nw', 'g'),
    e: new RegExp('e', 'g'),
    w: new RegExp('w', 'g'),
  };

  const regexKeys = Object.keys(regexes);

  const moves: { [key: string]: number } = {};

  regexKeys.forEach((key) => {
    const matches = line.match(regexes[key as keyof typeof regexes]);

    moves[key] = matches?.length ? matches.length : 0;
  });

  moves['e'] = moves['e'] - moves['se'] - moves['ne'];
  moves['w'] = moves['w'] - moves['sw'] - moves['nw'];

  return moves;
}

// true === black
const tilePositions: { [key: string]: boolean } = {};

inputArr.forEach((line) => {
  const moves = parseIntoMoves(line);

  const currPosition: Position = {
    e: 0,
    ne: 0,
  };

  // here change to nw/se axis
  Object.keys(moves).forEach((key) => {
    if (key === 'ne') {
      currPosition['ne'] += moves[key];
    } else if (key === 'e') {
      currPosition['e'] += moves[key];
    } else if (key === 'se') {
      currPosition['ne'] -= moves[key];
      currPosition['e'] += moves[key];
    } else if (key === 'sw') {
      currPosition['ne'] -= moves[key];
    } else if (key === 'w') {
      currPosition['e'] -= moves[key];
    } else if (key === 'nw') {
      currPosition['ne'] += moves[key];
      currPosition['e'] -= moves[key];
    }
  });

  const tileId = `${currPosition['e']},${currPosition['ne']}`;

  if (tilePositions[tileId]) {
    tilePositions[tileId] = !tilePositions[tileId];
  } else {
    tilePositions[tileId] = true;
  }
});

const tileKeys = Object.keys(tilePositions);

const blackTiles = tileKeys.filter((el) => {
  return tilePositions[el as keyof typeof tilePositions] === true;
});

// you need to change the axis

console.log(blackTiles.length);

class Tile {
  position: Position;
  neighbors: {
    '0,-1': boolean;
    '-1,0': boolean;
    '-1,1': boolean;
    '0,1': boolean;
    '1,0': boolean;
    '1,-1': boolean;
  } = {
    '0,-1': false,
    '-1,0': false,
    '-1,1': false,
    '0,1': false,
    '1,0': false,
    '1,-1': false,
  };

  isBlack: boolean = false;

  constructor(pos: string) {
    const positions = pos.split(',').map(Number);

    this.position = { e: positions[0], ne: positions[1] };
  }

  findNeighbors(otherTiles: string[]) {
    const sides = Object.keys(this.neighbors).map((el) => {
      return el.split(',').map(Number);
    });

    sides.forEach((side) => {
      const [sx, sy] = side;

      otherTiles.forEach((tile) => {
        const [x, y] = tile.split(',').map(Number);

        if (this.position.e + sx === x && this.position.ne + sy === y) {
          this.neighbors[side.join(',') as keyof typeof this.neighbors] = true;
        }
      });
    });
  }

  discardNeighbors() {
    this.neighbors = {
      '0,-1': false,
      '-1,0': false,
      '-1,1': false,
      '0,1': false,
      '1,0': false,
      '1,-1': false,
    };
  }

  flipTile() {
    const blackAround = Object.values(this.neighbors).filter((el) => {
      return el === true;
    }).length;

    if (this.isBlack) {
      if (blackAround === 0 || blackAround > 2) {
        this.isBlack = !this.isBlack;
      }
    } else {
      if (blackAround === 2) {
        this.isBlack = !this.isBlack;
      }
    }
  }
}

function surroundWithWhite(blackTiles: Tile[], positionSet: Set<string>) {
  const sides = ['0,-1', '-1,0', '-1,1', '0,1', '1,0', '1,-1'];

  const expandedTiles = [...blackTiles];

  blackTiles.forEach((tile) => {
    const [btx, bty] = [tile.position.e, tile.position.ne];

    sides.forEach((side) => {
      const [x, y] = side.split(',').map(Number);

      const neighboringTilePos = `${btx + x},${bty + y}`;

      if (!positionSet.has(neighboringTilePos)) {
        const neigborTile = new Tile(neighboringTilePos);
        expandedTiles.push(neigborTile);
        positionSet.add(neighboringTilePos);
      }
    });
  });

  return expandedTiles;
}

function flipTiles(blackTilesCoords: string[]) {
  const coordsSet = new Set<string>();

  const tiles: Tile[] = [];

  blackTilesCoords.forEach((coords) => {
    const tile = new Tile(coords);

    coordsSet.add(coords);

    tile.isBlack = true;

    tiles.push(tile);
  });

  const fullGrid = surroundWithWhite(tiles, coordsSet);

  const newBlackTiles: string[] = [];

  fullGrid.forEach((tile) => {
    tile.findNeighbors(blackTiles);
    // tile.flipTile();
  });

  console.log(fullGrid);

  fullGrid.forEach((tile) => {
    if (tile.isBlack) {
      newBlackTiles.push(`${tile.position.e},${tile.position.ne}`);
    }
  });

  console.log('nt', newBlackTiles.length);

  return newBlackTiles;
}

let currentlyBlack = [
  '-1,-2',
  '0,-3',
  '-2,0',
  '-1,1',
  '-1,-1',
  '0,0',
  '-2,1',
  '-1,-3',
  '-3,1',
  '-2,2',
  '0,1',
  '0,-1',
  '1,-1',
  '2,-1',
  '1,0',
];
currentlyBlack = flipTiles(currentlyBlack);
console.log(currentlyBlack);

for (let i = 0; i > 2; i++) {}
