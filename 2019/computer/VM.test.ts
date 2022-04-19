import { VM } from './VM';
import prepareDay2Input from '../02/helpers/prepareInput';
import day2Input from '../02/input';
import prepareDay5Input from '../05/helpers/prepareInput';
import day5Input from '../05/input';

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
