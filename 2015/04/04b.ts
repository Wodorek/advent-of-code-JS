import crypto from 'crypto';

const input = 'yzbqklnj';

const hashFunc = (str: string) => {
  return crypto.createHash('md5').update(str).digest('hex');
};

const startsWithZeroes = (str: string) => {
  const slice = str.slice(0, 6);
  if (slice === '000000') {
    return true;
  }
  return false;
};

let idx = 0;

while (!startsWithZeroes(hashFunc(`${input}${idx}`))) {
  idx++;
}

console.log(idx);
