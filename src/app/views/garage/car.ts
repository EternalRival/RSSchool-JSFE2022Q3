import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { HexColor } from '../../../utils/utils';

export class Car<T extends HTMLElement = HTMLElement> extends Component {
  public nodes = {
    name: new Component({ tag: 'span', className: 'car__name' }),
    buttons: {
      edit: new Button({ textContent: '📝', className: 'car__button car__edit' }),
      delete: new Button({ textContent: '❌', className: 'car__button car__delete' }),
      start: new Button({ textContent: '▶', className: 'car__button car__start' }),
      stop: new Button({ textContent: '⏹', className: 'car__button car__stop' }),
    },
    track: new Input({ type: 'range', className: 'car__track', ariaLabel: 'car' }),
  };

  constructor(props?: ComponentProps<T>) {
    super({ ...props, className: 'car' });
    const { name, buttons, track } = this.nodes;

    this.append(name, ...Object.values(buttons), track);
  }

  public setCarColor(color: string): void {
    const newColor = HexColor.isColor(color) ? color : HexColor.random;
    this.nodes.track.node.setAttribute('car-color', newColor);
  }
}
