'use strict'

const fs = require('fs');

import * as chai from 'chai';
import * as sinon from 'sinon';
const assert = require('assert');

import { runCommand, readCommandsExecute, run } from '../src/app';
import { Robot } from '../src/models/robot';
import * as helpers from '../src/helpers';
import * as constants from '../src/constants';

chai.should();

const expect = chai.expect;

describe('App', () => {

  describe('Function: runCommand', () => {

    let robot;

    beforeEach(() => {
      // create a robot
      robot = new Robot(0,0,'NORTH');
    });

    it('ignore any other commands until a PALCE command is executed', () => {

      robot = runCommand(constants.COMMAND_MOVE, robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('NORTH');

      robot = runCommand(constants.COMMAND_LEFT, robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('NORTH');

      robot = runCommand(constants.COMMAND_RIGHT, robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('NORTH');

    });

    it('place robot to 2,2,SOUTH', () => {

      // place the robot on x:2 y:2 f:SOUTH
      robot = runCommand('PLACE 2,2,SOUTH', robot);
      robot.x.should.equal(2);
      robot.y.should.equal(2);
      robot.f.should.equal('SOUTH');
    });

    it('move robot to 0,1,NORTH', () => {

      robot = runCommand('MOVE', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(1);
      robot.f.should.equal('NORTH');
    });

    it('rotate robot 90 degrees counterclockwise', () => {

      robot = runCommand('LEFT', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('WEST');
    });

    it('rotate robot 90 degrees clockwise', () => {

      robot = runCommand('RIGHT', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('EAST');
    });

    it('print robot location and direction in console', () => {

      const spy = sinon.spy(console, 'log');

      robot = runCommand('REPORT', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('NORTH');
      assert(spy.calledWith('0,0,NORTH'));
      spy.restore();
    });

    it('cannot move robot when robot is on top of the table and face NORTH', () => {

      robot = new Robot(0,4,'NORTH');

      robot = runCommand('MOVE', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(4);
      robot.f.should.equal('NORTH');
    });

    it('cannot move robot when robot is on right of the table and face EAST', () => {

      robot = new Robot(4,0,'EAST');

      robot = runCommand('MOVE', robot);
      robot.x.should.equal(4);
      robot.y.should.equal(0);
      robot.f.should.equal('EAST');
    });

    it('cannot move robot when robot is on bottom of the table and face SOUTH', () => {

      robot = new Robot(0,0,'SOUTH');

      robot = runCommand('MOVE', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('SOUTH');
    });

    it('cannot move robot when robot is on left of the table and face WEST', () => {

      robot = new Robot(0,0,'WEST');

      robot = runCommand('MOVE', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('WEST');
    });

    it('cannot place the robot when intended location is outside the table', () => {

      // below table
      robot = runCommand('PLACE 0,-1,NORTH', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('NORTH');

      // right to table
      robot = runCommand('PLACE 5,0,NORTH', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('NORTH');

      // above the table
      robot = runCommand('PLACE 0,5,NORTH', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('NORTH');

      // left to the table
      robot = runCommand('PLACE -1,0,NORTH', robot);
      robot.x.should.equal(0);
      robot.y.should.equal(0);
      robot.f.should.equal('NORTH');
    });

    it('ignore any other commands and throw error', () => {
      expect(() => runCommand('AAAAAA', robot)).to.throw(constants.INVALID_COMMAND_ERROR);
    });

    it('prints out invalid command message', () => {
      sinon.stub(helpers,'getArgsFromPlaceCommand').onFirstCall().returns(undefined);
      expect(() => runCommand('PLACE -1,0,NORTH', robot)).to.throw(constants.INVALID_COMMAND_ERROR);
      helpers.getArgsFromPlaceCommand.restore();
    });

  });

  describe('Function: run', () => {

    let consoleSpy;

    beforeEach(() => {
      consoleSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
      consoleSpy.restore();
    })

    it('executes all commands', () => {
      const commands = ["PLACE 0,0,NORTH","MOVE","REPORT"];
      run(commands);
      assert(consoleSpy.calledWith('0,1,NORTH'));
    });

    it('prints out invalid command message', () => {
      const commands = ["INVALID_COMMAND","MOVE","REPORT"];
      run(commands);
      assert(consoleSpy.calledWith(constants.INVALID_COMMAND_ERROR));
    });

  });

  describe('Function: readCommandsExecute', () => {

    let fullPath = '';
    let robot;
    let consoleSpy;

    beforeEach(() => {
      // create a robot
      robot = new Robot(0,0,'NORTH');
      
      fullPath = 'foo.js';
      consoleSpy = sinon.spy(console, 'log');

      sinon.stub(fs,'readFileSync')
      .withArgs(fullPath, 'utf8')
      .onFirstCall()
      .returns(`["PLACE 0,0,NORTH","MOVE","REPORT"]`);
    });

    afterEach(() => {
      fs.readFileSync.restore();
      consoleSpy.restore();
    })

    it('read command sequence and call run function', () => {

      readCommandsExecute(fullPath,robot);
      assert(consoleSpy.calledWith('0,1,NORTH'));
    });

    it('print error message when input file content is invalid', () => {
      
      sinon.stub(JSON,'parse').withArgs(`["PLACE 0,0,NORTH","MOVE","T"]`).onFirstCall().throws('Invlid JSON');
      readCommandsExecute(fullPath,robot);
      assert(consoleSpy.calledWith(constants.INVALID_FILE_INPUT_ERROR));
      JSON.parse.restore();
    });

  });
});