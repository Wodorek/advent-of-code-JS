import input from './input';

import prepareInput from './helpers/prepareInput';
import getCombinations from './helpers/getCombinations';

const [bossHp, bossAttack] = prepareInput(input);

interface ISpell {
  effect: 'poison' | 'shield' | 'recharge' | 'heal' | null;
  dmg: number;
  cost: number;
}

const allSpells: { [key: string]: ISpell } = {
  missle: {
    effect: null,
    dmg: 4,
    cost: 53,
  },
  drain: {
    effect: 'heal',
    dmg: 2,
    cost: 73,
  },
  shield: {
    effect: 'shield',
    dmg: 0,
    cost: 113,
  },
  poison: {
    effect: 'poison',
    dmg: 0,
    cost: 173,
  },
  recharge: {
    effect: 'recharge',
    dmg: 0,
    cost: 229,
  },
};

class Battle {
  isWizardDead = false;
  isBossDead = false;
  wizardHp: number = 50;
  bossHp: number;
  bossAttack: number;
  mana: number = 500;
  isShielded: boolean = false;
  isRecharging: boolean = false;
  isPoisoned: boolean = false;
  effectsTimers = {
    shield: 0,
    recharge: 0,
    poison: 0,
  };
  totalManaSpent: number = 0;
  noIllegalCasts: boolean;

  constructor(bossHp: number, bossAttack: number) {
    this.bossHp = bossHp;
    this.bossAttack = bossAttack;
    this.noIllegalCasts = true;
  }

  wizardTakeDamage() {
    const armor = this.isShielded ? 7 : 0;
    this.wizardHp -= this.bossAttack - armor;
    if (this.wizardHp <= 0) {
      this.isWizardDead = true;
    }
  }

  bossTakeDamage(dmg: number) {
    this.bossHp -= dmg;

    if (this.bossHp <= 0) {
      this.isBossDead = true;
    }
  }

  tickDownTimers() {
    this.effectsTimers.shield--;
    this.effectsTimers.recharge--;
    this.effectsTimers.poison--;

    if (this.effectsTimers.shield <= 0) {
      this.isShielded = false;
    }

    if (this.effectsTimers.recharge <= 0) {
      this.isRecharging = false;
    }

    if (this.effectsTimers.poison <= 0) {
      this.isPoisoned = false;
    }
  }

  wizardSpellCast(spell: ISpell) {
    if (spell.cost > this.mana) {
      return;
    }

    if (spell.effect === 'heal') {
      this.wizardHp += 2;
    } else if (spell.effect === 'recharge') {
      if (this.effectsTimers.recharge > 0) {
        console.log('illegal re');
        this.noIllegalCasts = false;
      }
      this.isRecharging = true;
      this.effectsTimers.recharge = 5;
    } else if (spell.effect === 'shield') {
      if (this.effectsTimers.shield > 0) {
        console.log('illegal s');
        this.noIllegalCasts = false;
      }
      this.isShielded = true;
      this.effectsTimers.shield = 6;
    } else if (spell.effect === 'poison') {
      if (this.effectsTimers.poison > 0) {
        console.log('illegal p');
        this.noIllegalCasts = false;
      }
      this.isPoisoned = true;
      this.effectsTimers.poison = 6;
    }

    this.bossTakeDamage(spell.dmg);
    this.mana -= spell.cost;
    this.totalManaSpent += spell.cost;
  }

  playWizardTurn(spell: ISpell) {
    this.wizardHp--;

    if (this.wizardHp <= 0) {
      this.isWizardDead = true;
      return;
    }

    if (this.isPoisoned) {
      this.bossHp -= 3;
      if (this.bossHp <= 0) {
        this.isBossDead = true;
      }
    }

    if (this.isRecharging) {
      this.mana += 101;
    }

    if (this.isBossDead || this.isWizardDead) {
      return;
    }

    this.tickDownTimers();
    this.wizardSpellCast(spell);
  }

  playBossTurn() {
    if (this.isPoisoned) {
      this.bossHp -= 3;
      if (this.bossHp <= 0) {
        this.isBossDead = true;
      }
    }

    if (this.isRecharging) {
      this.mana += 101;
    }

    if (this.isBossDead || this.isWizardDead) {
      return;
    }

    this.tickDownTimers();
    this.wizardTakeDamage();
  }

  playGame(spells: (keyof typeof allSpells)[]) {
    let currIdx = 0;

    while (!this.isBossDead && !this.isWizardDead) {
      this.playWizardTurn(allSpells[spells[currIdx]]);
      this.playBossTurn();
      currIdx++;
    }

    if (this.isBossDead) {
      return true;
    } else {
      return false;
    }
  }
}

//done by hand, it was more fun.
// for functions to do it the "right way", check the helpers folder
const spells = [
  'poison',
  'recharge',
  'shield',
  'poison',
  'recharge',
  'drain',
  'poison',
  'missle',
  'missle',
];

const battle = new Battle(bossHp, bossAttack);

console.log(battle.totalManaSpent);
