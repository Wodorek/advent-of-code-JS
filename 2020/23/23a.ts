class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class CupList {
  head: ListNode | null = null;
  length = 0;

  getAtIndex(index: number) {
    if (index >= 0 && index <= this.length) {
      let node = this.head;

      for (let i = 0; i < index && node !== null; i++) {
        node = node.next;
      }

      return node;
    }
    return undefined;
  }

  getOfValue(val: number) {
    let node = this.head;

    console.log(val);

    for (let i = 0; i < this.length; i++) {
      if (node!.val === val) {
        return node;
      }

      node = node!.next;
    }
  }

  findIndex(val: number) {
    let idx = 0;
    let node = this.head;

    while (node!.val !== val) {
      node = node!.next;
      idx++;
    }

    return idx;
  }

  addNode(val: number) {
    const node = new ListNode(val);

    if (!this.head) {
      this.head = node;
    } else {
      const current = this.getAtIndex(this.length - 1)!;
      current.next = node;
    }

    node.next = this.head;
    this.length++;
  }

  parseCups(cups: string) {
    const parsed = cups.split('').map(Number);

    parsed.forEach((cup) => {
      this.addNode(cup);
    });
  }

  moveCups(from: number) {
    const start = this.getAtIndex(from)!;

    const startVal = start.val;

    let toRemove = start.next!;
    let cupSlice = start.next!;

    for (let i = 0; i < 2; i++) {
      toRemove = toRemove.next!;
    }

    start.next = toRemove.next;

    toRemove.next = null;

    const cupSliceEnd = cupSlice.next!.next;

    let targetVal = startVal - 1;

    let target = this.getOfValue(targetVal);

    console.log(this.convertToString());

    while (target === undefined) {
      targetVal--;
      if (targetVal < 0) {
        targetVal = this.length;
      }
      target = this.getOfValue(targetVal);
    }

    const temp = target!.next;

    target!.next = cupSlice;
    cupSliceEnd!.next = temp;

    return this.findIndex(this.getOfValue(startVal)!.next!.val);
  }

  convertToString() {
    let str = '';

    let node = this.head;

    for (let i = 0; i < this.length; i++) {
      str = str + node?.val;
      node = node!.next;
    }

    return str;
  }

  getAfter(val: number) {
    let str = '';

    let node = this.getOfValue(val);

    for (let i = 0; i < this.length; i++) {
      str = str + node?.val;
      node = node!.next;
    }

    return str;
  }
}

const initialCups = '389125467';

let idx = 0;

const cupList = new CupList();
cupList.parseCups(initialCups);

for (let i = 0; i < 10; i++) {
  const newIdx = cupList.moveCups(idx);
  idx = newIdx;
}
