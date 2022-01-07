import input from './input';

import prepareInput from './helpers/prepareInput';

let [transformations, molecule] = prepareInput(input);

const replaceInString = (
  str: string,
  start: number,
  len: number,
  newStr: string
) => {
  const left = str.slice(0, start);
  const right = str.slice(start + len);

  return left + newStr + right;
};

const getPossibleMolecules = (molecules: Set<string>) => {
  const moleculeArr = Array.from(molecules);

  let possibleMolecules: string[] = [];

  let minLen = Infinity;

  moleculeArr.forEach((molecule) => {
    transformations.forEach((transformation) => {
      const lookFor = transformation[1];
      const replacement = transformation[0];
      const windowSize = lookFor.length;

      for (let i = 0; i < molecule.length - windowSize + 1; i++) {
        const lookingAt = molecule.slice(i, windowSize + i);

        if (lookingAt === lookFor) {
          const newStr = replaceInString(molecule, i, windowSize, replacement);

          possibleMolecules.push(newStr);
        }
      }
    });
  });

  possibleMolecules = possibleMolecules.sort((a, b) => {
    return a.length > b.length ? 1 : -1;
  });

  return new Set(possibleMolecules.slice(0, 150));
};

let possibleMolecules: Set<string> = new Set();
possibleMolecules.add(molecule);

let times = 0;

while (!possibleMolecules.has('e')) {
  possibleMolecules = getPossibleMolecules(possibleMolecules);
  console.log(possibleMolecules.size);

  times++;
}
console.log(times);
