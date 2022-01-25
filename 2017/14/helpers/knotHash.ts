const knotHash = (input: string) => {
  let nums: number[] = [];

  for (let i = 0; i < 256; i++) {
    nums.push(i);
  }

  const lengths: number[] = [];

  input
    .toString()
    .split('')
    .forEach((el) => {
      lengths.push(el.charCodeAt(0));
    });

  lengths.push(...[17, 31, 73, 47, 23]);

  let skipSize = 0;
  let position = 0;

  const executeInstruction = (arr: number[], pos: number, size: number) => {
    const end = pos + size > arr.length ? arr.length : pos + size;

    const newArr = arr.map((el) => {
      return el;
    });

    if (size > 255) {
      return newArr;
    }

    const idxs: number[] = [];
    const values: number[] = [];

    for (let i = pos; i < end; i++) {
      values.push(arr[i]);
      idxs.push(i);
    }

    let idx = 0;

    while (values.length !== size) {
      values.push(arr[idx]);
      idxs.push(idx);
      idx++;
    }

    values.reverse();

    if (values.length === arr.length) {
      return values;
    }

    for (let i = 0; i < idxs.length; i++) {
      newArr[idxs[i]] = values[i];
    }

    position += size + skipSize;

    while (position > arr.length - 1) {
      position = position - arr.length;
    }
    skipSize++;
    if (skipSize === 256) {
      skipSize = 0;
    }

    return newArr;
  };

  let rope = nums;

  for (let i = 0; i < 64; i++) {
    lengths.forEach((len) => {
      rope = executeInstruction(rope, position, len);
    });
  }

  const denseHash = [];

  for (let i = 0; i < rope.length; i++) {
    const slice = rope.slice(i, i + 16);

    let num = 0;

    slice.forEach((el) => {
      num = num ^ el;
    });

    i += 15;

    denseHash.push(num);
  }

  const knotHash = denseHash
    .map((el) => {
      return el.toString(16).padStart(2, '0');
    })
    .join('');

  return knotHash;
};

export default knotHash;
