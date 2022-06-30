import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

class Computer {
  internals: VM;
  queue: number[] = [];
  awaitingPacket: number[] = [];
  id: number;
  outputs: number = 0;

  constructor(id: number) {
    this.internals = new VM(inputArr);
    this.queue.push(id);
    this.id = id;
  }

  tick() {
    let input = -1;

    // zero is falsy...
    if (!isNaN(this.queue[0])) {
      input = this.queue[0];
    }

    console.log(input);

    this.internals.executeInstruction(input);

    if (this.internals.lastCommand === 3) {
      if (this.queue.length > 0) {
        this.queue.shift()!;
      }
    }

    if (this.internals.lastCommand === 4) {
      if (this.internals.outputs.length === 3) {
        const packet = this.internals.outputs.map((el) => el);
        this.internals.outputs = [];
        return packet;
      }
    }

    return -1;
  }
}

class Network {
  computers: { [key: number]: Computer } = {};
  online = true;
  constructor() {
    for (let i = 0; i < 50; i++) {
      this.computers[i] = new Computer(i);
    }
  }

  tick() {
    const allComputers = Object.keys(this.computers);

    allComputers.forEach((comp) => {
      const packet = this.computers[comp as any].tick();

      if (packet !== -1) {
        const [to, x, y] = packet;

        if (to === 255) {
          console.log(`you are looking for${x}`);
        }

        this.computers[to].queue.push(x, y);
      }
    });
  }
}

const network = new Network();

while (network.online) {
  network.tick();
}

Object.keys(network.computers).forEach((co) => {
  if (network.computers[co as any].queue.length > 0) {
    console.log(co);
    console.log(network.computers[co as any]);
  }
});
