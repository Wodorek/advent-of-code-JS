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
  position: { x: number; y: number };
  hp: number = 200;
  attack: number = 3;
  type: 'Elf' | 'Goblin';
  enemy: 'Elf' | 'Goblin';

  constructor(x: number, y: number, type: 'G' | 'E') {
    this.position = { x, y };
    this.type = type === 'G' ? 'Goblin' : 'Elf';
    this.enemy = type === 'G' ? 'Elf' : 'Goblin';
  }

  move(vector: [number, number]) {
    this.position.x += vector[0];
    this.position.y += vector[1];
  }

  // possibly the worst piece of code I have ever produced.
  findNextStep(topography: ITopography, enemies: Monster[]) {
    const visited: string[] = [`${this.position.x}, ${this.position.y}`];

    const enemyPositions = enemies.map((enemy) => {
      return `${enemy.position.x},${enemy.position.y}`;
    });

    console.log('enemies', enemyPositions);

    let pathsTaken = [[{ x: this.position.x, y: this.position.y }]];

    const steps = [
      [0, -1], //up
      [1, 0], //right
      [0, 1], //down
      [-1, 0], //left
    ];

    //hate do do it
    while (true) {
      let newPaths: any[] = [];
      let targetPaths: any[] = [];

      pathsTaken.forEach((path) => {
        let adjacents = steps.map((step) => {
          return {
            x: path[path.length - 1].x + step[0],
            y: path[path.length - 1].y + step[1],
          };
        });

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
        targetPaths = targetPaths.sort((p1, p2) =>
          p1[p1.length - 1].y === p2[p2.length - 1].y
            ? p1[p1.length - 1].x - p2[p2.length - 1].x
            : p1[p1.length - 1].y - p2[p2.length - 1].y
        );
        return targetPaths[0][1];
      }

      pathsTaken = newPaths;

      if (pathsTaken.length < 1) return null;
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
const goblin = battlefield.goblins[0];

console.log(goblin);

console.log(goblin.findNextStep(battlefield.topography, battlefield.elves));
