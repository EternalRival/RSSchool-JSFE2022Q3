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
  #tabulaRecta = [...this.#ALPH].reduce((p, c, i) => {
    return [...p, this.#ALPH.slice(i) + this.#ALPH.slice(0, i)];
  }, []);
  #getIndexes(...strings) {
    return strings.map(str => [...str].map(char => this.#ALPH.indexOf(char)));
  }
  #checkArguments(a, b) {
    if (!a || !b) throw new Error("Incorrect arguments!");
  }
  #reverseString(str) {
    return [...str].reverse().join("");
  }
  encrypt(message, key) {
    this.#checkArguments(...arguments);
    message = message.toUpperCase();
    key = key.padEnd(message.length, key).toUpperCase();
    const [mIndexes, kIndexes] = this.#getIndexes(message, key);
    let result = "";
    for (let i = 0, j = 0; i < message.length; i++) {
      result += this.#ALPH.includes(message[i])
        ? this.#tabulaRecta[mIndexes[i]][kIndexes[j++]]
        : message[i];
    }
    return this.isDirect ? result : this.#reverseString(result);
  }
  decrypt(message, key) {
    this.#checkArguments(...arguments);
    message = message.toUpperCase();
    key = key.padEnd(message.length, key).toUpperCase();
    const [mIndexes, kIndexes] = this.#getIndexes(message, key);
    const { length } = this.#ALPH;
    let result = "";
    for (let i = 0, j = 0; i < message.length; i++) {
      result += this.#ALPH.includes(message[i])
        ? this.#tabulaRecta[mIndexes[i]][(length - kIndexes[j++]) % length]
        : message[i];
    }
    return this.isDirect ? result : this.#reverseString(result);
  }
}

module.exports = {
  VigenereCipheringMachine,
};
