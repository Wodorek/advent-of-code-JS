import input from './input';

import prepareInput from './helpers/prepareInput';
import { IUnit } from './helpers/types';

const inputArr = prepareInput(input);

class Unit {
  type: string;
  count: number;
  hp: number;
  dmgType: string;
  dmgAmount: number;
  initiative: number;
  damageTypes: {
    immune: string[];
    weak: string[];
  };
  target: Unit | null = null;

  constructor(unitObj: IUnit) {
    this.count = unitObj.count;
    this.hp = unitObj.unitHp;
    this.dmgType = unitObj.deals;
    this.dmgAmount = unitObj.dmgAmount;
    this.initiative = unitObj.initiative;
    this.damageTypes = unitObj.damageTypes;
    this.type = unitObj.type;
  }

  takeDamage(dmgType: string, amount: number) {
    let dmg = amount;

    if (this.damageTypes.immune.includes(dmgType)) {
      return;
    } else if (this.damageTypes.weak.includes(dmgType)) {
      dmg *= 2;
    }

    const losses = Math.floor(dmg / this.hp);

    this.count -= losses;
  }

  getAttackInfo() {
    return {
      damageAmount: this.count * this.dmgAmount,
      dmgType: this.dmgType,
    };
  }

  simulateDmgTaken(dmgType: string, amount: number) {
    let dmg = amount;

    if (this.damageTypes.immune.includes(dmgType)) {
      dmg = 0;
    } else if (this.damageTypes.weak.includes(dmgType)) {
      dmg *= 2;
    }

    return dmg;
  }
}

class Battlefield {
  immune: Unit[] = [];
  infection: Unit[] = [];

  constructor(immune: Unit[], infection: Unit[]) {
    this.immune = immune;
    this.infection = infection;
  }

  establishTargets() {
    const queue = [...this.immune, ...this.infection].sort((a, b) => {
      return (
        b.dmgAmount * b.count - a.dmgAmount * a.count ||
        b.initiative - a.initiative
      );
    });

    let immuneTargets = [...this.infection];
    let infectionTargets = [...this.immune];

    while (queue.length > 0) {
      const pickingTarget = queue.shift()!;
      const targetPool =
        pickingTarget.type === 'immune' ? immuneTargets : infectionTargets;

      //what if deals zero?
      const possibleDmg = [];
      const sorted = targetPool.sort((a, b) => {
        const dmgB = b.simulateDmgTaken(
          pickingTarget.dmgType,
          pickingTarget.dmgAmount * pickingTarget.count
        );

        const dmgA = a.simulateDmgTaken(
          pickingTarget.dmgType,
          pickingTarget.dmgAmount * pickingTarget.count
        );

        return (
          dmgB - dmgA ||
          b.dmgAmount * b.count - a.dmgAmount * a.count ||
          b.initiative - a.initiative
        );
      });

      pickingTarget.target = sorted.shift()!;
      if (pickingTarget.type === 'immune') {
        immuneTargets = sorted;
      } else {
        infectionTargets = sorted;
      }
    }
  }

  dropTargets() {
    this.immune = this.immune.map((el) => {
      el.target = null;
      return el;
    });

    this.infection = this.infection.map((el) => {
      el.target = null;
      return el;
    });
  }

  fight() {
    this.establishTargets();

    const queue = [...this.immune, ...this.infection].sort((a, b) => {
      return b.initiative - a.initiative;
    });

    while (queue.length > 0) {
      const attacker = queue.shift()!;

      if (attacker.count <= 0) {
        continue;
      }

      attacker.target?.takeDamage(
        attacker.dmgType,
        attacker.count * attacker.dmgAmount
      );
    }

    this.immune = this.immune.filter((el) => el.count > 0);
    this.infection = this.infection.filter((el) => el.count > 0);
  }
}

const units = {
  immune: inputArr.immune.map((el) => new Unit(el)),
  infection: inputArr.infection.map((el) => new Unit(el)),
};

const battlefield = new Battlefield(units.immune, units.infection);

while (battlefield.immune.length > 0 && battlefield.infection.length > 0) {
  battlefield.fight();
}

let immuneCount = 0;
let infectionCount = 0;

console.log(
  `${battlefield.immune.length > 0 ? 'immune system' : 'infection'} won!`
);

battlefield.immune.forEach((el) => {
  immuneCount += el.count;
});
battlefield.infection.forEach((el) => {
  infectionCount += el.count;
});

console.log(Math.max(immuneCount, infectionCount));
