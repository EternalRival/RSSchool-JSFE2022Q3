const { NotImplementedError } = require('../extensions/index.js');

/**
 * Calculate turns number and time (in seconds) required
 * to solve puzzle
 * 
 * @param {Number} disks number of disks
 * @param {Number} turnsSpeed speed (in turns/hour)
 * @return {Object} object with props turns (number of turns)
 * and seconds (time in seconds)
 *
 * @example
 * 
 * calculateHanoi(9, 4308) => { turns: 511, seconds: 427 }
 *
 */
function calculateHanoi(disks, turnsSpeed/* disksNumber, turnsSpeed */) {
  /* throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here */

  const turns = 2**disks-1
  const seconds = Math.floor(turns/(turnsSpeed/60/60))
  
  return {turns, seconds}
}

module.exports = {
  calculateHanoi
};

/*
*Implement the function calculateHanoi that accepts diskNumber and turnsSpeed parameters. 
*diskNumber is a number of disks
*turnsSpeed is the speed of moving discs (in turns per hour). Both parameters are numbers.

*calculateHanoi function returns an object with 2 properties:

*    turns (minimum number of turns to solve the puzzle)
*    seconds (minimum number of seconds to solve the puzzle at a given turnsSpeed, seconds must be an integer, obtained from rounded down (floor) calculation result)

 */