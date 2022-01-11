const preapreInput = (input: string) => {
  return input.split('\n').map((el) => {
    const split = el.split(' ');

    if (split.length === 2) {
      const size = split[1].split('x');
      return ['rect', +size[0], +size[1]];
    } else {
      const idx = split[2].split('=');
      return [`r${split[1][0]}`, +idx[1], +split[4]];
    }
  }) as [string, number, number][];
};

export default preapreInput;
