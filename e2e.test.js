'use strict'

const nixt = require('nixt');
import * as fs from 'fs';
import * as chai from 'chai';

chai.should();

const expect = chai.expect;

const TEST_DATA_FILE = `${__dirname}/testData.e2e.json`;
const APP_INPUT_DATA_FILE = `${__dirname}/input.txt`;

function executeRunCommand(expected) {
  return new Promise(resolve => {
    nixt()
    .run('npm run --silent dev')
    .stdout(expected)
    .end(err => resolve(err));
  });
}


describe('Run application with test data', () => {

  it('should run each command sequence and check compare with expected output', async function () {
    this.timeout(5000);

    // get test data from json file
    const fileContent = fs.readFileSync(TEST_DATA_FILE, 'utf8');
    const testCases = JSON.parse(fileContent);
    
    for(const testCase of testCases) {
      console.log(`=============checking commands: [${testCase.commandSequence}] ===========`);
      const commandsToExcute = testCase.commandSequence;
      // write test command to app input data file
      fs.writeFileSync(APP_INPUT_DATA_FILE, JSON.stringify(commandsToExcute));
      const expectOutput = testCase.expected;

      const assertError = await executeRunCommand(expectOutput);
      
      if (assertError) {
        console.log(`---------command sequence: [${commandsToExcute}] failed---------`);
        console.log(assertError.message);
      }

      expect(assertError).to.be.undefined;
      
    }
  });
});
