'use strict'

import * as chai from 'chai';
import * as sinon from 'sinon';
const assert = require('assert');

import { runCommand } from '../src/app';
import { Robot } from '../src/models/robot';
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
      expect(() => runCommand('AAAAAA', robot)).to.throw('invalid command');
    });

  });
});