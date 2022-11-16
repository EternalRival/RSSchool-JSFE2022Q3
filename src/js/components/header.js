import Element from '../class/Element';
import Anchor from '../class/Anchor';

export default class Header extends Element {
  constructor() {
    super(document.body, 'header', 'header');
    this.container = new Element(this.el, 'div', 'header__container');
    this.logo = new Element(this.container.el, 'div', 'logo');
    this.nav = new Element(this.container.el, 'nav', 'nav');

    this.main = {};
    this.main.item = new Element(this.nav.el, 'li', 'nav-item');
    this.main.link = new Anchor(this.main.item.el, './', 'nav-link interactive', 'Menu');

    this.quiz = {};
    this.quiz.item = new Element(this.nav.el, 'li', 'nav-item');
    this.quiz.link = new Anchor(this.quiz.item.el, './quiz', 'nav-link interactive', 'Quiz');
  }
}
