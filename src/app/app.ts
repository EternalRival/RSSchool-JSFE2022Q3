import { Input } from '../components/Input';
import { CarButton, CarSettingsAction, Route, StatusCode } from '../types/enums';
import { ICarData } from '../types/interfaces';
import { emitter, EventName } from '../utils/emitter';
import { getReadableTime } from '../utils/utils';
import { Model } from './model';
import { AppView } from './view';
import { CarControl } from './views/garage/car-control';

export class App {
  private model = new Model();
  private view = new AppView();

  public run(): void {
    console.info('App started!');

    this.subscribe();
    this.update(Route.GARAGE);
    this.update(Route.WINNERS);
  }

  private async renderCars(route: Route): Promise<void> {
    switch (route) {
      case Route.GARAGE:
        this.view.views[route].renderCars(await this.model.getCars());
        break;
      case Route.WINNERS:
        this.view.views[route].renderCars(await this.model.getWinners({ _sort: 'time', _order: 'ASC' }));
        break;
      default:
    }
  }

  private async update(route: Route): Promise<void> {
    await this.renderCars(route);
    this.view.setTotalCounter(route, this.model.state[route].total);
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
    const page = counter.node;

    if (+page.value > Math.ceil(state.total / state.limit)) {
      page.value = `${state.page}`;
      return;
    }

    state.page = +page.value;
    this.renderCars(route);
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

    this.update(Route.GARAGE);
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

  private async raceFinishHandler(id: ICarData['id']): Promise<void> {
    const { race } = this.model;
    if (race.inProgress) {
      race.inProgress = false;
      race.winnerTime = Math.round((Date.now() - race.startTime) / 10) / 100;
      race.currentWinner = id;
      const winnerTime = `${race.winnerTime}s`;
      const winnerName = (await this.model.getCar(id)).name;
      this.view.alertWinner(winnerName, winnerTime);
      this.view.views[Route.GARAGE].controlBar.toggleRaceButtons(true);
      document.body.removeAttribute('style');
      await this.model.createWinner();
      await this.update(Route.WINNERS);
    }
  }

  private async generateBtnClickHandler(): Promise<void> {
    await Promise.allSettled(this.model.generateHundredCars());
    this.update(Route.GARAGE);
  }

  private async carButtonClickHandler(button: CarButton, carControl: CarControl): Promise<void> {
    switch (button) {
      case CarButton.EDIT:
        this.model.getCar(carControl.id).then((carData) => this.view.openUpdateDialog(carData));
        break;
      case CarButton.DELETE:
        await this.model.deleteCar(carControl.id);
        await this.model.deleteWinner(carControl.id);
        this.update(Route.GARAGE);
        this.update(Route.WINNERS);
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
    this.view.views[Route.GARAGE].controlBar.toggleStartButton(false);
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
        if (this.model.race.carsCrashed >= this.view.views.garage.raceTrackSize) {
          this.view.views[Route.GARAGE].controlBar.toggleRaceButtons(true);
          document.body.removeAttribute('style');
          this.model.race.inProgress = false;
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
