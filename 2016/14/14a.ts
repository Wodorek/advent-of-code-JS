import md5 from 'md5';

const input = 'qzyelonm';

let idx = 0;
let foundHashes = 0;

const hashes = [];

for (let i = 0; i < 1000; i++) {
  const hash = md5(`${input}${i}`);
  hashes.push(hash);
}

const checkIfKey = (lookFor: string, forwardHashes: string[]) => {
  lookFor = lookFor.concat(lookFor.slice(0, 2));

  for (let i = 0; i < forwardHashes.length; i++) {
    if (forwardHashes[i].includes(lookFor)) {
      return true;
    }
  }

  return false;
};

while (foundHashes < 64) {
  const currentHash = hashes[idx];
  hashes.push(md5(`${input}${idx + 1 + 1000}`));
  const relevantSlice = hashes.slice(idx + 1);

  const threeInARow = currentHash.match(/(.)\1{2}/g);

  if (threeInARow) {
    if (checkIfKey(threeInARow[0], relevantSlice)) {
      foundHashes++;
    }
  }

  idx++;
}

console.log(idx);
