import { VM } from './VM';
import prepareDay2Input from '../02/helpers/prepareInput';
import day2Input from '../02/input';
import prepareDay5Input from '../05/helpers/prepareInput';
import day5Input from '../05/input';
import prepareDay7Input from '../07/helpers/prepareInput';
import day7Input from '../07/input';
import permute from '../07/helpers/permute';

describe('Works for day 2', () => {
  let input: number[] = [];

  beforeEach(() => {
    input = prepareDay2Input(day2Input);
  });

  it('Works for part 1', () => {
    input[1] = 12;
    input[2] = 2;

    const vm = new VM(input);

    while (vm.working) {
      vm.executeInstruction();
    }

    expect(vm.memory[0]).toBe(3306701);
  });

  it('Works for part 2', () => {
    function testNounVerb(noun: number, verb: number) {
      const memory = input.map((el) => el);
      memory[1] = noun;
      memory[2] = verb;

      const vm = new VM(memory);

      while (vm.working) {
        vm.executeInstruction();
      }

      return vm.memory[0];
    }

    let solution = 0;

    for (let noun = 0; noun < 99; noun++) {
      for (let verb = 0; verb < 99; verb++) {
        const value = testNounVerb(noun, verb);

        if (value === 19690720) {
          solution = 100 * noun + verb;
          break;
        }
      }
    }

    expect(solution).toBe(7621);
  });
});

describe('Works for day 5', () => {
  let input: number[] = [];

  beforeEach(() => {
    input = prepareDay5Input(day5Input);
  });

  it('Works for part 1', () => {
    const vm = new VM(input);

    while (vm.working) {
      vm.executeInstruction(1);
    }

    expect(vm.getLastOutput).toBe(12896948);
  });

  it('Works for part 2', () => {
    const vm = new VM(input);

    while (vm.working) {
      vm.executeInstruction(5);
    }

    expect(vm.getLastOutput).toBe(7704130);
  });
});

describe('Works for day 7', () => {
  let input: number[] = [];

  beforeEach(() => {
    input = prepareDay7Input(day7Input);
  });

  it('Works for part 1', () => {
    const phases = [0, 1, 2, 3, 4];

    let permutations = permute(phases);

    const maxOutputs: number[] = [];

    permutations.forEach((permutation) => {
      const outputs: number[] = [0];

      permutation.forEach((phase, idx) => {
        const inputs = [phase, outputs[idx]];

        const vm = new VM(input);

        while (vm.working) {
          vm.executeInstruction(inputs[vm.inputIdx]);

          if (vm.lastCommand === 3 || vm.inputIdx === 0) {
            vm.inputIdx++;
          }

          if (vm.lastCommand === 4) {
            outputs.push(vm.getLastOutput);
            break;
          }
        }
      });
      maxOutputs.push(outputs[outputs.length - 1]);
    });

    expect(Math.max(...maxOutputs)).toBe(398674);
  });
});