import { Root } from '../components/Root';
import { Main } from '../components/Main';
import { Footer } from './views/footer';
import { Garage } from './views/garage';
import { Header } from './views/header';
import { Winners } from './views/winners';
import { Component } from '../components/Component';
import { CarSettingsAction, Route } from '../types/enums';
import { ICarData } from '../types/interfaces';
import { CarSettings } from './views/garage/car-settings';
import { emitter, EventName } from '../utils/emitter';
import { HexColor } from '../utils/utils';

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

  public openUpdateDialog(carData: ICarData): void {
    const route = Route.GARAGE;
    const settings = { action: CarSettingsAction.UPDATE, carData };

    const background = new Component({ className: 'modal', parent: document.body });
    const dialog = new Component({ className: 'modal__dialog', parent: background });
    const updateBar = new CarSettings(settings, { className: `${route}__car-update`, parent: dialog });

    const closeDialog = (): void => background.destroy();
    const updateDialogColor = (color: string): void => {
      dialog.style.setProperty('--car-color', HexColor.isColor(color) ? color : HexColor.random);
    };

    updateBar.addEventListener('submit', closeDialog);
    background.addEventListener('click', (e) => {
      if (e.target === background.node) {
        closeDialog();
      }
    });

    updateDialogColor(carData.color);
    emitter.subscribe(EventName.colorPicked, updateDialogColor);
  }
}
