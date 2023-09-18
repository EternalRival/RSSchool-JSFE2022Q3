const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr /* arr */, depth = 0) {
    /* throw new NotImplementedError("Not implemented"); */
    // remove line with error and write your code here
    arr = arr.filter(v => Array.isArray(v));
    if (arr.length) {
      arr = arr.flat();
      return this.calculateDepth(arr, ++depth);
    }
    return ++depth;
  }
}

module.exports = {
  DepthCalculator,
};
