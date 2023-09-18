import { Anchor } from '../../components/Anchor';
import { Footer as FooterComponent } from '../../components/Footer';

export class Footer extends FooterComponent {
  constructor() {
    super();
    const github = new Anchor({
      className: 'github',
      ariaLabel: 'github link',
      target: '_blank',
      href: 'http://github.com/EternalRival/',
    });
    const rssLogo = new Anchor({
      className: 'rss-logo',
      ariaLabel: 'rsschool link',
      target: '_blank',
      href: 'https://rs.school/js/',
    });
    this.container.append(github, '2023', rssLogo);
  }
}
