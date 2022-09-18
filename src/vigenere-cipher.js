const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    Object.assign(this, { isDirect });
  }
  #ALPH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  /* #tabulaRecta0 = (() => {
    const result = [];
    for (const i in this.#ALPH) {
      result[i] = this.#ALPH.slice(i) + this.#ALPH.slice(0, i);
    }
    return result;
  })(); */
  #tabulaRecta = [...this.#ALPH].reduce((p, c, i) => {
    return [...p, this.#ALPH.slice(i) + this.#ALPH.slice(0, i)];
  }, []);
  #getIndexes(str) {
    return [...str].map(v => this.#ALPH.indexOf(v));
  }
  #checkArguments(a, b) {
    if (!a || !b) throw new Error("Incorrect arguments!");
  }
  #reverseString(str) {
    return [...str].reverse().join("");
  }
  encrypt(message, key) {
    /* throw new NotImplementedError('Not implemented'); */
    // remove line with error and write your code here
    this.#checkArguments(...arguments);
    message = message.toUpperCase();
    key = key.padEnd(message.length, key).toUpperCase();
    const indexes = {
      message: this.#getIndexes(message),
      key: this.#getIndexes(key),
    };
    let keyIndex = 0;
    let result = [...message].reduce((p, c, i) => {
      if (!this.#ALPH.includes(c)) return p + c;
      return p + this.#tabulaRecta[indexes.message[i]][indexes.key[keyIndex++]];
    }, "");
    return this.isDirect ? result : this.#reverseString(result);
  }
  decrypt(message, key) {
    /* throw new NotImplementedError('Not implemented'); */
    // remove line with error and write your code here
    this.#checkArguments(...arguments);
    message = message.toUpperCase();
    key = key.padEnd(message.length, key).toUpperCase();
    const indexes = {
      message: this.#getIndexes(message),
      key: this.#getIndexes(key),
    };
    let keyIndex = 0;
    let result = [...message].reduce((p, c, i) => {
      if (!this.#ALPH.includes(c)) return p + c;
      const row = indexes.message[i];
      const col =
        (this.#ALPH.length - indexes.key[keyIndex++]) % this.#ALPH.length;
      return p + this.#tabulaRecta[row][col];
    }, "");
    return this.isDirect ? result : this.#reverseString(result);
  }
}

module.exports = {
  VigenereCipheringMachine,
};
