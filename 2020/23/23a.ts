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

    for (let i = 0; i < this.length; i++) {
      if (node!.val === val) {
        return node;
      }

      node = node!.next;
    }
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

    let toRemove = start.next!;
    let cupSlice = start.next!;

    for (let i = 0; i < 2; i++) {
      toRemove = toRemove.next!;
    }

    start.next = toRemove.next;

    toRemove.next = null;

    const sliceValues: number[] = [];

    let slice = cupSlice;

    while (slice.next) {
      sliceValues.push(slice.val);
      slice = slice.next;
    }
    sliceValues.push(slice.val);

    console.log(sliceValues);

    console.log('cs', cupSlice);
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
}

const initialCups = '123456789';

const cupList = new CupList();
cupList.parseCups(initialCups);
cupList.moveCups(0);
console.log(cupList);
