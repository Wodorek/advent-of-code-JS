import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface CubeCoords {
  q: number;
  r: number;
  s: number;
}

const movementMap = {
  ne: [1, -1, 0],
  e: [1, 0, -1],
  se: [0, 1, -1],
  sw: [-1, 1, 0],
  w: [-1, 0, 1],
  nw: [0, -1, 1],
};

function parsePath(pathString: string) {
  let parsed = pathString;
  parsed = parsed
    .replaceAll('ne', 'ne,')
    .replaceAll('se', 'se,')
    .replaceAll('sw', 'sw,')
    .replaceAll('nw', 'nw,')
    .replaceAll('e', 'e,')
    .replaceAll('w', 'w,')
    .replaceAll(',,', ',');

  //who needs regex anyway

  return parsed.split(',');
}

function move(position: CubeCoords, move: string[]) {
  move.forEach((step) => {
    const [s, q, r] = movementMap[step as keyof typeof movementMap];

    position.s += s;
    position.q += q;
    position.r += r;
  });

  return position;
}

function getInitialTiles(pathStrings: string[]) {
  const paths = pathStrings.map((pathString) => {
    return parsePath(pathString).filter((el) => el !== '');
  });

  const hexes: { [key: string]: boolean } = {};

  paths.forEach((path) => {
    const position: CubeCoords = {
      q: 0,
      r: 0,
      s: 0,
    };

    const newPosition = move(position, path);

    const cubeId = `${newPosition.q},${newPosition.r},${newPosition.s}`;

    if (hexes[cubeId]) {
      hexes[cubeId] = !hexes[cubeId];
    } else {
      hexes[cubeId] = true;
    }
  });

  const blackTilesCoords = Object.keys(hexes).filter(
    (hex) => hexes[hex] === true
  );

  return blackTilesCoords;
}

class Tile {
  position: CubeCoords;
  // 'q,r,s'
  neighbors: {
    '0,-1,1': boolean;
    '1,-1,0': boolean;
    '1,0,-1': boolean;
    '0,1,-1': boolean;
    '-1,1,0': boolean;
    '-1,0,1': boolean;
  } = {
    '0,-1,1': false,
    '1,-1,0': false,
    '1,0,-1': false,
    '0,1,-1': false,
    '-1,1,0': false,
    '-1,0,1': false,
  };

  isBlack: boolean = false;

  constructor(pos: string) {
    const positions = pos.split(',').map(Number);

    this.position = { q: positions[0], r: positions[1], s: positions[2] };
  }

  findNeighbors(otherTiles: string[]) {
    const sides = Object.keys(this.neighbors).map((el) => {
      return el.split(',').map(Number);
    });

    sides.forEach((side) => {
      const [dq, dr, ds] = side;

      otherTiles.forEach((tile) => {
        const [q, r, s] = tile.split(',').map(Number);

        if (
          this.position.q + dq === q &&
          this.position.r + dr === r &&
          this.position.s + ds === s
        ) {
          this.neighbors[side.join(',') as keyof typeof this.neighbors] = true;
        }
      });
    });
  }

  discardNeighbors() {
    this.neighbors = {
      '0,-1,1': false,
      '1,-1,0': false,
      '1,0,-1': false,
      '0,1,-1': false,
      '-1,1,0': false,
      '-1,0,1': false,
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

const blackTilesCoords = getInitialTiles(inputArr);

const tiles: Tile[] = [];

blackTilesCoords.forEach((tile) => {
  const blackTile = new Tile(tile);
  blackTile.isBlack = true;
  tiles.push(blackTile);
});

tiles.forEach((tile) => {
  tile.findNeighbors(blackTilesCoords);
});

function surroundWithWhite(blackTiles: Tile[], positionSet: Set<string>) {
  const sides = ['0,-1,1', '1,-1,0', '1,0,-1', '0,1,-1', '-1,1,0', '-1,0,1'];

  const expandedTiles = [...blackTiles];

  blackTiles.forEach((tile) => {
    const [btq, btr, bts] = [tile.position.q, tile.position.r, tile.position.s];

    sides.forEach((side) => {
      const [q, r, s] = side.split(',').map(Number);

      const neighboringTilePos = `${btq + q},${btr + r},${bts + s}`;

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
    tile.findNeighbors(blackTilesCoords);
    tile.flipTile();
  });

  fullGrid.forEach((tile) => {
    if (tile.isBlack) {
      newBlackTiles.push(
        `${tile.position.q},${tile.position.r},${tile.position.s}`
      );
    }
  });

  return newBlackTiles;
}

let blackTiles = blackTilesCoords;

for (let i = 0; i < 100; i++) {
  blackTiles = flipTiles(blackTiles);
}

console.log(blackTiles.length);
