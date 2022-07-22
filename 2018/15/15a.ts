import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface ITopography {
  [key: string]: string;
}

inputArr.forEach((el) => {
  console.log(el.join(''));
});

class Monster {
  position: [number, number];
  hp: number = 200;
  attack: number = 3;
  type: 'Elf' | 'Goblin';
  enemy: 'Elf' | 'Goblin';

  constructor(x: number, y: number, type: 'G' | 'E') {
    this.position = [x, y];
    this.type = type === 'G' ? 'Goblin' : 'Elf';
    this.enemy = type === 'G' ? 'Elf' : 'Goblin';
  }

  findNextStep(topography: ITopography, enemies: Monster[]) {}
}

class Battlefield {
  goblins: Monster[] = [];
  elves: Monster[] = [];
  isBattleInProgress: boolean = false;
  topography: ITopography = {};

  constructor(map: string[][]) {
    map.forEach((row, y) => {
      row.forEach((char, x) => {
        if (char === 'E' || char === 'G') {
          const monster = new Monster(x, y, char);
          if (monster.type === 'Elf') {
            this.elves.push(monster);
          } else {
            this.goblins.push(monster);
          }
        }

        this.topography[`${x},${y}`] = char;
      });
    });
  }
}

const battlefield = new Battlefield(inputArr);

console.log(battlefield.goblins);
