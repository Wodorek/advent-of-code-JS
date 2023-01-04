export interface IMonkey {
  id: number;
  items: number[];
  operation: (old: number) => number;
  test: (num: number) => number;
  inspections: number;
}

function factory(var1: string, op: string) {
  if (!isNaN(+var1)) {
    if (op === '*') {
      return (old: number) => old * +var1;
    } else {
      return (old: number) => old + +var1;
    }
  } else {
    if (op === '*') {
      return (old: number) => old * old;
    } else {
      return (old: number) => old + old;
    }
  }
}

function prepareInput(input: string) {
  const split = input.split('\n\n').map((inp) => inp.split('\n'));

  return split.map((el) => {
    const operationVars = el[2].split(' ').reverse();

    console.log(operationVars);

    const monkey: IMonkey = {
      id: +el[0].split(' ')[1].replace(':', ''),
      items: eval(`[${el[1].replace('Starting items: ', '')}]`),
      test: (num: number) => {
        if (num % +el[3].split(' ').reverse()[0] === 0) {
          return +el[4].split(' ').reverse()[0];
        } else {
          return +el[5].split(' ').reverse()[0];
        }
      },
      operation: factory(operationVars[0], operationVars[1]),
      inspections: 0,
    };

    return monkey;
  });
}

export default prepareInput;
