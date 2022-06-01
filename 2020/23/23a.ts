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
    this.length -= 3;

    let destinationVal = this.head.val - 1;
    let destinationNode = this.getOfValue(destinationVal);

    while (destinationNode === undefined) {
      destinationVal--;
      if (destinationVal === -1) {
        destinationVal = this.length + 3;
      }
      destinationNode = this.getOfValue(destinationVal);
    }

    const temp = destinationNode!.next;

    destinationNode!.next = pickupsStart;
    pickupEnd!.next = temp;

    this.length += 3;
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

    node = node!.next;

    for (let i = 0; i < this.length - 1; i++) {
      str = str + node?.val;
      node = node!.next;
    }

    return str;
  }
}

const cups = '598162734';
const cupList = new CupList();
cupList.parseCups(cups);

let idx = 0;

for (let i = 0; i < 100; i++) {
  cupList.moveCups(idx);

  idx = 1;
}

console.log(cupList.getAfter(1));
