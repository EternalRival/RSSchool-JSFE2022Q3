import { Button } from '../../components/Button';
import { Component, ComponentProps } from '../../components/Component';
import { Heading } from '../../components/Heading';
import { Section } from '../../components/Section';
import { CarSettings } from './garage/car-settings';
import { Car } from './garage/car';
import { RaceControl } from './garage/race-control';
import { Pagination } from './pagination';
import { ICarData } from '../../types/interfaces';
import { emitter, EventName } from '../../utils/emitter';
import { CarSettingsAction, Route } from '../../types/enums';

export class Garage extends Section {
  public total = new Component({ tag: 'span', className: `${this.route}__total-counter` });

  public controlBar = new RaceControl();

  private raceTrack = new Component<HTMLUListElement>({ tag: 'ul', className: 'race-track' });

  private currentCars?: Car[];

  constructor(private route: Route, props?: ComponentProps) {
    super({ ...props, className: `section ${route}` });

    const heading = new Heading({ tag: 'h1', className: `${route}__heading`, textContent: route });

    const createBar = new CarSettings({ action: CarSettingsAction.CREATE }, { className: `${route}__car-create` });

    const pagination = new Pagination(route);

    this.container.append(pagination, heading, this.controlBar, createBar, this.raceTrack);
    heading.append(this.total);
  }

  public renderCars(cars: ICarData[]): void {
    this.raceTrack.clear();
    this.currentCars = cars.map((car) => new Car(car, { tag: 'li' }));
    this.raceTrack.append(...this.currentCars);
  }

  public startRace(): void {
    this.currentCars?.forEach((car) => {
      car.control.startRide();
      car.control.startButtonToggle(false);
      car.control.stopButtonToggle(false);
    });
  }
  public stopRace(): void {
    this.currentCars?.forEach((car) => {
      car.control.stopButtonToggle(true);
      car.control.stopRide();
    });
  }
}
