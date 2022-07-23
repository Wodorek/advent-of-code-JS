import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

interface ITopography {
  [key: string]: string;
}

//full disclosure, this is the last puzzle that I am doing, and by the looks of it, there will be like 100 lines of useless, repetitive code, but this puzzle is no fun, so maybe I'll get back to it in like 2027 to refactor it, no sooner.

class Monster {
  position: { x: number; y: number };
  hp: number = 200;
  attack: number = 3;
  type: 'Elf' | 'Goblin';
  enemy: 'Elf' | 'Goblin';
  isDead: boolean = false;

  constructor(x: number, y: number, type: 'G' | 'E') {
    this.position = { x, y };
    this.type = type === 'G' ? 'Goblin' : 'Elf';
    this.enemy = type === 'G' ? 'Elf' : 'Goblin';
  }

  move(topography: ITopography, enemies: Monster[]) {
    const newPosition = this.findNextStep(topography, enemies);

    if (newPosition) {
      topography[`${this.position.x},${this.position.y}`] = '.';
      topography[`${newPosition.x},${newPosition.y}`] = this.type;
      this.position = newPosition;
    }
  }

  spacesAround(x: number = this.position.x, y: number = this.position.y) {
    const steps = [
      [0, -1],
      [-1, 0],
      [1, 0],
      [0, 1],
    ];

    const adjacents = steps.map((step) => {
      return {
        x: x + step[0],
        y: y + step[1],
      };
    });

    return adjacents;
  }

  // possibly the worst piece of code I have ever produced.
  findNextStep(
    topography: ITopography,
    enemies: Monster[]
  ): { x: number; y: number } | null {
    const visited: string[] = [`${this.position.x}, ${this.position.y}`];

    const enemyPositions = enemies.map((enemy) => {
      return `${enemy.position.x},${enemy.position.y}`;
    });

    let pathsTaken = [[{ x: this.position.x, y: this.position.y }]];

    //hate do do it
    while (true) {
      let newPaths: any[] = [];
      let targetPaths: any[] = [];

      pathsTaken.forEach((path) => {
        const adjacents = this.spacesAround(
          path[path.length - 1].x,
          path[path.length - 1].y
        );

        adjacents.forEach((adjacent) => {
          const id = `${adjacent.x},${adjacent.y}`;

          if (enemyPositions.includes(id)) {
            const enemyPosition = enemyPositions[enemyPositions.indexOf(id)]
              .split(',')
              .map(Number);

            targetPaths.push([
              ...path,
              adjacent,
              {
                x: enemyPosition[0],
                y: enemyPosition[1],
              },
            ]);
          } else if (!visited.includes(id) && topography[id] === '.') {
            newPaths.push([...path, adjacent]);
          }
          visited.push(id);
        });
      });
      if (targetPaths.length > 0) {
        targetPaths = targetPaths.sort((a, b) =>
          a[a.length - 1].y === b[b.length - 1].y
            ? a[a.length - 1].x - b[b.length - 1].x
            : a[a.length - 1].y - b[b.length - 1].y
        );

        return targetPaths[0][1];
      }

      pathsTaken = newPaths;

      if (pathsTaken.length < 1) return null;
    }
  }

  takeDamage(topography: ITopography, dmg: number = 3) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.isDead = true;
      topography[`${this.position.x},${this.position.y}`] = '.';
    }
  }
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
            char = 'Elf';
            this.elves.push(monster);
          } else {
            char = 'Goblin';
            this.goblins.push(monster);
          }
        }

        this.topography[`${x},${y}`] = char;
      });
    });
  }

  playTurn() {
    const monsterQueue = [...this.goblins, ...this.elves].sort((a, b) => {
      return a.position.y === b.position.y
        ? a.position.x - b.position.x
        : a.position.y - b.position.y;
    });

    while (monsterQueue.length > 0) {
      const activeMonster = monsterQueue.shift()!;

      if (activeMonster.isDead) {
        return;
      }

      const enemies = activeMonster.type === 'Elf' ? this.goblins : this.elves;

      const spacesAround = activeMonster.spacesAround();

      //don't move if next to enemy
      let shouldMove = true;
      spacesAround.forEach((space) => {
        if (this.topography[`${space.x},${space.y}`] === activeMonster.enemy)
          shouldMove = false;
      });

      if (shouldMove) {
        activeMonster.move(this.topography, enemies);
      }

      const aroundAfterMove = activeMonster.spacesAround();

      let enemiesInRange: Monster[] = [];

      for (let i = 0; i < aroundAfterMove.length; i++) {
        const space = aroundAfterMove[i];

        // I don't know why am I dying on this topography hill
        if (this.topography[`${space.x},${space.y}`] === activeMonster.enemy) {
          enemiesInRange.push(
            enemies[
              enemies.findIndex((monster) => {
                return (
                  monster.position.x === space.x &&
                  monster.position.y === space.y
                );
              })
            ]
          );
        }
      }

      if (enemiesInRange.length > 0) {
        //sorry
        enemiesInRange = enemiesInRange.sort((a, b) => {
          return a.hp === b.hp
            ? a.position.y === b.position.y
              ? a.position.x - b.position.x
              : a.position.y - b.position.y
            : a.hp - b.hp;
        });

        enemiesInRange[0].takeDamage(this.topography, activeMonster.attack);
      }
    }

    this.goblins = this.goblins.filter((el) => !el.isDead);
    this.elves = this.elves.filter((el) => !el.isDead);
  }
}

const battlefield = new Battlefield(inputArr);

let rounds = 0;

// while (battlefield.goblins.length > 0) {
//   battlefield.playTurn();
//   rounds++;
// }

for (let i = 0; i > 37; i++) {
  battlefield.playTurn();
}
const newMap: string[][] = [];

for (let i = 0; i < inputArr.length; i++) {
  const row: string[] = [];
  row.length = inputArr[0].length;
  row.fill('.');

  newMap.push(row);
}

Object.keys(battlefield.topography).forEach((point) => {
  const split = point.split(',').map(Number);

  let char = battlefield.topography[point];

  newMap[split[1]][split[0]] = char[0];
});

newMap.forEach((el) => {
  console.log(el.join(''));
});

let hpSum = 0;

const winners =
  battlefield.elves.length > 0 ? battlefield.elves : battlefield.goblins;

winners.forEach((winner) => {
  hpSum += winner.hp;
});

console.log(hpSum * rounds);
