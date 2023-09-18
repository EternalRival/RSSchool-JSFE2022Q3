const { NotImplementedError } = require("../extensions/index.js");

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names /* names */) {
  //throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here
  function countEquals(str, arr) {
    let counter = 0;
    for (const element of arr) if (str == element) counter++;
    return counter;
  }
  return names.reduce((p, c, i, a) => {
    p.push(p.includes(c) ? `${c}(${countEquals(c, a.slice(0, i)) || 1})` : c);
    return p;
  }, []);
  /* return names.reduce((p, c, i, a) => {
    const sliced = a.slice(0, i);
    if (p.includes(c)) p.push(`${c}(${countDuplicates(c, sliced) || 1})`);
    else p.push(c);

    return p;
  }, []); */

  /* const result = [];
  names.forEach((name, i) => {
    const cond1 = names.slice(0, i).includes(name);
    const cond2 = result.includes(name);
    if (cond1 || cond2) result.push(`${name}(${1})`);
    else result.push(name);
    console.log(result);
  }); 
  result;*/

  /* return names.map(function(name, i, arr) {
    console.log(this)
    if (names.slice(0, i).includes(name)) {
      return name + "(" + 1 + ")";
    }
    return name
  },names); */
}

module.exports = {
  renameFiles,
};
