import { Button } from '../../components/Button';
import { Component, ComponentProps } from '../../components/Component';
import { Heading } from '../../components/Heading';
import { Section } from '../../components/Section';
import { CarSettings } from './garage/car-settings';
import { Car } from './garage/car';
import { RaceControl } from './garage/race-control';
import { Pagination } from './pagination';
import { CarData } from '../../types/interfaces';

export class Garage extends Section {
  public nodes = {
    itemCounter: new Component({ tag: 'span', className: 'garage__item-counter', textContent: 'IC' }),
    controlBar: new RaceControl(),
    createBar: new CarSettings({ className: 'garage__car-create', buttonText: 'Create' }),
    pagination: new Pagination(),
  };
  private raceTrack = new Component<HTMLUListElement>({ tag: 'ul', className: 'race-track' });

  constructor(props?: ComponentProps) {
    super({ ...props, className: 'section garage' });

    const heading = new Heading({ tag: 'h1', className: 'garage__heading', textContent: 'Garage' });
    const { itemCounter, controlBar, createBar, pagination } = this.nodes;
    this.container.append(pagination, heading, controlBar, createBar, this.raceTrack);
    heading.append(itemCounter);
    //? temp
  }

  public renderCars(cars: CarData[]): void {
    const tag = 'li';
    const carNodes = cars.map((car) => new Car(car, { tag }));
    this.raceTrack.append(...carNodes);
    /*  this.raceTrack.node.replaceChildren(...carNodes); */
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}
