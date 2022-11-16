import Element from '../class/Element';
import Anchor from '../class/Anchor';

export default class Header {
  constructor() {
    const container = new Element(document.body, 'header', 'header');
    const logo = new Element(container.el, 'div', 'logo');
    const nav = new Element(container.el, 'nav', 'nav');

    const main = {};
    main.item = new Element(nav.el, 'li', 'nav-item');
    main.link = new Anchor(main.item.el, './', 'nav-link', 'Main page');

    const quiz = {};
    quiz.item = new Element(nav.el, 'li', 'nav-item');
    quiz.link = new Anchor(quiz.item.el, './quiz', 'nav-link', 'Quiz');

    Object.assign(this, {
      container,
      logo,
      nav,
      main,
      quiz,
    });
  }
}
