'use strict'

import * as chai from 'chai';

import * as helpers from '../src/helpers';

import { Robot } from '../src/models/robot';

chai.should();

describe('Helpers', () => {
  
  describe('Function: positionCheck', () => {

    it('returns true if the robot is inside table', () => {
      // create robot at 0,0 which is inside table
      const robot = new Robot(0,0,'NORTH');
      helpers.positionCheck(robot).should.equal(true);
    });

    it('returns false if the robot is above table', () => {
      // create robot at 0,5 which is above table
      const robot = new Robot(0,5,'NORTH');
      helpers.positionCheck(robot).should.equal(false);
    });

    it('returns false if the robot is right to table', () => {
      // create robot at 5,0 which is right to table
      const robot = new Robot(5,0,'NORTH');
      helpers.positionCheck(robot).should.equal(false);
    });

    it('returns false if the robot is below table', () => {
      // create robot at 0,-1 which is below table
      const robot = new Robot(0,-1,'NORTH');
      helpers.positionCheck(robot).should.equal(false);
    });

    it('returns false if the robot is left to table', () => {
      // create robot at -1,0 which is left to table
      const robot = new Robot(-1,0,'NORTH');
      helpers.positionCheck(robot).should.equal(false);
    });

  });

  
});