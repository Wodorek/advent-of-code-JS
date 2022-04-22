import input from './input';

import prepareInput from './helpers/prepareInput';
import permute from './helpers/permute';
import { VM } from '../computer/VM';

const inputArr = prepareInput(input);

const phases = [5, 6, 7, 8, 9];

const permutations = permute(phases);

let maxThrust = -Infinity;

permutations.forEach((permutation) => {
  const machines = {
    vmA: {
      machine: new VM(inputArr),
      inputs: [permutation[0], 0],
    },
    vmB: {
      machine: new VM(inputArr),
      inputs: [permutation[1]],
    },
    vmC: {
      machine: new VM(inputArr),
      inputs: [permutation[2]],
    },
    vmD: {
      machine: new VM(inputArr),
      inputs: [permutation[3]],
    },
    vmE: {
      machine: new VM(inputArr),
      inputs: [permutation[4]],
    },
  };

  type MachineKey = keyof typeof machines;

  let currMachine: MachineKey = 'vmA';

  function advanceMachine(currMachine: MachineKey): MachineKey {
    const machinesOrder: MachineKey[] = ['vmA', 'vmB', 'vmC', 'vmD', 'vmE'];

    const machineIndex = machinesOrder.indexOf(currMachine);

    if (machineIndex === 4) {
      return machinesOrder[0];
    } else {
      return machinesOrder[machineIndex + 1];
    }
  }

  while (true) {
    const workingMachine = machines[currMachine];

    workingMachine.machine.executeInstruction(
      workingMachine.inputs[workingMachine.machine.inputIdx]
    );

    if (workingMachine.machine.lastCommand === 3) {
      workingMachine.machine.inputIdx++;
    }

    if (workingMachine.machine.lastCommand === 4) {
      machines[advanceMachine(currMachine)].inputs.push(
        workingMachine.machine.getLastOutput
      );
      currMachine = advanceMachine(currMachine);
    }

    if (!workingMachine.machine.working) {
      break;
    }
  }

  maxThrust = Math.max(
    maxThrust,
    machines[currMachine].inputs[machines[currMachine].inputs.length - 1]
  );
});

console.log(maxThrust);
