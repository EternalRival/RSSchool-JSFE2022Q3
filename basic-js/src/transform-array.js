const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr /* arr */) {
  /* throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here */
  if (!Array.isArray(arr))
    throw new Error("'arr' parameter must be an instance of the Array!");

  arr = [...arr];
  const controlSequences = [
    "--discard-next",
    "--discard-prev",
    "--double-next",
    "--double-prev",
  ];

  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case controlSequences[0]:
        if (arr[i + 1]) arr.splice(i + 1, 1);
        break;
      case controlSequences[1]:
        if (arr[i - 1]) arr.splice(i - 1, 1);
        break;
      case controlSequences[2]:
        if (arr[i + 1]) arr[i] = arr[i + 1];
        break;
      case controlSequences[3]:
        if (arr[i - 1]) arr[i] = arr[i - 1];
        break;
    }
  }

  return arr.filter(v => !controlSequences.includes(v));
}

module.exports = {
  transform,
};
