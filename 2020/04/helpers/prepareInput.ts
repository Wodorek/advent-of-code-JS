const prepareInput = (str: string) => {
  const split = str.split(/\n/);

  const creds: {}[] = [];

  const map = split.map((el) => {
    return el.split(' ');
  });

  let obj: { [key: string]: string } = {};

  map.forEach((el) => {
    el.forEach((cred) => {
      if (cred !== '') {
        const credParts = cred.split(':');
        obj[credParts[0]] = credParts[1];
      } else {
        creds.push(obj);
        obj = {};
      }
    });
  });

  return creds;
};

export default prepareInput;
