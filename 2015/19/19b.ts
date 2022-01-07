import input from './input';

import prepareInput from './helpers/prepareInput';

let [transformations, molecule] = prepareInput(input);
//trasformations is an array of changes, "Ca => CaCa" in input is [Ca, CaCa] in trasformations

let possibleMolecules: Set<string> = new Set();

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

console.log(molecule);

while (molecule !== 'e') {}

transformations.forEach((transformation) => {
  const lookFor = transformation[1];
  const replacement = transformation[0];
  const windowSize = lookFor.length;

  for (let i = 0; i < molecule.length - windowSize; i++) {
    const lookingAt = molecule.slice(i, windowSize + i);

    if (lookingAt === lookFor) {
      possibleMolecules.add(
        replaceInString(molecule, i, windowSize, replacement)
      );
    }
  }
});
