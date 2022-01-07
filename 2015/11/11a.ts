import input from './input';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const possibleStraights: string[] = [];

for (let i = 0; i < alphabet.length - 2; i++) {
  possibleStraights.push(alphabet.slice(i, i + 3));
}

console.log(possibleStraights);

const incrementPassword = (password: string, stepBack = 0): string => {
  const position = password.length - 1 - stepBack;

  const selectedLetter = password[position];
  const letterIdx = alphabet.indexOf(selectedLetter);

  const nextLetter = selectedLetter === 'z' ? 'a' : alphabet[letterIdx + 1];

  let newPassword: string | string[] = password.split('');
  newPassword[position] = nextLetter;
  newPassword = newPassword.join('');

  if (selectedLetter === 'z') {
    newPassword = incrementPassword(newPassword, stepBack + 1);
  }

  return newPassword;
};

const checkIfValid = (password: string) => {
  const hasIOL = password.match(/[iol]/g);
  const hasRepeated = password.match(/([a-z])\1/g);

  if (hasIOL) {
    return false;
  }

  if (!hasRepeated || hasRepeated.length < 2) {
    return false;
  }

  let hasStraight = false;

  possibleStraights.forEach((el) => {
    if (password.includes(el)) {
      hasStraight = true;
    }
  });

  return hasStraight;
};

let password = input;

while (!checkIfValid(password)) {
  password = incrementPassword(password);
}

console.log(password);
