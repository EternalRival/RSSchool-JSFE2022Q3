import Element from './Element';

export default class Button extends Element {
  constructor(parent, onClick, className, content) {
    super(parent, 'button', className, content);
    this.el.onclick = onClick;
  }
}
