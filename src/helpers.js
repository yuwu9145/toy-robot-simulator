'use strict';

import { TABLE_HEIGHT, TABLE_WIDTH } from './constants';

/**
 * 
 * check robot position is outside table
 * 
 * @param {*} robot 
 * @returns boolean
 */
export const positionCheck = (robot) => 
  (robot.x + 1) > 0 
  && (robot.x + 1) < TABLE_WIDTH 
  && (robot.y + 1) > 0 
  && (robot.y + 1 < TABLE_HEIGHT)