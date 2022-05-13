function prepareInput(input: string) {
  const split = input.split('\n');

  const rules: string[] = [];
  const messages: string[] = [];

  split.forEach((el) => {
    if (el === '') {
      return;
    }

    if (!isNaN(+el[0])) {
      rules.push(el);
    } else {
      messages.push(el);
    }
  });

  return [rules, messages];
}

export default prepareInput;
