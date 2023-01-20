import { Button } from '../../components/Button';
import { Component, ComponentProps } from '../../components/Component';
import { Heading } from '../../components/Heading';
import { Section } from '../../components/Section';
import { CarSettings } from './garage/car-settings';
import { Car } from './garage/car';
import { RaceControl } from './garage/race-control';
import { Pagination } from './pagination';
import { CarData } from '../../types/interfaces';
import { emitter, EventName } from '../../utils/emitter';
import { CarSettingsAction, Route } from '../../types/enums';

export class Garage extends Section {
  public total = new Component({ tag: 'span', className: `${this.route}__total-counter` });

  private raceTrack = new Component<HTMLUListElement>({ tag: 'ul', className: 'race-track' });

  constructor(private route: Route, props?: ComponentProps) {
    super({ ...props, className: `section ${route}` });

    const heading = new Heading({ tag: 'h1', className: `${route}__heading`, textContent: route });

    const controlBar = new RaceControl();

    const createBar = new CarSettings(CarSettingsAction.CREATE, { className: `${route}__car-create` });

    const pagination = new Pagination(route);

    this.container.append(pagination, heading, controlBar, createBar, this.raceTrack);
    heading.append(this.total);
  }

  public renderCars(cars: CarData[]): void {
    const tag = 'li';
    const carNodes = cars.map((car) => new Car(car, { tag }).node);
    this.raceTrack.node.replaceChildren(...carNodes);
  }
}
