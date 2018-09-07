'use strict'

import * as chai from 'chai';

import * as commands from '../src/commands';
import { Robot } from '../src/models/robot';

chai.should();

const expect = chai.expect;

describe('Commands', () => {
  
  describe('Function: place', () => {

    let robot;

    beforeEach(() => {
      // create a robot
      robot = new Robot(0,0,'NORTH');
    });

    it('set robot to x=1,y=1,f=SOUTH', () => {

      // place the robot on x:1 y:1 f:SOUTH
      commands.place(1,1,'SOUTH',robot);
      robot.x.should.equal(1);
      robot.y.should.equal(1);
      robot.f.should.equal('SOUTH');
    });

    it('parameter x only accepts numerical value', () => {
      expect(() => commands.place('random',1,'SOUTH',robot)).to.throw('"x" must be a number.');
    });

    it('parameter y only accepts numerical value', () => {
      expect(() => commands.place(1,'random','SOUTH',robot)).to.throw('"y" must be a number.');
    });

    it('parameter f only accepts numerical value', () => {
      expect(() => commands.place(1,1,1,robot)).to.throw('"f" must be a string.');
    });

  });

  describe('Function: move', () => {

    it('move robot up when the robot is placed on x=1,y=1,f=NORTH', () => {

      const robot = new Robot(1,1,'NORTH',robot);

      commands.move(robot);

      robot.x.should.equal(1);
      robot.y.should.equal(2);
      robot.f.should.equal('NORTH');
    });

    it('move robot right when the robot is placed on x=1,y=1,f=EAST', () => {

      const robot = new Robot(1,1,'EAST',robot);

      commands.move(robot);

      robot.x.should.equal(2);
      robot.y.should.equal(1);
      robot.f.should.equal('EAST');
    });

    it('move robot down when the robot is placed on x=1,y=1,f=SOUTH', () => {

      const robot = new Robot(1,1,'SOUTH',robot);

      commands.move(robot);

      robot.x.should.equal(1);
      robot.y.should.equal(0);
      robot.f.should.equal('SOUTH');
    });

    it('move robot to left when the robot is placed on x=1,y=1,f=WEST', () => {

      const robot = new Robot(1,1,'WEST',robot);

      commands.move(robot);

      robot.x.should.equal(0);
      robot.y.should.equal(1);
      robot.f.should.equal('WEST');
    });

  });

  describe('Function: left', () => {

    it('rotate robot to face WEST when the robot is faceing NORTH', () => {

      const robot = new Robot(0,0,'NORTH');

      commands.left(robot);

      robot.f.should.equal('WEST');
    });

    it('rotate robot to face SOUTH when the robot is faceing WEST', () => {

      const robot = new Robot(0,0,'WEST');

      commands.left(robot);

      robot.f.should.equal('SOUTH');
    });

    it('rotate robot to face EAST when the robot is faceing SOUTH', () => {

      const robot = new Robot(0,0,'SOUTH');

      commands.left(robot);

      robot.f.should.equal('EAST');
    });

    it('rotate robot to face NORTH when the robot is faceing EAST', () => {

      const robot = new Robot(0,0,'EAST');

      commands.left(robot);

      robot.f.should.equal('NORTH');
    });

  });

  describe('Function: right', () => {

    it('rotate robot to face EAST when the robot is faceing NORTH', () => {

      const robot = new Robot(0,0,'NORTH');

      commands.right(robot);

      robot.f.should.equal('EAST');
    });

    it('rotate robot to face NORTH when the robot is faceing WEST', () => {

      const robot = new Robot(0,0,'WEST');

      commands.right(robot);

      robot.f.should.equal('NORTH');
    });

    it('rotate robot to face WEST when the robot is faceing SOUTH', () => {

      const robot = new Robot(0,0,'SOUTH');

      commands.right(robot);

      robot.f.should.equal('WEST');
    });

    it('rotate robot to face SOUTH when the robot is faceing EAST', () => {

      const robot = new Robot(0,0,'EAST');

      commands.right(robot);

      robot.f.should.equal('SOUTH');
    });

  });

  describe('Function: report', () => {

    it('returns robot location and direction in correct format', () => {

      const robot = new Robot(0,0,'NORTH');

      commands.report(robot).should.equal('0,0,NORTH');
    });

  });

  
});