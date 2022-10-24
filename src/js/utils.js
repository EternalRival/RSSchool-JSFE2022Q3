export default {
  randomizer: (min = 1, max = 20) => Math.floor(Math.random() * (max - min + 1)) + min,
  shuffle: (arr) => {
    const result = arr.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  },
  pause(ms) {
    return new Promise((_) => {
      setTimeout(_, ms * 1000);
    });
  },
  ls: {
    load(key) {
      return (JSON.parse(localStorage.getItem('erdev')) || {})[key];
    },
    save(key, data) {
      localStorage.setItem('erdev', JSON.stringify({ [key]: { ...this.load(key), ...data } }));
    },
  },
};
