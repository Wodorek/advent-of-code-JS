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
          console.log(`you are looking for ${y}`);
          this.online = false;
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
