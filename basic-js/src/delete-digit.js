const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n /* n */) {
  //throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here
  n = `${n}`;
  const results = [];
  for (const i in n) {
    const arr = [...n];
    arr.splice(i, 1);
    results.push(+arr.join(''));
  }
  return Math.max(...results)
}

module.exports = {
  deleteDigit,
};
