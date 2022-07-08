import { IUnit } from './types';

function parseDamageTypes(dmgArr: string[]) {
  const dmgTypes: { immune: string[]; weak: string[] } = {
    immune: [],
    weak: [],
  };

  let pushTo = dmgTypes.immune;

  dmgArr.forEach((el) => {
    if (el === 'immune') {
      pushTo = dmgTypes.immune;
    } else if (el === 'weak') {
      pushTo = dmgTypes.weak;
    } else if (el !== 'to') {
      pushTo.push(el);
    }
  });

  return dmgTypes;
}

function parseIntoUnit(toParse: string, type: string): IUnit {
  const split = toParse
    .replaceAll('(', '( ')
    .replaceAll(')', ' )')
    .replaceAll(new RegExp(',|:|;', 'g'), '')
    .split(' ');

  const openIndex = split.indexOf('(');

  let damageTypes;

  if (openIndex === -1) {
    damageTypes = {
      immune: [],
      weak: [],
    };
  } else {
    damageTypes = parseDamageTypes(
      split.slice(openIndex + 1, split.indexOf(')'))
    );
  }

  const unit: IUnit = {
    type,
    count: +split[0],
    damageTypes,
    deals: split[split.length - 5],
    dmgAmount: +split[split.length - 6],
    initiative: +split[split.length - 1],
    unitHp: +split[4],
  };

  return unit;
}

function prepareInput(input: string): {
  immune: IUnit[];
  infection: IUnit[];
} {
  const split = input.split('\n');

  const separatorIdx = split.indexOf('');

  const immune = split.slice(1, separatorIdx);
  const infection = split.slice(separatorIdx + 2);

  return {
    immune: immune.map((el) => parseIntoUnit(el, 'immune')),
    infection: infection.map((el) => parseIntoUnit(el, 'infection')),
  };
}

export default prepareInput;
