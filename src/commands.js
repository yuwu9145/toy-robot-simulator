'use strict'

/**
 * 
 * place the robot on the table
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} f 
 * @param {*} robot 
 */
export const place = (x,y,f,robot) => {

  if (typeof x !== 'number') {
    throw new Error('"x" must be a number.');
  }

  if (typeof y !== 'number') {
    throw new Error('"y" must be a number.');
  }

  if (typeof f !== 'string') {
    throw new Error('"f" must be a string.');
  }

  robot.x = x;
  robot.y = y;
  robot.f = f;
}

/**
 * Move the robot
 * 
 * @param {*} robot 
 */
export const move = (robot) => {
  switch (robot.f) {
    case 'NORTH':
      robot.y++;
      break;
    case 'EAST':
      robot.x++;
      break;
    case 'SOUTH':
      robot.y--;
      break;
    case 'WEST':
      robot.x--;
      break;
  }
}


/**
 *
 * Rotate the robot counterclockwise
 * 
 * @param {*} robot 
 */
export const left = (robot) => {
  switch (robot.f) {
    case 'NORTH':
      robot.f = 'WEST';
      break;
    case 'EAST':
      robot.f = 'NORTH';
      break;
    case 'SOUTH':
      robot.f = 'EAST';
      break;
    case 'WEST':
      robot.f = 'SOUTH';
      break;
  }
}

/**
 *
 * Rotate the robot clockwise
 * 
 * @param {*} robot 
 */
export const right = (robot) => {
  switch (robot.f) {
    case 'NORTH':
      robot.f = 'EAST';
      break;
    case 'EAST':
      robot.f = 'SOUTH';
      break;
    case 'SOUTH':
      robot.f = 'WEST';
      break;
    case 'WEST':
      robot.f = 'NORTH';
      break;
  }
}

/**
 * 
 * @param {*} robot 
 */
export const report = (robot) => `${robot.x},${robot.y},${robot.f}`;