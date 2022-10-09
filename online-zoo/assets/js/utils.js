export default {
  randomizer: (min = 1, max = 20) =>
    Math.floor(Math.random() * (max - min + 1)) + min,
  shuffle: arr => {
    const result = arr.slice();
    for (let i = result.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  },
};
