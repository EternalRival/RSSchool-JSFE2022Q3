const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
function countCats(backyard /* matrix */) {
  /* throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here */

  let catsNumber = 0;
  for (const row of backyard) {
    for (const spot of row) {
      if (spot == "^^") catsNumber++;
    }
  }
  return catsNumber;

  /* то же самое ниндзякодом через редьюсы, кек
  return backyard.reduce((p, c)=>p+c.reduce((p,c)=>(c=="^^"?++p:p),0),0)
  */
}

module.exports = {
  countCats,
};
/* cdebug 1 > [Arguments] {
  '0': [ [ '##', 'dd', '00' ], [ '^^', '..', 'ss' ], [ 'AA', 'dd', 'Oo' ] ]
}
      1) level 0.1
*/
/* cdebug 2 > [Arguments] {
  '0': [ [ '##', 'dd', '00' ], [ '^ ^', '..', 'ss' ], [ 'AA', 'dd', 'Oo' ] ]
}
      2) level 0.2
       */
/* cdebug 3 > [Arguments] {
  '0': [
    [ '##', 'dd', '00' ],
    [ ' ^^ ', '..', 'ss' ],
    [ 'AA', 'dd', 'Oo' ]
  ]
}
3) level 0.3
       */
/* cdebug 4 > [Arguments] {
  '0': [ [ '##', 'dd', '00' ], [ '^', '^', 'ss' ], [ 'AA', 'dd', 'Oo' ] ]
}
4) level 0.4 */
/* cdebug 5 > [Arguments] { '0': [] }
5) level 0.5 */
/* cdebug 6 > [Arguments] {
  '0': [
    [
      '^^',     '.',
      null,     0,
      false,    '',
      NaN,      '^^',
      2,        true,
      'dasdas', 1
    ],
    [
      2,    null,
      0,    1,
      '.',  'dasdas',
      true, NaN,
      '',   false,
      '^^', '^^'
    ],
    [
      false,    '.',
      1,        0,
      '^^',     null,
      '',       2,
      'dasdas', '^^',
      NaN,      true
    ],
    [
      '.',  false,
      1,    null,
      NaN,  2,
      0,    'dasdas',
      true, '^^',
      '',   '^^'
    ],
    [
      false, '.',
      1,     0,
      '^^',  true,
      null,  '^^',
      '',    NaN,
      2,     'dasdas'
    ],
    [
      false,    NaN,
      1,        0,
      '.',      '^^',
      null,     true,
      'dasdas', '^^',
      2,        ''
    ],
    [
      null,     1,
      NaN,      true,
      '.',      '^^',
      '^^',     2,
      '',       false,
      'dasdas', 0
    ],
    [
      null,     NaN,
      '',       false,
      '.',      1,
      0,        '^^',
      'dasdas', true,
      2,        '^^'
    ]
  ]
}
6) level 1 */
/* cdebug 7 > [Arguments] {
  '0': [
    [
      '^^',  '.',
      null,  0,
      false, '',
      NaN,   2,
      true,  'dasdas',
      1
    ],
    [ 2, NaN, '', false, '^^', '^^' ],
    [
      false,    '.',
      1,        0,
      '^^',     null,
      '',       2,
      'dasdas', '^^',
      NaN,      true
    ],
    [ '.' ],
    [
      false, '.',
      1,     0,
      '^^',  true,
      null,  '^^',
      '',    NaN,
      2,     'dasdas'
    ],
    [ false, NaN, 1, 0, '.', '^^' ],
    [ null, 1, NaN ],
    []
  ]
}
7) level 2 */
/* cdebug 8 > [Arguments] {
  '0': [ [ 54, 3, '^^' ], [ 'aa', 'aa', 'aa' ], [ 2, false, '^^' ] ]
}
      8) level 3
*/
