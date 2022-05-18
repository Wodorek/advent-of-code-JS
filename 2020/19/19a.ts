import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

const [rules, messages] = inputArr;

const parsedRules: { [key: number]: number[][] } = {};
const basicBlocks: { [key: number]: string } = {};

rules.forEach((rule) => {
  const split = rule.split(':');
  const id = +split[0];
  const subRules = split[1].split(' ').slice(1);
  let currSet: number[] = [];

  if (subRules[0] === '"a"' || subRules[0] === '"b"') {
    basicBlocks[id] = eval(subRules[0]);
    return;
  }

  parsedRules[id] = [];

  subRules.forEach((subRule) => {
    if (!isNaN(+subRule)) {
      currSet.push(+subRule);
    } else if (subRule === '|') {
      parsedRules[id].push(currSet);
      currSet = [];
    }
  });

  parsedRules[id].push(currSet);
});

function getPossibleStrings(id: number) {
  const queue = [...parsedRules[id]];
  const outputs: number[][] = [];

  while (queue.length > 0) {
    const item = queue.pop()!;

    let changed = false;

    for (let i = 0; i < item.length; i++) {
      if (parsedRules[item[i]]) {
        if (parsedRules[item[i]].length > 1) {
          const item2 = item.map((el) => {
            return el;
          });

          item.splice(i, 1, ...parsedRules[item[i]][0]);
          item2.splice(i, 1, ...parsedRules[item2[i]][1]);

          changed = true;
          queue.push(item, item2);
          break;
        } else {
          item.splice(i, 1, ...parsedRules[item[i]][0]);
          changed = true;
          queue.push(item);
          break;
        }
      }
    }

    if (!changed) {
      outputs.push(item);
    }
  }

  return outputs;
}

function parseIntoStrings(codes: number[][]) {
  return codes.map((code) => {
    return code
      .map((el) => {
        return basicBlocks[el];
      })
      .join('');
  });
}

function countMatching(possible: string[], messages: string[]) {
  let matching = 0;

  messages.forEach((message) => {
    if (possible.includes(message)) {
      matching++;
    }
  });

  return matching;
}

console.log(countMatching(parseIntoStrings(getPossibleStrings(0)), messages));
