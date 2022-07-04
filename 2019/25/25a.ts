import input from './input';

import readline from 'readline';

import prepareInput from './helpers/prepareInput';
import { VM } from '../computer/VM';
import turnIntoCommand from './helpers/turnIntoCommand';

const inputArr = prepareInput(input);

const vm = new VM(inputArr);

function askQuestion(query: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

function runProgram(inputs: number[]) {
  let inputIdx = 0;
  vm.working = true;

  let row: string[] = [];

  while (vm.working) {
    vm.executeInstruction(inputs[inputIdx]);

    if (vm.lastCommand === 3) {
      inputIdx++;
    }

    if (vm.lastCommand === 4) {
      const output = vm.getLastOutput;

      if (output === 10) {
        console.log(row.join(''));
        if (row.join('') === 'Command?') {
          vm.working = false;
          break;
        }
        row = [];
      } else {
        row.push(String.fromCharCode(output));
      }
    }
  }
  (async () => {
    const ans = await askQuestion('');

    runProgram(turnIntoCommand(ans as string));
  })();
}

//monolith, ration, antenna, semiconductor
runProgram([]);
