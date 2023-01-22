import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { CarButton } from '../../../types/enums';
import { ICarData } from '../../../types/interfaces';
import { emitter, EventName } from '../../../utils/emitter';
import { CarControl } from './car-control';

export class Car<T extends HTMLElement = HTMLElement> extends Component {
  private track = new Input({
    type: 'range',
    className: 'car__track',
    ariaLabel: 'car',
    min: '0',
    value: '0',
    step: '1',
    disabled: true,
  });

  public control: CarControl;

  constructor(carData: ICarData, props?: ComponentProps<T>) {
    super({ ...props, className: 'car' });

    const name = new Component({ tag: 'span', className: 'car__name', textContent: carData.name });

    this.track.style.setProperty('--car-color', carData.color);

    const buttons = this.createButtons();

    this.control = new CarControl(carData.id, this.track.node, buttons.start.node, buttons.stop.node);
    this.control.stopButtonToggle(false);

    this.append(...Object.values(buttons), name, this.track);
  }

  private createButtons(): Record<CarButton, Button> {
    return Object.values(CarButton).reduce((acc, button) => {
      const [ariaLabel, className] = [`car ${button} button`, `car__button car__${button}`];
      const onclick = (): void => emitter.emit(EventName.carBtnClicked, button, this.control);
      return Object.assign(acc, { [button]: new Button({ ariaLabel, className, onclick }) });
    }, {} as Record<CarButton, Button>);
  }
}
