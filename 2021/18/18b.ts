import input from './input';
import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

//Sorry for the any typings, since all sorts of hackyness is going on in this one, i'd rather avoid the headache

const explode = (snailNum: any) => {
  const asString: string = snailNum.join('');

  const parts = [];

  let i = 0;

  while (i < asString.length) {
    if (asString[i] === '[') {
      i++;
      parts.push('[');
    } else if (asString[i] === ',') {
      i++;
      parts.push(',');
    } else if (asString[i] === ']') {
      i++;
      parts.push(']');
    } else if (asString[i] === ' ') {
      i++;
    } else {
      let j = i;
      while (j < asString.length && typeof +asString[j] === 'number') {
        j++;
        parts.push(asString.slice(i, j));
      }
      i = j;
    }
  }
};

const split = (snailNum: any): [any, any] => {
  if (Array.isArray(snailNum)) {
    const [wasSplit, splitVal] = split(snailNum[0]);

    if (wasSplit) {
      return [true, [splitVal, snailNum[1]]];
    }
  } else {
    if (typeof snailNum === 'number') {
      if (snailNum > 10) {
        return [true, [snailNum / 2, (snailNum + 1) / 2]];
      } else {
        return [false, snailNum];
      }
    }
  }
  return [true, 2];
};

const reduceSnail = (snailNum: any): any => {
  const [exploded, explodedVal] = explode(snailNum);

  if (exploded) {
    return reduceSnail(explodedVal);
  } else {
    const [wasSplit, splitVal] = split(snailNum);
    if (wasSplit) {
      return reduceSnail(splitVal);
    } else {
      return splitVal;
    }
  }
};

const add = (arr1: any, arr2: any) => {
  const newVal = [arr1, arr2];
  return reduceSnail(newVal);
};

explode([1, 2]);
