const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options /* str, options */) {
  /* throw new NotImplementedError('Not implemented'); */
  // remove line with error and write your code here
  str = `${str}`;
  const repeatTimes = options.repeatTimes ?? 1;
  const separator = options.separator ?? "+";
  const addition = `${typeof options.addition === "undefined" ? "" : options.addition}`;
  const additionRepeatTimes = options.additionRepeatTimes ?? 1;
  const additionSeparator = options.additionSeparator ?? "|";
  const buildString = (str, repeat, separator) => {
    const builder = [];
    for (let i = 0; i < repeat; i++) builder.push(str);
    return builder.join(separator);
  };
  return buildString(
    str + buildString(addition, additionRepeatTimes, additionSeparator),
    repeatTimes,
    separator
  );
}

module.exports = {
  repeater,
};

//repeater(null, { repeatTimes: 3, separator: '??? ', addition: null, additionRepeatTimes: 3, additionSeparator: '!!!' })
//'null!!!!!!??? null!!!!!!??? null!!!!!!'
//'nullnull!!!null!!!null??? nullnull!!!null!!!null??? nullnull!!!null!!!null'
