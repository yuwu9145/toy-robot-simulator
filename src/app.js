'use strict';

import * as fs from 'fs';

import {Robot} from './models/robot';
import * as constants from './constants';
import * as commands from './commands';
import * as helpers from './helpers';

// initialise robot default at 0,0 and face north
export let robot = new Robot(0,0,constants.FACE_NORTH);

let placeExecuted = false;

/**
 * Excute a given command to change robot state
 * @param {*} command 
 * @param {*} robot 
 * @return {robot} robot instance after excuting a command
 */
export const runCommand = (command, robot) => {

  // make a copy of passed in robot class intance
  const rollBackRobot = Object.assign({}, robot);
  Object.setPrototypeOf(rollBackRobot, Robot.prototype);

  if (!helpers.isCommandInvalid(command)) {
    throw new Error(constants.INVALID_COMMAND_ERROR);
  }

  if(command.includes(constants.COMMAND_PLACE)) {
    // PLACE command
    const placeArgs = helpers.getArgsFromPlaceCommand(command);
    if (placeArgs) {
      commands.place(placeArgs.x,placeArgs.y,placeArgs.f,robot);
      if(helpers.positionCheck(robot)) {
        placeExecuted = true;
      }
    } else {
      throw new Error(constants.INVALID_COMMAND_ERROR);
    }
  } else if(command === constants.COMMAND_MOVE && placeExecuted) {
    // MOVE command
    commands.move(robot);
  } else if(command === constants.COMMAND_LEFT && placeExecuted) {
    // LEFT command
    commands.left(robot);
  } else if(command === constants.COMMAND_RIGHT && placeExecuted) {
    // RIGHT command
    commands.right(robot);
  } else if(command === constants.COMMAND_REPORT && placeExecuted) {
    // REPORT command
    console.log(commands.report(robot));
  }

  if (placeExecuted && !helpers.positionCheck(robot)) {
    return rollBackRobot;
  } else {
    return robot;
  }
}

/**
 * 
 * @param {array} commands in sequence 
 */
export const run = (commands) => commands.forEach(command => {
  try {
    robot = runCommand(command, robot)
  } catch(e) {
    console.log(constants.INVALID_COMMAND_ERROR);
  }
});

const readCommandsExcute = (filePath, robot) => {
  const content = fs.readFileSync(filePath, 'utf8');
  try {
    const commandsToExcute = JSON.parse(content);
    run(commandsToExcute, robot);
  } catch (e) {
    console.log(constants.INVALID_FILE_INPUT_ERROR);
  }
}

if (process.env.NODE_ENV !== 'testing') {
  if (process.argv[2]) {
    readCommandsExcute(process.argv[2],robot);
  } else {
    console.log(`Invalid file: ${process.argv[2]} has been provided.`);
  }
}


