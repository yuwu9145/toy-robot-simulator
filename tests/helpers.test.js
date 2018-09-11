'use strict'

import * as chai from 'chai';

import * as helpers from '../src/helpers';

import { Robot } from '../src/models/robot';

chai.should();

const expect = chai.expect;

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

  describe('Function: isCommandInvalid', () => {

    it('returns true if the command is MOVE', () => {
      helpers.isCommandInvalid('MOVE').should.equal(true);
    });

    it('returns true if the command is LEFT', () => {
      helpers.isCommandInvalid('LEFT').should.equal(true);
    });

    it('returns true if the command is RIGHT', () => {
      helpers.isCommandInvalid('RIGHT').should.equal(true);
    });

    it('returns true if the command is REPORT', () => {
      helpers.isCommandInvalid('REPORT').should.equal(true);
    });

    it('returns true if the command is PLACE 0,0,NORTH', () => {
      helpers.isCommandInvalid('PLACE 0,0,NORTH').should.equal(true);
    });

    it('returns false if the command is PLACE', () => {
      helpers.isCommandInvalid('PLACE').should.equal(false);
    });

    it('returns false if the command is PLACE 0', () => {
      helpers.isCommandInvalid('PLACE 0').should.equal(false);
    });

    it('returns false if the command is PLACE 0,0', () => {
      helpers.isCommandInvalid('PLACE 0,0').should.equal(false);
    });

    it('returns false if the command is PLACE NORTH', () => {
      helpers.isCommandInvalid('PLACE NORTH').should.equal(false);
    });

    it('returns false if the command is AAAA', () => {
      helpers.isCommandInvalid('AAAA').should.equal(false);
    });

  });

  describe('Function: getArgsFromPlaceCommand', () => {

    it('returns {x:0,y:0,f:\'NORTH\'} if the command is PLACE 0,0,NORTH', () => {
      expect(helpers.getArgsFromPlaceCommand('PLACE 0,0,NORTH')).to.deep.equal({x:0,y:0,f:'NORTH'});
    });

    it('returns false if the command is PLACE 0', () => {
      helpers.getArgsFromPlaceCommand('PLACE 0').should.equal(false);
    });

    it('returns false if the command is PLACE 0,0', () => {
      helpers.getArgsFromPlaceCommand('PLACE 0,0').should.equal(false);
    });

    it('returns false if the command is PLACE NORTH', () => {
      helpers.getArgsFromPlaceCommand('PLACE NORTH').should.equal(false);
    });

    it('returns false if the command is MOVE', () => {
      helpers.getArgsFromPlaceCommand('MOVE').should.equal(false);
    });

  });

  
});