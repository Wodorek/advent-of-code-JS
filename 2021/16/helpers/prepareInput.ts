const prepareInput = (str: string) => {
  const arr = str.split('');

  let binaryStr = '';

  arr.forEach((el) => {
    const bits = parseInt(el, 16);
    let str = bits.toString(2);
    while (str.length < 4) {
      str = '0' + str;
    }
    binaryStr = binaryStr.concat(str);
  });
  return binaryStr;
};

export default prepareInput;
