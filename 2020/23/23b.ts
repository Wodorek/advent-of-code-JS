export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class CupList {
  head: ListNode | null = null;
  lastNode: ListNode | null = null;
  length = 0;
  nodeLookup: { [key: number]: ListNode } = {};

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
      this.lastNode = this.head;
    } else {
      const current = this.lastNode!;
      current.next = node;
    }

    node.next = this.head;

    this.nodeLookup[node.val] = node;

    this.lastNode = node;
    this.length++;
  }

  parseCups(cups: string) {
    this.head = null;

    const parsed = cups.split('').map(Number);

    parsed.forEach((cup) => {
      this.addNode(cup);
    });
  }

  moveCups(from: number) {
    const start = this.getAtIndex(from);

    this.head = start!;
    const pickupsStart = this.head!.next;
    const pickupEnd = pickupsStart!.next!.next;

    this.head.next = pickupEnd!.next;

    const pickedVals = [];

    let val = pickupsStart;

    for (let i = 0; i < 3; i++) {
      pickedVals.push(val!.val);
      val = val!.next;
    }

    let destinationVal = this.head.val - 1;

    if (destinationVal === 0) {
      destinationVal = this.length;
    }

    while (pickedVals.includes(destinationVal)) {
      destinationVal--;
      if (destinationVal === 0) {
        destinationVal = this.length;
      }
    }

    let destinationNode = this.nodeLookup[destinationVal];

    const temp = destinationNode!.next;

    destinationNode!.next = pickupsStart;
    pickupEnd!.next = temp;
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

    let node = this.nodeLookup[val];

    node = node.next!;

    for (let i = 0; i < this.length - 1; i++) {
      str = str + node?.val;
      node = node.next!;
    }

    return str;
  }
}

const cups = '598162734';
const cupList = new CupList();
cupList.parseCups(cups);

for (let i = 10; i < 1000001; i++) {
  cupList.addNode(i);
}

console.log(cupList.getAtIndex(cupList.length));

console.log(cupList.length);

let idx = 0;

for (let i = 0; i < 10000000; i++) {
  cupList.moveCups(idx);

  if (i % 1000 === 0) {
    console.log(i);
  }

  idx = 1;
}

const afterOne = cupList.nodeLookup[1]!.next;

const val1 = afterOne!.val;
const val2 = afterOne!.next!.val;

console.log(val1, val2);

console.log(val1 * val2);
