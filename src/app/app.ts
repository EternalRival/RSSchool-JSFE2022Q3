import { Route } from '../types/enums';
import { Model } from './model';
import { AppView } from './view';

export class App {
  private model = new Model();
  private view = new AppView();

  public async run(): Promise<void> {
    console.info('App started!');

    this.initListeners();
    this.update();

    //todo update todo pagination fix
  }

  private async renderCars(): Promise<void> {
    const cars = await this.model.getCars(Route.GARAGE);
    this.view.views.garage.renderCars(cars);
  }
  private updateTotalCounter(route: Route): void {
    this.view.setTotalCounter(route, this.model.state[route].totalQuantity);
  }

  private async createCarHandler(e: Event): Promise<void> {
    e.preventDefault();
    const carData = this.view.views.garage.nodes.createBar.getCarData();
    await this.model.createCar(carData);
    this.update();
  }

  private initListeners(): void {
    const { garageBtn, winnersBtn } = this.view.header.nodes;
    garageBtn.addEventListener('click', () => this.view.setView(Route.GARAGE));
    winnersBtn.addEventListener('click', () => this.view.setView(Route.WINNERS));

    const { createBar } = this.view.views.garage.nodes;
    createBar.addEventListener('submit', this.createCarHandler.bind(this));

    const { startBtn, generateBtn } = this.view.views.garage.nodes.controlBar;
    generateBtn.addEventListener('click', () => this.model.generateHundredCars());

    const garagePage = this.view.views[Route.GARAGE].nodes.pagination.nodes.counter;
    garagePage.addEventListener('change', () => {
      const state = this.model.state[Route.GARAGE];

      if (+garagePage.value > Math.ceil(state.totalQuantity / state.limit)) {
        garagePage.value = `${state.page}`;
        return;
      }

      state.page = +garagePage.value;
      this.renderCars();
    });

    /*
    const { startBtn, resetBtn } = this.view.garage.controlBar;
    startBtn.addEventListener('click', () => console.log('startBtn clicked'));
    resetBtn.addEventListener('click', () => console.log('resetBtn clicked'));
    */
  }

  private async update(): Promise<void> {
    await this.renderCars();
    this.updateTotalCounter(Route.GARAGE);
  }
}
