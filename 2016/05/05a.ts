// uses md5 package for the hashes
//https://www.npmjs.com/package/md5

import md5 from 'md5';

const input = 'abbhdwsy';

let password = '';
let idx = 0;

while (password.length < 8) {
  const testString = `${input}${idx}`;
  const hash = md5(testString);

  if (hash.slice(0, 5) === '00000') {
    password = password.concat(hash[5]);
    console.log(password);
  }

  idx++;
}

console.log(password);
