const reduceElves = (elfNum: number) => {
  const presentlessElves = new Set();
  let prevElf = 0;
  let currElf = 1;

  while (presentlessElves.size !== elfNum - 1) {
    while (presentlessElves.has(currElf)) {
      currElf++;
      if (currElf > elfNum) {
        currElf = 1;
      }
    }

    let nextElf = currElf + 1 > elfNum ? 1 : currElf + 1;

    while (presentlessElves.has(nextElf)) {
      nextElf++;
      if (nextElf > elfNum) {
        nextElf = 1;
      }
    }

    presentlessElves.add(nextElf);
    prevElf = currElf;
    currElf = nextElf;
  }

  console.log(prevElf);
};

reduceElves(3018458);

export default reduceElves;
