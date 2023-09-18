const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members /* members */) {
  /* throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here */
  if (!Array.isArray(members)) return false;
  members = members
    .filter(v => typeof v === "string")
    .map(v => v.trim().toUpperCase())
    .sort();
  /* console.debug(members); */
  return members.reduce((p, c) => p + c[0], "");
}

module.exports = {
  createDreamTeam,
};
