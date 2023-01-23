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
import { Modal } from './views/modal-dialog';

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
    this.views[route].total.node.textContent = `${quantity}`;
  }

  public openUpdateDialog(carData: ICarData): void {
    const route = Route.GARAGE;
    const settings = { action: CarSettingsAction.UPDATE, carData };

    const dialog = new Modal();
    const updateBar = new CarSettings(settings, { className: `${route}__car-update`, parent: dialog });

    const updateDialogColor = (color: string): void => {
      dialog.node.style.setProperty('--car-color', HexColor.isColor(color) ? color : HexColor.random);
    };

    updateBar.node.addEventListener('submit', dialog.destroy);

    updateDialogColor(carData.color);
    emitter.subscribe(EventName.colorPicked, updateDialogColor);
  }

  public alertWinner(winner: string, time: string): Modal {
    return new Modal({ textContent: `${winner} won this race! (${time})` });
  }
}
