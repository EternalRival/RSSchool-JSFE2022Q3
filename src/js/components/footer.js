import Element from '../class/Element';
import Anchor from '../class/Anchor';

export default class Footer {
  constructor() {
    this.container = new Element(document.body, 'footer', 'footer');
    this.github = new Anchor(this.container.el, 'https://github.com/EternalRival', 'github');
    this.year = new Element(this.container.el, 'div', 'year', '2022');
    this.rssLogo = new Anchor(this.container.el, 'https://rs.school/js/', 'rss-logo');
  }
}
