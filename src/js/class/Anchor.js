import Element from './Element';

export default class Anchor extends Element {
  constructor(parent, link, className, content) {
    super(parent, 'a', className, content);
    this.el.href = link;
  }
}
