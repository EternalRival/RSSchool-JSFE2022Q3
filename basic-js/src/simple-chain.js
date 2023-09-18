const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: [],
  getLength() {
    //? в тестах нет вызова этой функции
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
    console.debug("getLength", this.chain);
    return this.chain.length;
  },
  addLink(value /* value */) {
    //? в тестах нет проверки на пустой параметр
    /* throw new NotImplementedError('Not implemented'); */
    // remove line with error and write your code here
    this.chain.push(`${value}`);
    // console.debug("addLink", this.chain);
    return this;
  },
  removeLink(position /* position */) {
    /* throw new NotImplementedError("Not implemented"); */
    // remove line with error and write your code here
    //  console.debug("removeLink", this.chain);

    // console.log(position, this.chain)
    /*    const cond = !(); //!Number.isInteger(position)
    console.log(position, cond, this.chain); */
    if (--position in this.chain) {
      this.chain.splice(position, 1);
      return this;
    }
    this.chain.length = 0;
    throw new Error("You can't remove incorrect link!");
  },
  reverseChain() {
    /* throw new NotImplementedError("Not implemented"); */
    // remove line with error and write your code here
    //  console.debug("reverseChain", this.chain);
    this.chain.reverse();
    return this;
  },
  finishChain() {
    /* throw new NotImplementedError('Not implemented'); */
    // remove line with error and write your code here
    // console.debug("finishChain", `(${this.chain.join(" )~~( ")})`);
    const result = `( ${this.chain.join(" )~~( ")} )`;
    // console.log(result)
    this.chain.length = 0;
    return result;
  },
};

module.exports = {
  chainMaker,
};
