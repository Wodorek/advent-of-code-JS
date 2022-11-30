//just copy this to a year and run, I don't feel like playing with paths, etc.

import fs from 'fs';

const solutionContent = `import input from './input';

import prepareInput from './helpers/prepareInput';

const inputArr = prepareInput(input)

console.log(inputArr)`;

const inputContent = 'const input = ``;\n\nexport default input;';

const helpersContent =
  'function prepareInput(input:string) {};\n\nexport default prepareInput';

function createDirectory(name: string) {
  fs.mkdirSync(`./${name}`);
  fs.appendFileSync(`./${name}/${name}a.ts/`, solutionContent);
  fs.appendFileSync(`./${name}/${name}b.ts/`, solutionContent);
  fs.appendFileSync(`./${name}/input.ts`, inputContent);

  fs.mkdirSync(`./${name}/helpers`, { recursive: true });
  fs.appendFileSync(`./${name}/helpers/prepareInput.ts`, helpersContent);
}

for (let i = 1; i <= 25; i++) {
  let name = `${i}`;
  if (name.length === 1) {
    name = '0' + name;
  }

  createDirectory(name);
}
