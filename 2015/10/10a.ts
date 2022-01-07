import input from './input';

console.log(input);

const regex = /((.)(\2*))/g;

const lookAndSay = (str: string) => {
  const matches = str.match(regex)!;

  let newStr = '';

  matches.forEach((substr) => {
    newStr = newStr.concat(substr.length.toString());
    newStr = newStr.concat(substr[0]);
  });

  return newStr;
};

let str = input;

for (let i = 0; i < 40; i++) {
  const newStr = lookAndSay(str);
  str = newStr;
}

console.log(str.length);
