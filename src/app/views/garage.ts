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
    itemCounter: new Component({ className: 'garage__item-counter', textContent: 'IC' }),
    controlBar: new RaceControl(),
    createBar: new CarSettings({ className: 'garage__car-create', buttonText: 'Create' }),
    pagination: new Pagination(),
  };
  private raceTrack = new Component<HTMLUListElement>({ tag: 'ul', className: 'race-track' });

  constructor(props?: ComponentProps) {
    super({ ...props, className: 'section garage' });

    const heading = new Heading({ tag: 'h1', className: 'page__heading', textContent: 'Garage' });
    const { itemCounter, controlBar, createBar, pagination } = this.nodes;
    this.container.append(heading, itemCounter, controlBar, createBar, pagination, this.raceTrack);

    //? temp
    this.renderCars([{ name: 'oleg', id: 1, color: '#0f0' }]);
  }

  public renderCars(cars: CarData[]): void {
    const carNodes = cars.map((car) => new Car());
    const track1 = new Car<HTMLLIElement>({ tag: 'li' });
    this.raceTrack.append(track1);
    /*  this.raceTrack.node.replaceChildren(...carNodes); */
  }
}
