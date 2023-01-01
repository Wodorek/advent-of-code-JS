export interface IMonkey {
  id: number;
  starting: number[];
  operation: (old: number) => number;
  test: (num: number) => number;
}

function factory(var1: string, var2: string, op: string) {
  if (isNaN(+var2)) {
  }
}

function prepareInput(input: string) {
  const split = input.split('\n\n').map((inp) => inp.split('\n'));

  return split.map((el) => {
    const monkey: IMonkey = {
      id: +el[0].split(' ')[1].replace(':', ''),
      starting: eval(`[${el[1].replace('Starting items: ', '')}]`),
      test: (num: number) => {
        if (num % +el[3].split(' ').reverse()[0] === 0) {
          return +el[4].split(' ').reverse()[0];
        } else {
          return +el[5].split(' ').reverse()[0];
        }
      },
    };

    return monkey;
  });
}

export default prepareInput;
