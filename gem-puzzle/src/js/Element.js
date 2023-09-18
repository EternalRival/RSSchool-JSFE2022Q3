export default class Element {
  constructor(parent, tag, className, content) {
    const element = document.createElement(tag ?? 'div');
    if (className) element.className = className;
    element.textContent = content;
    parent.append(element);
    this.el = element;
  }

  destroy() {
    this.el.remove();
  }
}
