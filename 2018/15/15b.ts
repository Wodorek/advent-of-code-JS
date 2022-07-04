import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

//this is completely stolen from reddit.
//there is no way for me to bother with that...

const G = -1,
  E = -2;
type CG = typeof G | typeof E;
interface Unit {
  type: CG;
  x: number;
  y: number;
  hp: number;
}

function getSilverStar(
  input: string,
  elfPower: number = 3,
  noElfShouldDie = false
): [boolean, number, number, number] {
  let map = input.split('\n');
  const [n, m] = [map.length, map[0].length];
  const nm = n * m;
  let units = map.reduce<Unit[]>((units, line, y) => {
    line.split('').forEach((c, x) => {
      if (c === 'G' || c === 'E') {
        units.push({
          type: c === 'G' ? G : E,
          x,
          y,
          hp: 200,
        });
      }
    });
    return units;
  }, []);

  const unitByCords = new Array<any[]>(n).fill(null!);
  unitByCords.forEach((_, i) => (unitByCords[i] = new Array(m).fill(null)));
  units.forEach((unit) => {
    const { x, y } = unit;
    unitByCords[y][x] = unit;
  });

  // adjacent squares in reading order
  const dx = [0, -1, 1, 0],
    dy = [-1, 0, 0, 1];

  const updateMap = (x: number, y: number, unit: any) => {
    const row = map[y];
    let c = '.';
    if (unit && unit.type === G) c = 'G';
    if (unit && unit.type === E) c = 'E';
    unitByCords[y][x] = unit;
    map[y] = row.substr(0, x) + c + row.substr(x + 1);
  };

  const attack = (unit: any) => {
    const { x, y, type } = unit;
    let enemy: any = null;
    dx.forEach((_, i) => {
      const x1 = x + dx[i],
        y1 = y + dy[i];
      const candidate = unitByCords[y1][x1];
      if (
        candidate &&
        candidate.type !== type &&
        (!enemy || candidate.hp < enemy.hp)
      ) {
        enemy = candidate;
      }
    });

    if (enemy) {
      enemy.hp -= type === G ? 3 : elfPower;
      if (enemy.hp <= 0) {
        enemy.hp = 0;
        const { x: x1, y: y1 } = enemy;
        updateMap(x1, y1, null);
      }
      return true;
    }
    return false;
  };

  const findNextStep = (unit: Unit) => {
    // BFS
    const { x, y, type } = unit;
    let dist = new Array<any[]>(n).fill(null!);
    dist.forEach((_, i) => {
      dist[i] = new Array(m).fill(-1);
    });
    dist[y][x] = 0;
    const queue = new Array<{
      x: number;
      y: number;
      distance: number;
      origin?: number;
    }>(nm + 10);
    let from = 0,
      to = 1,
      enemy,
      bestEnemy: any,
      bestOrigin: any,
      nearest = nm;
    queue[from] = { x, y, distance: 0 };
    while (from < to) {
      const { x, y, distance, origin } = queue[from++];
      if (distance > nearest) break;
      dx.forEach((_, i) => {
        const [x1, y1] = [x + dx[i], y + dy[i]];
        if (map[y1][x1] === '.' && dist[y1][x1] === -1) {
          dist[y1][x1] = distance + 1;
          queue[to++] = {
            x: x1,
            y: y1,
            distance: distance + 1,
            origin: distance === 0 ? i : origin,
          };
        } else if ((enemy = unitByCords[y1][x1]) && enemy.type !== type) {
          if (
            !bestEnemy ||
            enemy.y < bestEnemy.y ||
            (enemy.y === bestEnemy.y && enemy.x < bestEnemy.x)
          ) {
            bestEnemy = enemy;
            bestOrigin = origin;
            nearest = distance;
          }
        }
      });
    }
    if (bestEnemy) {
      return [x + dx[bestOrigin], y + dy[bestOrigin]];
    } else {
      return [x, y];
    }
  };

  let rounds = 0;
  let combatEnded = false;
  while (!combatEnded) {
    // round
    units.forEach((unit) => {
      const { x, y, hp, type } = unit;
      if (hp === 0) return;

      combatEnded =
        combatEnded ||
        !units.find((enemy) => enemy.type !== type && enemy.hp > 0);
      if (combatEnded) return;

      if (attack(unit)) return;
      const [x1, y1] = findNextStep(unit);
      updateMap(x, y, null);
      updateMap(x1, y1, unit);
      unit.x = x1;
      unit.y = y1;
      attack(unit);
    });

    if (!combatEnded) ++rounds;
    if (
      noElfShouldDie &&
      units.find(({ hp, type }) => hp === 0 && type === E)
    ) {
      return [false, -1, -1, -1];
    }

    units = units
      .filter(({ hp }) => hp > 0)
      .sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y));
  }

  const elfsWon = !units.find(({ hp, type }) => type === G && hp > 0);
  const hpsumm = units.reduce((summ, { hp }) => summ + hp, 0);
  return [elfsWon, rounds, hpsumm, rounds * hpsumm];
}

function getGoldStar(input: string) {
  let notEnough = 3,
    enough = notEnough;
  let win = false,
    rounds,
    hpsumm,
    outcome;
  let win_rounds, win_hpsumm, win_outcome;
  while (!win) {
    enough *= 2;
    [win, rounds, hpsumm, outcome] = getSilverStar(input, enough, true);
    if (win) [win_rounds, win_hpsumm, win_outcome] = [rounds, hpsumm, outcome];
  }
  while (notEnough + 1 < enough) {
    let middle = Math.floor((enough + notEnough) / 2);
    [win, rounds, hpsumm, outcome] = getSilverStar(input, middle, true);
    if (win) {
      enough = middle;
      [win_rounds, win_hpsumm, win_outcome] = [rounds, hpsumm, outcome];
    } else {
      notEnough = middle;
    }
  }
  return [enough, win_rounds, win_hpsumm, win_outcome];
}

console.log(getSilverStar(input));
console.log(getGoldStar(input));
