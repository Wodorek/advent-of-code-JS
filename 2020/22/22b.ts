import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input);

console.log(inputArr);

function playGame(p1Deck: number[], p2Deck: number[]): ['p1' | 'p2', number[]] {
  const p1 = [...p1Deck];
  const p2 = [...p2Deck];

  const p1Configs: string[] = [];
  const p2Configs: string[] = [];

  while (p1.length > 0 && p2.length > 0) {
    const p1Config = p1.join(',');
    const p2Config = p2.join(',');

    if (p1Configs.includes(p1Config) || p2Configs.includes(p2Config)) {
      return ['p1', p1];
    } else {
      p1Configs.push(p1Config);
      p2Configs.push(p2Config);

      const p1Card = p1.shift()!;
      const p2Card = p2.shift()!;

      if (p1.length >= p1Card && p2.length >= p2Card) {
        const winner = playGame(p1.slice(0, p1Card), p2.slice(0, p2Card))[0];

        if (winner === 'p1') {
          p1.push(p1Card, p2Card);
        } else {
          p2.push(p2Card, p1Card);
        }
      } else {
        if (p1Card > p2Card) {
          p1.push(p1Card, p2Card);
        } else {
          p2.push(p2Card, p1Card);
        }
      }
    }
  }

  return p1.length === 0 ? ['p2', p2] : ['p1', p1];
}

const solution = playGame(inputArr[0], inputArr[1])[1]
  .reverse()
  .reduce((prev, val, idx) => {
    return prev + val * (idx + 1);
  }, 0);

console.log(solution);
