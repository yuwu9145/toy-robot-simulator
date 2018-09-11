'use strict';

import * as constants from './constants';

/**
 * check robot position is outside table
 * @param {*} robot 
 * @returns {boolean}
 */
export const positionCheck = (robot) => 
  (robot.x + 1) > 0 
  && (robot.x + 1) < constants.TABLE_WIDTH 
  && (robot.y + 1) > 0 
  && (robot.y + 1 < constants.TABLE_HEIGHT)

/**
 * 
 * @param {string} command 
 */
export const isCommandInvalid = (command) => {
  
  const validOneWordCommands = [
    constants.COMMAND_MOVE,
    constants.COMMAND_LEFT,
    constants.COMMAND_RIGHT,
    constants.COMMAND_REPORT];

  if (validOneWordCommands.some(validCommand => validCommand === command)) {
    return true;
  }

  if (command.includes(constants.COMMAND_PLACE)) {
    // place command
    return getArgsFromPlaceCommand(command) ? true : false;
  }

  return false;
};

/**
 * Extracts args detail from PLACE command
 * @param {string} place command 
 * @return {any} any objec contains x,y,f. If any value is missing, then returns boolean false
 */
export const getArgsFromPlaceCommand = (command) => {
  
  let placeArgs;

  if(command.includes(constants.COMMAND_PLACE)) {
    // PLACE command
    const parts = command.split(' ');
    const args = parts[1] ? parts[1].split(',') : [];
    placeArgs = {
      x: parseInt(args[0]),
      y: parseInt(args[1]),
      f: args[2]
    };

    if (Number.isInteger(placeArgs.x) && Number.isInteger(placeArgs.y) && placeArgs.f) {
      return placeArgs;
    } else {
      return false;
    }

  } else {
    return false;
  }
}