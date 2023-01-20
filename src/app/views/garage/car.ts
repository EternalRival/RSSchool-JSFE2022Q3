import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { CarButton } from '../../../types/enums';
import { ICarData } from '../../../types/interfaces';
import { emitter, EventName } from '../../../utils/emitter';

export class Car<T extends HTMLElement = HTMLElement> extends Component {
  constructor(carData: ICarData, props?: ComponentProps<T>) {
    super({ ...props, className: 'car' });

    const name = new Component({ tag: 'span', className: 'car__name', textContent: carData.name });

    const track = new Input({ type: 'range', className: 'car__track', ariaLabel: 'car', value: '0', disabled: true });
    track.style.setProperty('--car-color', carData.color);

    const buttons = Object.values(CarButton).map((button) => {
      const [ariaLabel, className] = [`car ${button} button`, `car__button car__${button}`];
      const onclick = (): void => emitter.emit(EventName.carBtnClicked, button, carData.id);
      return new Button({ ariaLabel, className, onclick });
    });

    this.append(...Object.values(buttons), name, track);
  }
}
