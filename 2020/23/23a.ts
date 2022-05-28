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

const initialCups = '389125467';

const cupList = new CupList();
cupList.parseCups(initialCups);
console.log(cupList);
