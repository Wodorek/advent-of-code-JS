function countActiveAround(
  cube: string[][][],
  slice: number,
  row: number,
  column: number
) {
  let foundOn = 0;

  if (cube[slice - 1]) {
    if (cube[slice - 1][row - 1]) {
      if (cube[slice - 1][row - 1]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice - 1][row - 1]?.[column] === '#') {
        foundOn++;
      }
      if (cube[slice - 1][row - 1]?.[column + 1] === '#') {
        foundOn++;
      }
    }
    if (cube[slice - 1][row + 1]) {
      if (cube[slice - 1][row + 1]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice - 1][row + 1]?.[column] === '#') {
        foundOn++;
      }
      if (cube[slice - 1][row + 1]?.[column + 1] === '#') {
        foundOn++;
      }
    }
    if (cube[slice - 1][row]) {
      if (cube[slice - 1][row]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice - 1][row]?.[column] === '#') {
        foundOn++;
      }
      if (cube[slice - 1][row]?.[column + 1] === '#') {
        foundOn++;
      }
    }
  }

  if (cube[slice]) {
    if (cube[slice][row - 1]) {
      if (cube[slice][row - 1]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice][row - 1]?.[column] === '#') {
        foundOn++;
      }
      if (cube[slice][row - 1]?.[column + 1] === '#') {
        foundOn++;
      }
    }
    if (cube[slice][row + 1]) {
      if (cube[slice][row + 1]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice][row + 1]?.[column] === '#') {
        foundOn++;
      }
      if (cube[slice][row + 1]?.[column + 1] === '#') {
        foundOn++;
      }
    }
    if (cube[slice][row]) {
      if (cube[slice][row]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice][row]?.[column + 1] === '#') {
        foundOn++;
      }
    }
  }

  if (cube[slice + 1]) {
    if (cube[slice + 1][row - 1]) {
      if (cube[slice + 1][row - 1]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice + 1][row - 1]?.[column] === '#') {
        foundOn++;
      }
      if (cube[slice + 1][row - 1]?.[column + 1] === '#') {
        foundOn++;
      }
    }
    if (cube[slice + 1][row]) {
      if (cube[slice + 1][row]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice + 1][row]?.[column] === '#') {
        foundOn++;
      }
      if (cube[slice + 1][row]?.[column + 1] === '#') {
        foundOn++;
      }
    }
    if (cube[slice + 1][row + 1]) {
      if (cube[slice + 1][row + 1]?.[column - 1] === '#') {
        foundOn++;
      }
      if (cube[slice + 1][row + 1]?.[column] === '#') {
        foundOn++;
      }
      if (cube[slice + 1][row + 1]?.[column + 1] === '#') {
        foundOn++;
      }
    }
  }

  return foundOn;
}

export default countActiveAround;
