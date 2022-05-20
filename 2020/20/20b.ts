import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

class Tile {
  id: string;
  sides: string[];
  possibleNeighbors: Set<string> = new Set<string>();

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

    this.sides = possibleSides;
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
}

const tiles = [];

for (let key in inputArr) {
  tiles.push(new Tile(inputArr[key], key));
}

const jigsaw = new Jigsaw(tiles);
jigsaw.findPossibleNeighbors();

let solution = 1;

jigsaw.tileset.forEach((el) => {
  if (el.possibleNeighbors.size === 2) {
    console.log(el.possibleNeighbors);
    solution *= +el.id;
  }
});

console.log(solution);

//add orientation recognition to each?
//???
