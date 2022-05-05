import { Action } from '../types';

const prepareInput = (str: string) => {
  return str.split('\n').map((el) => {
    const split = el.split(' ');

    const directive = split[0] === 'on' ? 1 : 0;

    const coords = split[1].split(',').map((el) => {
      const slice = el.slice(2);

      const split = slice.split('..');

      return [+split[0], +split[1]];
    });
    return [
      directive,
      { x: [...coords[0]], y: [...coords[1]], z: [...coords[2]] },
    ] as Action;
  });
};

export default prepareInput;
