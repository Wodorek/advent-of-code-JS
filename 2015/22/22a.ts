import input from './input';

import prepareInput from './helpers/prepareInput';

const [bossHp, bossAttack] = prepareInput(input);

interface ISpell {
  effect: 'poison' | 'shield' | 'recharge' | 'heal' | null;
  dmg: number;
  cost: number;
}

interface IGameState {
  wizardHp: number;
  bossHp: number;
  bossAttack: number;
  mana: number;
  poisonTimer: number;
  shieldTimer: number;
  rechargeTimer: number;
  totalManaSpent: number;
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

const initialState: IGameState = {
  wizardHp: 50,
  bossHp,
  bossAttack,
  mana: 500,
  poisonTimer: 0,
  shieldTimer: 0,
  rechargeTimer: 0,
  totalManaSpent: 0,
};

const manaValues: number[] = [];

function playRound(gameState: IGameState, spell: string) {
  const newState = { ...gameState };

  //Wizard "turn"
  // tick the timers
  if (newState.poisonTimer > 0) {
    newState.bossHp -= 3;

    if (newState.bossHp <= 0) {
      manaValues.push(newState.totalManaSpent);

      return;
    }
    newState.poisonTimer--;
  }

  if (newState.rechargeTimer > 0) {
    newState.mana += 101;
    newState.rechargeTimer--;
  }

  newState.shieldTimer--;

  const cast = allSpells[spell];

  //resolve effects
  if (cast.effect === 'heal') {
    newState.wizardHp += 2;
  }
  if (cast.effect === 'shield') {
    newState.shieldTimer = 6;
  }
  if (cast.effect === 'poison') {
    newState.poisonTimer = 6;
  }
  if (cast.effect === 'recharge') {
    newState.rechargeTimer = 5;
  }

  newState.bossHp -= cast.dmg;
  newState.mana -= cast.cost;
  newState.totalManaSpent += cast.cost;

  if (newState.bossHp <= 0) {
    manaValues.push(newState.totalManaSpent);

    return;
  }

  //boss "turn"

  // tick the timers
  if (newState.poisonTimer > 0) {
    newState.bossHp -= 3;

    if (newState.bossHp <= 0) {
      manaValues.push(newState.totalManaSpent);

      return;
    }
    newState.poisonTimer--;
  }

  if (newState.rechargeTimer > 0) {
    newState.mana += 101;
    newState.rechargeTimer--;
  }

  newState.shieldTimer--;

  const dmgToTake = (newState.shieldTimer > 0 ? -7 : 0) + newState.bossAttack;

  newState.wizardHp -= dmgToTake;

  if (newState.wizardHp <= 0) {
    return;
  }

  const possibleSpells = Object.keys(allSpells).filter((spell) => {
    let canCast = true;

    if (allSpells[spell].cost > newState.mana) {
      canCast = false;
    }

    if (spell === 'recharge' && newState.rechargeTimer > 0) {
      canCast = false;
    }

    if (spell === 'poison' && newState.poisonTimer > 0) {
      canCast = false;
    }

    if (spell === 'shield' && newState.shieldTimer > 0) {
      canCast = false;
    }

    return canCast;
  });

  for (let i = 0; i < possibleSpells.length; i++) {
    playRound(newState, possibleSpells[i]);
  }
}

playRound(initialState, 'poison');

console.log(Math.min(...manaValues));
