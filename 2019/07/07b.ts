import input from './input';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import permute from './helpers/permute';

const inputArr = prepareInput(input);

const permutations = permute(inputArr);

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

  function advanceMachine(currMachine: MachineKey): MachineKey {
    const machinesOrder: MachineKey[] = ['vmA', 'vmB', 'vmC', 'vmD', 'vmE'];

    const machineIndex = machinesOrder.indexOf(currMachine);

    if (machineIndex === 4) {
      return machinesOrder[0];
    } else {
      return machinesOrder[machineIndex + 1];
    }
  }

  let currMachine: MachineKey = 'vmA';

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

  const thrust = machines[currMachine].machine.getLastOutput;

  if (maxThrust < thrust) {
    maxThrust = thrust;
  }
});

console.log(maxThrust);
