import { Button } from '../../components/Button';
import { Component } from '../../components/Component';
import { Header as HeaderComponent } from '../../components/Header';

export class Header extends HeaderComponent {
  public nodes = {
    garageBtn: new Button({ className: 'nav__button', textContent: 'To Garage' }),
    winnersBtn: new Button({ className: 'nav__button', textContent: 'To Winners' }),
  };

  constructor() {
    super();
    const nav = new Component({ tag: 'nav', className: 'header__nav' });
    const navList = new Component({ tag: 'ul', className: 'header__nav-list' });
    const navItems = Object.values(this.nodes).map((button) => {
      const item = new Component({ tag: 'li', className: 'header__nav-item' });
      item.append(button);
      return item;
    });

    this.container.append(nav);
    nav.append(navList);
    navList.append(...navItems);
  }
}
