class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  head: ListNode | null = null;

  addNode(val: number) {
    if (!this.head) {
      this.head = new ListNode(val);
    } else {
      const temp = this.head;
      const node = new ListNode(val);
      this.head = node;
      node.next = temp;
    }
  }
}

const list = new LinkedList();
list.addNode(1);
list.addNode(2);
list.addNode(3);
list.addNode(4);
console.log(list);
