import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { CarButton } from '../../../types/enums';
import { CarData } from '../../../types/interfaces';
import { emitter, EventName } from '../../../utils/emitter';
import { HexColor } from '../../../utils/utils';

export class Car<T extends HTMLElement = HTMLElement> extends Component {
  // TODO
  public nodes = {
    name: new Component({ tag: 'span', className: 'car__name' }),
    track: new Input({ type: 'range', className: 'car__track', ariaLabel: 'car', value: '0' }),
  };

  constructor(carData: CarData, props?: ComponentProps<T>) {
    super({ ...props, className: 'car' });
    const { name, track } = this.nodes;

    name.text = carData.name;

    this.setCarColor(carData.color);

    const buttons = Object.values(CarButton).map((button) => {
      const [ariaLabel, className] = [`car ${button} button`, `car__button car__${button}`];
      const onclick = (): void => emitter.emit(EventName.carBtnClicked, { button, id: carData.id });
      return new Button({ ariaLabel, className, onclick });
    });

    this.append(...Object.values(buttons), name, track);
  }

  private setCarColor(color: string): void {
    const newColor = HexColor.isColor(color) ? color : HexColor.random;
    this.nodes.track.style.setProperty('--car-color', newColor);
  }
}
