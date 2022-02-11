import input from './input';

import prepareInput from './helpers/prepareInput';

let [players, marbles] = prepareInput(input);

// making me use a linked list :(
class Node {
  prev: Node;
  next: Node;
  data: number;
  private list: List;

  constructor(data: number, list: List) {
    this.data = data;
    this.list = list;
    this.next = this;
    this.prev = this;
  }

  add(num: number) {
    let node = new Node(num, this.list);

    if (this.list.length == 1) {
      this.next = node;
      this.prev = node;
      node.next = this;
      node.prev = this;
    } else {
      let next = this.next;
      node.prev = this;
      next.prev = node;
      node.next = next;
      this.next = node;
    }

    this.list.length++;

    return node;
  }

  remove() {
    let prev = this.prev;
    let next = this.next;
    prev.next = next;
    next.prev = prev;
    return this.data;
  }
}

class List {
  head: Node;
  length: number;

  constructor() {
    this.length = 0;
    this.head = new Node(0, this);
  }

  add(num: number) {
    this.head = new Node(num, this);
    this.head.prev = this.head;
    this.head.next = this.head;
    this.length++;

    return this.head;
  }
}

const simulate = (playerCount: number, points: number) => {
  let circle = new List();
  let players = new Array(playerCount).fill(0);
  let currentPlayer = 0;
  let currentMarble = circle.add(0);

  for (let i = 1; i <= points; i++) {
    if (i % 23 == 0) {
      players[currentPlayer] += i;
      currentMarble = currentMarble.prev.prev.prev.prev.prev.prev;
      players[currentPlayer] += currentMarble.prev.remove();
    } else {
      currentMarble = currentMarble.next.add(i);
    }

    currentPlayer++;
    currentPlayer %= playerCount;
  }

  return players.reduce((acc, x) => (x > acc ? x : acc), 0);
};

console.log(simulate(players, marbles * 100));
