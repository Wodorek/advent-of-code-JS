import permute from './helpers/permute';

const weapons = [
  [8, 4, 0],
  [10, 5, 0],
  [25, 6, 0],
  [40, 7, 0],
  [74, 8, 0],
];

const armors = [
  [13, 0, 1],
  [31, 0, 2],
  [53, 0, 3],
  [75, 0, 4],
  [102, 0, 5],
  [0, 0, 0],
];
//[0,0,0] means no armor

const rings = [
  [25, 1, 0],
  [50, 2, 0],
  [100, 3, 0],
  [20, 0, 1],
  [40, 0, 2],
  [80, 0, 3],
];

let possibleRings = permute(rings);
possibleRings = possibleRings.filter((el) => {
  return el.length <= 2;
});

//no rings option
possibleRings.push([[0, 0, 0]]);

const weaponsWithArmor: number[][][] = [];

weapons.forEach((weapon) => {
  armors.forEach((armor) => {
    weaponsWithArmor.push([armor, weapon]);
  });
});

const possibleEquipment: number[][][] = [];

weaponsWithArmor.forEach((wwa) => {
  possibleRings.forEach((rings) => {
    possibleEquipment.push([...wwa, ...rings]);
  });
});

const winningCosts = [];

for (let i = 0; i < possibleEquipment.length; i++) {
  const [cost, dmg, arm] = possibleEquipment[i].reduce((prev, val) => {
    return [prev[0] + val[0], prev[1] + val[1], prev[2] + val[2]];
  });

  const me = {
    dmg,
    arm,
    hp: 100,
    cost,
  };

  const boss = {
    dmg: 9,
    arm: 2,
    hp: 103,
  };

  let round = 1;

  while (me.hp > 0 && boss.hp > 0) {
    if (round % 2 !== 0) {
      boss.hp -= me.dmg - boss.arm;
    } else {
      me.hp -= boss.dmg - me.arm;
    }

    if (boss.hp <= 0) {
      winningCosts.push(me.cost);
      continue;
    }

    if (me.hp <= 0) {
      continue;
    }

    round++;
  }
}

console.log(Math.min(...winningCosts));
