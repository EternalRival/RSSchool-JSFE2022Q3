import Element from '../class/Element';
import Anchor from '../class/Anchor';

export default class Footer extends Element {
  constructor() {
    super(document.body, 'footer', 'footer');
    this.github = new Anchor(this.el, 'https://github.com/EternalRival', 'github interactive');
    this.year = new Element(this.el, 'div', 'year', '2022');
    this.rssLogo = new Anchor(this.el, 'https://rs.school/js/', 'rss-logo interactive');
  }
}
