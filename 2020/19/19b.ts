import input from './input';

const parsed = input.split('\n\n').map((a) => a.split('\n'));
const messages = parsed[1];
let rules: any[] = [];
parsed[0].forEach((a) => (rules[a.split(': ')[0] as any] = a.split(': ')[1]));
rules = rules.map((a) => a.replaceAll('"', ''));

function expandAll(str: string) {
  while (str.match(/\d/)) {
    let expList = str.match(/(?<!\d)\d+(?!\d)/g) || [];
    expList = expList.filter((a, i, ar) => ar.findIndex((b) => b == a) == i);
    expList.forEach((exp: any) => {
      str = str.replaceAll(
        new RegExp(`(?<!\\d)${exp}(?!\\d)`, 'g'),
        rules[exp].includes('|') ? `(${rules[exp]})` : rules[exp]
      );
    });
  }
  return str.replaceAll(' ', '');
}

const rule42 = expandAll('42');
const rule31 = expandAll('31');

let valid: string[] = [];
for (let i = 1; i < 5; i++) {
  const rule = new RegExp(`^${rule42}+${rule42}{${i}}${rule31}{${i}}$`);
  valid.push(...messages.filter((a) => !valid.includes(a) && rule.test(a)));
}

console.log(valid.length);

//I
//HATE
//REGEX
