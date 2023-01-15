import { Root } from '../components/Root';
import { Main } from '../components/Main';
import { Footer } from './views/footer';
import { Garage } from './views/garage';
import { Header } from './views/header';
import { Winners } from './views/winners';
import { Component } from '../components/Component';
import { View } from '../types/enums';

export class AppView {
  public currentView: Component;
  public views: Map<View, Component> = new Map();

  public header: Component = new Header();

  constructor() {
    const root = document.getElementById('root') ?? new Root().node;

    const main = new Main();
    const footer = new Footer();

    const garage = new Garage();
    const winners = new Winners();

    this.currentView = garage;
    this.views.set(View.GARAGE, garage);
    this.views.set(View.WINNERS, winners);

    root.append(this.header.node, main.node, footer.node);
    main.append(this.currentView);
  }

  public setView(view: View): void {
    const newView = this.views.get(view);
    if (newView && this.currentView !== newView) {
      this.currentView.replaceWith(newView);
      this.currentView = newView;
    }
  }
}
