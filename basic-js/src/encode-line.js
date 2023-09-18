const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str /* str */) {
  //throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here
  /* return [...str].reduce((p, c) =>p.at(-1) && p.at(-1)[1] == c? [...p.slice(0, -1), [++p.at(-1)[0], p.at(-1)[1]]]: [...p, [1, c]],[]).flat().join("").replaceAll("1", ""); */
  const arr = [];
  [...str].forEach(v => {
    if (arr.at(-1)?.char == v) ++arr.at(-1).counter;
    else arr.push({ char: v, counter: 0 });
  });
  return arr.reduce((p, c) => p + (c.counter ? ++c.counter : "") + c.char, "");
}

module.exports = {
  encodeLine,
};
