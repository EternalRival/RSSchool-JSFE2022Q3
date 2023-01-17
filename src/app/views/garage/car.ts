import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { CarData } from '../../../types/interfaces';
import { HexColor } from '../../../utils/utils';

export class Car<T extends HTMLElement = HTMLElement> extends Component {
  public nodes = {
    buttons: {
      edit: new Button({ ariaLabel: 'car edit button', className: 'car__button car__edit' }),
      delete: new Button({ ariaLabel: 'car delete button', className: 'car__button car__delete' }),
      start: new Button({ ariaLabel: 'car start button', className: 'car__button car__start' }),
      stop: new Button({ ariaLabel: 'car stop button', className: 'car__button car__stop' }),
    },
    name: new Component({ tag: 'span', className: 'car__name' }),
    track: new Input({ type: 'range', className: 'car__track', ariaLabel: 'car', value: '0' }),
  };

  constructor(carData: CarData, props?: ComponentProps<T>) {
    super({ ...props, className: 'car' });
    const { buttons, name, track } = this.nodes;

    name.text = carData.name;

    this.setCarColor(carData.color);

    this.append(...Object.values(buttons), name, track);
  }

  private setCarColor(color: string): void {
    const newColor = HexColor.isColor(color) ? color : HexColor.random;
    this.nodes.track.style.setProperty('--car-color', newColor);
  }
}
