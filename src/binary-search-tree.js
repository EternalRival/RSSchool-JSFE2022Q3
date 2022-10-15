const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree extends Node {
  constructor() {
    super(null);
  }
  #getSide(node, data) {
    return data < node.data ? "left" : "right";
  }
  root() {
    //throw new NotImplementedError('Not implemented');
    // remove line with error and write your code here
    return this.data ? this : null;
  }

  add(data, node = this /* data */) {
    //throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
    if (node.data === null) node.data = data;
    else {
      const side = this.#getSide(node, data);
      if (node[side]) return this.add(data, node[side]);
      node[side] = new Node(data);
    }
  }

  has(data /* data */) {
    //throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
    return JSON.stringify(this).indexOf(`"data":${data},`) !== -1;
  }

  find(data, node = this /* data */) {
    //throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
    if (!this.has(data)) return null;
    if (node.data === data) return node;
    return this.find(data, node[this.#getSide(node, data)]);
  }

  remove(data, node = this, parent /* data */) {
    
    //throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
    if (!this.has(data)) return;

    if (node.data !== data)
      this.remove(data, node[this.#getSide(node, data)], node);
    else {
      Object.assign(node, {data:null})
    }
  }

  min(node = this) {
    //throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
    // console.debug(node)
    return node.left === null ? node.data : this.min(node.left);
  }

  max(node = this) {
    //throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
    return node.right === null ? node.data : this.max(node.right);
  }
}

module.exports = {
  BinarySearchTree,
};
