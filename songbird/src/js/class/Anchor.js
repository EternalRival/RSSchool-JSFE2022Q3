import Element from './Element';

export default class Anchor extends Element {
  constructor(parent, link, className, content, target, label) {
    super(parent, 'a', className, content);
    this.el.href = link;
    this.el.ariaLabel = label;
    if (target) this.el.target = target;
  }
}
