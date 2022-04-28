const whatever = () => {
  this.allNodes = [];
  this.unravel();

  console.log(this.allNodes);
  const queue = [this.left, this.right];

  const candidates: SnailNum[] = [];

  while (queue.length > 0) {
    const toCheck = queue.shift()!;

    if (toCheck instanceof SnailNum) {
      if (toCheck.depth >= 4) {
        candidates.push(toCheck);
      } else {
        queue.unshift(toCheck.left);
        queue.push(toCheck.right);
      }
    }
  }

  let toExplode: SnailNum | number = candidates[0];

  const numbersLookup = this.allNodes.filter((el) => {
    return typeof el !== 'number';
  }) as SnailNum[];

  let left = numbersLookup.indexOf(toExplode) - 1;
  let right = numbersLookup.indexOf(toExplode) + 1;
  console.log(right - 1);

  while (left > 0) {
    if (typeof numbersLookup[left].right === 'number') {
      numbersLookup[left].right += toExplode.left as any;
      break;
    }
    if (typeof numbersLookup[left].left === 'number') {
      numbersLookup[left].left += toExplode.left as any;
      break;
    }
    left--;
  }

  while (right < numbersLookup.length) {
    if (typeof numbersLookup[right].left === 'number') {
      numbersLookup[right].left += toExplode.right as any;
      break;
    }
    if (typeof numbersLookup[right].right === 'number') {
      numbersLookup[right].right += toExplode.right as any;
      break;
    }
    right++;
  }

  if (toExplode.position === 'left') {
    toExplode!.prev!.left = 0;
  }

  if (toExplode.position === 'right') {
    toExplode!.prev!.right = 0;
  }
};
