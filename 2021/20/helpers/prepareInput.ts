const prepareInput = (str: string) => {
  let firstEl = true;

  const lookupStr: string[] = [];
  const image: string[][] = [];

  str.split('\n').forEach((el) => {
    if (el === '') {
      firstEl = false;
    } else if (firstEl) {
      lookupStr.push(el);
    } else {
      image.push(el.split(''));
    }
  });
  return [lookupStr.join(''), image] as [string, string[][]];
};

export default prepareInput;
