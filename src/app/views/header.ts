import { Button } from '../../components/Button';
import { Component } from '../../components/Component';
import { Header as HeaderComponent } from '../../components/Header';
import { Route } from '../../types/enums';
import { emitter, EventName } from '../../utils/emitter';

export class Header extends HeaderComponent {
  constructor() {
    super();

    const nav = new Component({ tag: 'nav', className: 'header__nav' });
    const navList = new Component({ tag: 'ul', className: 'header__nav-list' });

    const navItems = Object.values(Route).map((route) => {
      const item = new Component({ tag: 'li', className: 'header__nav-item' });

      const button = new Button({ parent: item, className: 'nav__button', textContent: `To ${route}` });
      button.node.addEventListener('click', () => emitter.emit(EventName.routeBtnClicked, route));

      return item;
    });

    this.container.append(nav);
    nav.append(navList);
    navList.append(...navItems);
  }
}
