import input from './input';

/**
 * Removes cancelling bangs, as well as items cancelled by uncancelled bangs.
 *
 * @param str input string
 * @returns
 */
const removeBangs = (str: string) => {
  const split = str.split('');

  for (let i = 0; i < split.length; i++) {
    let bangsCount = 0;
    if (str[i] === '!') {
      bangsCount++;

      let idx = 0;
      while (str[i + 1 + idx] === '!') {
        bangsCount++;
        idx++;
      }

      for (
        let j = i;
        j < i + bangsCount + (bangsCount % 2 === 0 ? 0 : 1);
        j++
      ) {
        split[j] = '';
      }
      i += bangsCount - 1;
    }
  }
  return split.join('');
};

const removeGarbage = (str: string) => {
  const split = str.split('');

  let inTrash = false;

  for (let i = 0; i < split.length; i++) {
    if (split[i] === '<' && !inTrash) {
      inTrash = true;

      let idx = 1;

      while (split[i + idx] !== '>') {
        idx++;
      }

      for (let j = i; j < i + idx + 1; j++) {
        split[j] = '';
      }

      i += idx - 1;
      inTrash = false;
    }
  }

  return split.join('');
};

const countPoints = (str: string) => {
  let totalPoints = 0;
  let pointValue = 1;

  str.split('').forEach((el) => {
    if (el === '{') {
      totalPoints += pointValue;
      pointValue++;
    }

    if (el === '}') {
      pointValue--;
    }
  });

  return totalPoints;
};

const withRemovedBangs = removeBangs(input);
const withRemovedGarbage = removeGarbage(withRemovedBangs);

console.log(countPoints(withRemovedGarbage));
