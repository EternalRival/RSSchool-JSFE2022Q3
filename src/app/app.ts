import { Input } from '../components/Input';
import { CarButton, CarSettingsAction, Route, StatusCode } from '../types/enums';
import { ICarData } from '../types/interfaces';
import { emitter, EventName } from '../utils/emitter';
import { Model } from './model';
import { AppView } from './view';
import { CarControl } from './views/garage/car-control';

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
    emitter.subscribe(EventName.pageChanged, (route, counter) => this.pageChangeHandler(route, counter));
    emitter.subscribe(EventName.setCarSubmitted, ({ action, carData }) => this.setCarSubmitHandler(action, carData));
    emitter.subscribe(EventName.startBtnClicked, () => this.startBtnClickHandler());
    emitter.subscribe(EventName.resetBtnClicked, () => this.resetBtnClickHandler());
    emitter.subscribe(EventName.generateBtnClicked, () => this.generateBtnClickHandler());
    emitter.subscribe(EventName.carBtnClicked, (button, carControl) => this.carButtonClickHandler(button, carControl));
    emitter.subscribe(EventName.carFinishedRace, (id) => this.raceFinishHandler(id));
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

  private async setCarSubmitHandler(action: CarSettingsAction, carData: ICarData): Promise<void> {
    switch (action) {
      case CarSettingsAction.CREATE:
        await this.model.createCar(carData);
        break;
      case CarSettingsAction.UPDATE:
        await this.model.updateCar(carData);
        break;
      default:
    }

    this.update();
  }

  private startBtnClickHandler(): void {
    document.body.style.pointerEvents = 'none';
    this.view.views[Route.GARAGE].controlBar.toggleRaceButtons(false);
    this.view.views[Route.GARAGE].startRace();
    this.model.race.inProgress = true;
    this.model.race.carsCrashed = 0;
    this.model.race.startTime = Date.now();
  }

  private resetBtnClickHandler(): void {
    this.view.views[Route.GARAGE].stopRace();
  }

  private raceFinishHandler(id: ICarData['id']): void {
    // TODO https://www.youtube.com/watch?v=sTXtlBLh-Ts
    const { race } = this.model;
    if (race.inProgress) {
      race.inProgress = false;
      race.winnerTime = Date.now() - race.startTime;
      race.currentWinner = id;
      console.log(race);
    }
    this.view.views[Route.GARAGE].controlBar.toggleRaceButtons(true);
    document.body.removeAttribute('style');
  }

  private async generateBtnClickHandler(): Promise<void> {
    await Promise.allSettled(this.model.generateHundredCars());
    this.update();
  }

  private async carButtonClickHandler(button: CarButton, carControl: CarControl): Promise<void> {
    switch (button) {
      case CarButton.EDIT:
        this.model.getCar(carControl.id).then((carData) => this.view.openUpdateDialog(carData));
        break;
      case CarButton.DELETE:
        await this.model.deleteCar(carControl.id);
        this.update();
        break;
      case CarButton.START:
        this.drive(carControl);
        break;
      case CarButton.STOP:
        this.stop(carControl);
        break;
      default:
    }
  }

  private drive = async (carControl: CarControl): Promise<void> => {
    carControl.startButtonToggle(false);
    const engineData = await this.model.toggleCarEngine(carControl.id, 'started');
    if (typeof engineData !== 'number') {
      carControl.drive(engineData);
      if (!this.model.race.inProgress) {
        carControl.stopButtonToggle(true);
      }
      const driveResponse = await this.model.drive(carControl.id);
      if (driveResponse === StatusCode.INTERNAL_SERVER_ERROR) {
        carControl.pause();
        this.model.race.carsCrashed += 1;
        if (this.model.race.carsCrashed >= this.model.state[Route.GARAGE].limit) {
          this.view.views[Route.GARAGE].controlBar.toggleRaceButtons(true);
          document.body.removeAttribute('style');
        }
      }
    }
  };

  private stop = async (carControl: CarControl): Promise<void> => {
    carControl.stopButtonToggle(false);
    const engineData = await this.model.toggleCarEngine(carControl.id, 'stopped');
    if (typeof engineData !== 'number') {
      carControl.stop();
      if (!this.model.race.inProgress) {
        carControl.startButtonToggle(true);
      }
    }
  };
}
