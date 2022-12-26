import { BaseComponent } from '../elements/base-component';
import { Filter } from './filter';
import { Button } from '../elements/button';

const btns = ['100%', '90%', '80%', '70%', '65%', '60%', '40%', '20%'];

export class SizeFilter extends Filter {
  private filterWrapper: BaseComponent;

  private buttons: Button[];

  constructor() {
    super('Размер');
    this.filterWrapper = new BaseComponent({ className: 'filter__wrapper', parent: this.node });
    this.buttons = btns.map(
      (item) =>
        new Button({ className: 'filter__btn', text: item, parent: this.filterWrapper.getNode() }),
    );
    this.buttons.map((item) =>
      item.getNode().addEventListener('click', () => {
        this.buttons.map((elem) => elem.getNode().classList.remove('active'));
        item.getNode().classList.add('active');
      }),
    );
  }
}
