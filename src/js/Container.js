import Element from './Element';

export default class Container extends Element {
  constructor(parent, className = 'container') {
    super(parent, 'div', className);
  }
}
