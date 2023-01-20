import { Root } from '../components/Root';
import { Main } from '../components/Main';
import { Footer } from './views/footer';
import { Garage } from './views/garage';
import { Header } from './views/header';
import { Winners } from './views/winners';
import { Component } from '../components/Component';
import { Route } from '../types/enums';

export class AppView {
  public currentView: Component;
  public views = {
    [Route.GARAGE]: new Garage(Route.GARAGE),
    [Route.WINNERS]: new Winners(Route.WINNERS),
  };

  constructor() {
    const root = document.getElementById('root') ?? new Root().node;

    const header = new Header();
    const main = new Main();
    const footer = new Footer();

    this.currentView = this.views[Route.GARAGE];

    root.append(header.node, main.node, footer.node);
    main.append(this.currentView);
  }

  public setView(view: Route): void {
    const newView = this.views[view];
    if (this.currentView !== newView) {
      this.currentView.replaceWith(newView);
      this.currentView = newView;
    }
  }

  public setTotalCounter(route: Route, quantity: number): void {
    this.views[route].total.text = `${quantity}`;
  }
}
