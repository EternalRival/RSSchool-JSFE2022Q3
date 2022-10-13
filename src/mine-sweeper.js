const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix /* matrix */) {
  //throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here
  const result = Array.from(Array(matrix.length), () =>
    Array.from(Array(matrix[0].length), () => 0)
  );
  const cLength = matrix.length;
  const rLength = matrix[0].length;

  for (let i = 0; i < cLength; i++) {
    for (let j = 0; j < rLength; j++) {
      if (matrix[i][j]) {
        place(i - 1, j - 1);
        place(i - 1, j);
        place(i - 1, j + 1);
        place(i, j - 1);
        place(i, j + 1);
        place(i + 1, j - 1);
        place(i + 1, j);
        place(i + 1, j + 1);
      }
    }
  }

  function place(i, j) {
    if (i >= 0 && i < cLength && j >= 0 && j < rLength) result[i][j]++;
  }

  return result;
}

module.exports = {
  minesweeper,
};
