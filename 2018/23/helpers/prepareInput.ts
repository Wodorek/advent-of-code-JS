/**Please don't look at how this funciton works */
function prepareInput(input: string) {
  const split = input.split('\n').map((el) => {
    return el
      .replaceAll(new RegExp('(pos=)|(r=)|(<)|(>)', 'g'), '')
      .replaceAll(',', ' ')
      .replaceAll('  ', ' ')
      .split(' ')
      .map(Number);
  });

  return split;
}

export default prepareInput;
