export default {};

const cups = '389125467';

let currIdx = 0;

function moveCups(currCups: string, cupIdx: number) {
  const splitCups = currCups.split('');

  const startFrom = cupIdx + 1 <= splitCups.length - 1 ? cupIdx + 1 : 0;

  const pickUps = [];

  let picking = startFrom;

  for (let i = 0; i < 3; i++) {
    if (picking > splitCups.length - 1) {
      picking = 0;
    }
    pickUps.push(splitCups[picking]);
    picking++;
  }

  let destination = +currCups[cupIdx] - 1;

  while (pickUps.includes(`${destination}`)) {
    destination--;
    if (destination <= 0) {
      destination = splitCups.length - 1;
    }
  }

  console.log(`destination: ${destination}`);
  console.log(`picks: ${pickUps}`);

  const regString = `[${pickUps[0]} | ${pickUps[1]} | ${pickUps[2]}]`;
  const regex = new RegExp(regString, 'g');

  const replaced = currCups.replaceAll(regex, '');

  const split = replaced.split(`${destination}`);
  console.log(split);

  currIdx++;
  if (currIdx > cups.length - 1) {
    currIdx = 0;
  }

  const left = split[0] ? split[0] : '';
  const right = split[1] ? split[1] : '';

  return left + `${destination}` + pickUps.join('') + right;
}

let movingCups = cups;

for (let i = 0; i < 10; i++) {
  movingCups = moveCups(movingCups, currIdx);
  console.log(`current move ${i + 1}`);
  console.log(movingCups);
  console.log('');
}

console.log(movingCups);
