import Element from './Element';

export default class Button extends Element {
  constructor(parent, name, onClick) {
    super(parent, 'button', 'button', name);
    this.el.onclick = onClick;
  }
}
