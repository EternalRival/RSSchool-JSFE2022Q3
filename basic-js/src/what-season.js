const { NotImplementedError } = require("../extensions/index.js");

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date /* date */) {
  /* throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here */
  //console.log(date);
  if (!date) return "Unable to determine the time of year!";
  if (!(date instanceof Date)) throw new Error("Invalid date!");
  /* if (!date?.hasOwnProperty('getUTCMonth')) throw new Error("Invalid date!"); */
  //if (date.__proto__.constructor != new Date().__proto__.constructor) throw new Error("Invalid date!");
  //console.log(Object.getOwnPropertyDescriptors(date),'?????' ,Object.getOwnPropertyDescriptors(new Date()));
  /*  console.log(Object.getOwnPropertyNames(date), Object.getOwnPropertyNames(new Date())); */
  /*  console.log(Object.getOwnPropertySymbols(date), Object.getOwnPropertySymbols(new Date())); */
  /*  console.log(Object.keys(date), Object.keys(new Date())); */
  // console.log(Object.getOwnPropertyDescriptors(date), '?????', Object.getOwnPropertyDescriptors(Date));
  /*  console.log(Object.getOwnPropertyNames(date), Object.getOwnPropertyNames(new Date())); */
  /*  console.log(Object.getOwnPropertySymbols(date), Object.getOwnPropertySymbols(new Date())); */
  /*  console.log(Object.keys(date), Object.keys(new Date())); */
  /*   Date.prototype._kek = 'kek'
  let a = new Date();
  console.log(date.__proto__._kek) */
  /* for (const prop of date) console.log(prop) */
  /* console.log(typeof (new Date())[Symbol.iterator]) */
  /* for (const prop in date) console.log(prop) */
  /* const realDate = new Date(date); */
  /* console.log(realDate === date); */
  /* console.log(realDate , date); */
  /* console.log(Object.keys(date), Object.keys(realDate)) */
  /* console.log(Date.parse(date), date.getTime()); */
  /*  console.log(Date.parse(new Date(date)), Date.parse(date)); */
  /* console.log(new Date(date).getTime()=== date.getTime()); */
  /*   const ddate = date;
  console.log(typeof date.toLocaleString())
if (typeof date.toLocaleString() !== 'string') throw new Error("Invalid date!"); */
  /* console.log(
    Object.entries(date).toString() == Object.entries(new Date(date)).toString()
  ); */

  if (`${Object.entries(date)}` != `${Object.entries(new Date(date))}`)
    throw new Error("Invalid date!");

  const month = date.getUTCMonth();
  switch (month) {
    case 2:
    case 3:
    case 4:
      return "spring";
    case 5:
    case 6:
    case 7:
      return "summer";
    case 8:
    case 9:
    case 10:
      return "autumn";
    case 11:
    case 0:
    case 1:
      return "winter";
  }
}

module.exports = {
  getSeason,
};
