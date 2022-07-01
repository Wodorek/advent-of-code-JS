import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

interface IComputers {
  [key: string]: Computer;
}

class Computer {
  internals: VM;
  queue: number[] = [];
  awaitingPacket: number[] = [];
  id: number;
  outputs: number = 0;
  isIdle: boolean = false;

  constructor(id: number) {
    this.internals = new VM(inputArr);
    this.queue.push(id);
    this.id = id;
  }

  tick() {
    let input = -1;

    if (!isNaN(this.queue[0])) {
      input = this.queue[0];
    }

    this.internals.executeInstruction(input);

    if (this.internals.lastCommand === 3) {
      if (this.queue.length > 0) {
        this.isIdle = false;
        this.queue.shift()!;
      } else {
        this.isIdle = true;
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

class NAT {
  packet: number[] = [];

  constructor() {}

  checkComputersStatus(computers: IComputers) {
    let isIdle = true;

    Object.keys(computers).forEach((comp) => {
      if (!computers[comp].isIdle) {
        isIdle = false;
      }
    });

    return isIdle;
  }
}

class Network {
  computers: IComputers = {};
  online = true;
  monitoring: NAT = new NAT();
  lastNATpacket = -1;

  constructor() {
    for (let i = 0; i < 50; i++) {
      this.computers[i] = new Computer(i);
    }
  }

  tick() {
    const allComputers = Object.keys(this.computers);

    const networkIdle = this.monitoring.checkComputersStatus(this.computers);

    if (networkIdle) {
      this.computers[0].queue.push(...this.monitoring.packet);
      this.monitoring.packet = [];
      this.computers[0].isIdle = false;
    } else {
      allComputers.forEach((comp) => {
        const packet = this.computers[comp as any].tick();

        if (packet !== -1) {
          const [to, x, y] = packet;

          if (to === 255) {
            this.monitoring.packet = [x, y];
            if (this.lastNATpacket === y) {
              console.log(`double packet found: ${y}`);
              this.online = false;
              return;
            }
            this.lastNATpacket = y;
          } else {
            this.computers[to].queue.push(x, y);
          }
        }
      });
    }
  }
}

const network = new Network();

while (network.online) {
  network.tick();
}
