import { Component, ComponentProps } from '../../components/Component';
import { Heading } from '../../components/Heading';
import { Section } from '../../components/Section';
import { Pagination } from './pagination';

export class Winners extends Section {
  public nodes = {
    itemCounter: new Component({ tag: 'span', className: 'winners__item-counter', textContent: 'IC' }),
    pagination: new Pagination() /* controlBar: new RaceControl(),
    createBar: new CarSettings({ className: 'garage__car-create', buttonText: 'Create' }),
     */,
  };
  private raceTrack = new Component<HTMLUListElement>({ tag: 'ul', className: 'race-track' });

  constructor(props?: ComponentProps) {
    super({ ...props, className: 'section winners' });

    const heading = new Heading({ tag: 'h1', className: 'winners__heading', textContent: 'Winners' });
    const { pagination, itemCounter /* , controlBar, createBar,  */ } = this.nodes;
    this.container.append(pagination, heading /* , controlBar, createBar, this.raceTrack */);
    heading.append(itemCounter);

    //? temp
    // this.renderCars([{ name: 'oleg', id: 1, color: '#0f0' }]);
  }

  // public renderCars(cars: CarData[]): void {
  //   const carNodes = cars.map((car) => new Car());
  //   const track1 = new Car<HTMLLIElement>({ tag: 'li' });
  //   this.raceTrack.append(track1);
  //   /*  this.raceTrack.node.replaceChildren(...carNodes); */
  // }
}
