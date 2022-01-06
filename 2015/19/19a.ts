import input from './input';

import prepareInput from './helpers/prepareInput';

const [transformations, molecule] = prepareInput(input);

console.log(molecule);

const possibleMolecules = new Set();

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

console.log(transformations);
transformations.forEach((transformation) => {
  const lookFor = transformation[0];
  const replacement = transformation[1];
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

console.log(possibleMolecules.size);
