const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2 /* s1, s2 */) {
  //throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here
  /*  let counter = 0;
  [...s1].forEach(v => {
    if (s2.includes(v)) {
      counter++;
      s2 = s2.replace(v, "");
    }
  });
  return counter; */
  return [...s1].reduce((p,c)=>(s2.includes(c)?(s2=s2.replace(c,""),++p):p), 0);
}

module.exports = {
  getCommonCharacterCount,
};
