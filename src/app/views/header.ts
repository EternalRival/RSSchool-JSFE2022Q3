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
      const onclick = (): void => emitter.emit(EventName.routeBtnClicked, route);
      const button = new Button({ className: 'nav__button', textContent: `To ${route}`, onclick });

      const item = new Component({ tag: 'li', className: 'header__nav-item' });
      item.append(button);

      return item;
    });

    this.container.append(nav);
    nav.append(navList);
    navList.append(...navItems);
  }
}

/* const { garageBtn, winnersBtn } = this.view.header.nodes;
garageBtn.addEventListener('click', () => this.view.setView(Route.GARAGE));
winnersBtn.addEventListener('click', () => this.view.setView(Route.WINNERS));
 */
