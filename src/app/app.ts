import { Input } from '../components/Input';
import { CarButton, CarSettingsAction, Route } from '../types/enums';
import { CarData } from '../types/interfaces';
import { emitter, EventName } from '../utils/emitter';
import { Model } from './model';
import { AppView } from './view';

export class App {
  private model = new Model();
  private view = new AppView();

  public run(): void {
    console.info('App started!');

    this.subscribe();
    this.update();
  }

  private async renderCars(): Promise<void> {
    const route = Route.GARAGE;
    this.view.views[route].renderCars(await this.model.getCars(route));
  }

  private async update(): Promise<void> {
    await this.renderCars();
    Object.values(Route).forEach((route) => this.view.setTotalCounter(route, this.model.state[route].total));
  }

  private subscribe(): void {
    //* View -> Model
    emitter.subscribe(EventName.routeBtnClicked, (route) => this.routeBtnClickHandler(route));
    emitter.subscribe(EventName.pageChanged, ({ route, counter }) => this.pageChangeHandler(route, counter));
    emitter.subscribe(EventName.setCarSubmitted, (action, carData) => this.setCarSubmitHandler(action, carData));
    emitter.subscribe(EventName.startBtnClicked, () => this.startBtnClickHandler());
    emitter.subscribe(EventName.resetBtnClicked, () => this.resetBtnClickHandler());
    emitter.subscribe(EventName.generateBtnClicked, () => this.generateBtnClickHandler());
    emitter.subscribe(EventName.carBtnClicked, ({ button, id }) => this.carButtonClickHandler(button, id));
    //* Model -> View
  }

  private routeBtnClickHandler(route: Route): void {
    this.view.setView(route);
  }

  private pageChangeHandler(route: Route, counter: Input): void {
    const state = this.model.state[route];
    const page = counter;

    if (+page.value > Math.ceil(state.total / state.limit)) {
      page.value = `${state.page}`;
      return;
    }

    state.page = +page.value;
    this.renderCars();
  }

  private async setCarSubmitHandler(action: CarSettingsAction, carData: CarData): Promise<void> {
    switch (action) {
      case CarSettingsAction.CREATE:
        await this.model.createCar(carData);
        break;
      case CarSettingsAction.UPDATE:
        break;
      default:
    }

    this.update();
  }

  private startBtnClickHandler(): void {
    throw new Error('Method not implemented.');
  }

  private resetBtnClickHandler(): void {
    throw new Error('Method not implemented.');
  }

  private async generateBtnClickHandler(): Promise<void> {
    await Promise.allSettled(this.model.generateHundredCars());
    this.update();
  }

  private carButtonClickHandler(button: CarButton, id: CarData['id']): void {
    switch (button) {
      case CarButton.EDIT:
        console.log(`${id}:${button} clicked`);
        break;
      case CarButton.DELETE:
        this.model.deleteCar(id);
        this.update();
        break;
      case CarButton.START:
        console.log(`${id}:${button} clicked`);
        break;
      case CarButton.STOP:
        console.log(`${id}:${button} clicked`);
        break;
      default:
    }
  }
}
