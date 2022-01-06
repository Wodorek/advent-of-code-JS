const prepareInput = (input: string) => {
  const split = input.split('\n').map((el) => {
    const elements = el.replaceAll(':', '').replaceAll(',', '').split(' ');

    return {
      id: +elements[1],
      [elements[2]]: +elements[3],
      [elements[4]]: +elements[5],
      [elements[6]]: +elements[7],
    };
  });

  return split;
};

export default prepareInput;
