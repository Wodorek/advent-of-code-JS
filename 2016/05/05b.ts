// uses md5 package for the hashes
//https://www.npmjs.com/package/md5

import md5 from 'md5';

const input = 'abbhdwsy';

let password: string[] = [];
password.length = 8;

let idx = 0;

while (password.join('').length < 8) {
  const testString = `${input}${idx}`;
  const hash = md5(testString);

  if (hash.slice(0, 5) === '00000') {
    if (password[+hash[5]] === undefined && !isNaN(+hash[5]) && +hash[5] <= 7) {
      password[+hash[5]] = hash[6];
    }
  }

  idx++;
}

console.log(password.join(''));
