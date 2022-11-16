import Element from '../class/Element';
import Anchor from '../class/Anchor';

export default class Header extends Element {
  constructor() {
    super(document.body, 'header', 'header');
    this.logo = new Element(this.el, 'div', 'logo');
    this.nav = new Element(this.el, 'nav', 'nav');

    this.main = {};
    this.main.item = new Element(this.nav.el, 'li', 'nav-item interactive');
    this.main.link = new Anchor(this.main.item.el, './', 'nav-link', 'Menu');

    this.quiz = {};
    this.quiz.item = new Element(this.nav.el, 'li', 'nav-item interactive');
    this.quiz.link = new Anchor(this.quiz.item.el, './quiz', 'nav-link', 'Quiz');
  }
}
