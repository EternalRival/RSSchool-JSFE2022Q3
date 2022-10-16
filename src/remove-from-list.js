const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k /* l, k */) {
  //throw new NotImplementedError('Not implemented');
  // remove line with error and write your code here
  const enqueue = (value, node) => {
    if (node.value === null) node.value = value;
    else if (node.next === null) node.next = new ListNode(value);
    else enqueue(value, node.next);
  };
  const list = new ListNode(null);
  while (l !== null) {
    if (l.value !== k) enqueue(l.value, list);
    l = l.next;
  }
  return list;
}

module.exports = {
  removeKFromList,
};
