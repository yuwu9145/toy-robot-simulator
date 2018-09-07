'use strict'

import * as chai from 'chai';

import { Robot } from './robot';

chai.should();

const expect = chai.expect;

describe('Class: Robot', () => {
  
  describe('#x', () => {
    let robot;

    beforeEach(() => {
      // create a robot
      robot = new Robot(0,0,'NORTH');
    });

    it('returns location x', () => {
      robot.x.should.equal(0);
    });

    it('can be changed', () => {
      // Assert that x can be changed
      robot.x = 1;
      robot.x.should.equal(1);
    });

    it('only accepts numerical values', () => {
      // Assert that an error will be thrown if
      // the x it set to a non-numerical value.
      expect(() => robot.x = 'random').to.throw('"x" must be a number.');
    });

  });

  describe('#y', () => {
    let robot;

    beforeEach(() => {
      // create a robot
      robot = new Robot(0,0,'NORTH');
    });

    it('returns location y', () => {
      robot.y.should.equal(0);
    });

    it('can be changed', () => {
      // Assert that y can be changed
      robot.y = 1;
      robot.y.should.equal(1);
    });

    it('only accepts numerical values', () => {
      // Assert that an error will be thrown if
      // the y it set to a non-numerical value.
      expect(() => robot.y = 'random').to.throw('"y" must be a number.');
    });

  });

  describe('#f', () => {
    let robot;

    beforeEach(() => {
      // create a robot
      robot = new Robot(0,0,'NORTH');
    });

    it('returns location f', () => {
      robot.f.should.equal('NORTH');
    });

    it('can be changed', () => {
      // Assert that f can be changed
      robot.f = 'SOUTH';
      robot.f.should.equal('SOUTH');
    });

    it('only accepts string values', () => {
      // Assert that an error will be thrown if
      // the f it set to a non-string value.
      expect(() => robot.f = 1).to.throw('"f" must be a string.');
    });

  });
});