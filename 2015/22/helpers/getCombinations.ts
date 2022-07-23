function getWithRepetition<T>(arr: T[], l: number = arr.length) {
  if (l === void 0) l = arr.length;
  var data = Array(l),
    results = [];
  (function f(pos, start) {
    if (pos === l) {
      results.push(data.slice());
      return;
    }
    for (var i = start; i < arr.length; ++i) {
      data[pos] = arr[i];
      f(pos + 1, i);
    }
  })(0, 0);
  return results;
}

function permutator<T>(inputArr: T[]) {
  let result: T[][] = [];

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
}

function getCombinations<T>(arr: T[], l: number = arr.length) {
  const withRepeats = getWithRepetition(arr, l);

  const all: T[][] = [];

  withRepeats.forEach((el) => {
    all.push(...permutator(el));
  });

  return all;
}

export default getCombinations;
