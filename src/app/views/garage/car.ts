import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { CarButton } from '../../../types/enums';
import { ICarControl, ICarData, ICarEngineData } from '../../../types/interfaces';
import { emitter, EventName } from '../../../utils/emitter';

export class Car<T extends HTMLElement = HTMLElement> extends Component {
  private track = new Input({
    type: 'range',
    className: 'car__track',
    ariaLabel: 'car',
    min: '0',
    value: '0',
    step: 'any',
    disabled: true,
  });
  private startButton: HTMLButtonElement;
  private stopButton: HTMLButtonElement;

  constructor(carData: ICarData, props?: ComponentProps<T>) {
    super({ ...props, className: 'car' });

    const name = new Component({ tag: 'span', className: 'car__name', textContent: carData.name });

    this.track.style.setProperty('--car-color', carData.color);

    const carControl: ICarControl = {
      id: carData.id,
      drive: (engineData: ICarEngineData): void => {
        [this.track.node.max, this.track.node.step] = [`${engineData.distance}`, `${engineData.velocity}`];
        carControl.driving = setInterval(() => this.track.node.stepUp());
        [this.startButton.disabled, this.stopButton.disabled] = [true, false];
      },
      pause: () => clearInterval(carControl.driving),
      stop: () => {
        carControl.pause()
        this.track.node.value = this.track.node.min;
        [this.startButton.disabled, this.stopButton.disabled] = [false, true];
      },
    };

    const buttons = this.createButtons(carControl);
    [this.startButton, this.stopButton] = [buttons.start.node, buttons.stop.node];
    this.stopButton.disabled = true;

    this.append(...Object.values(buttons), name, this.track);
  }

  private createButtons(carControl: ICarControl): Record<CarButton, Button> {
    return Object.values(CarButton).reduce((acc, button) => {
      const [ariaLabel, className] = [`car ${button} button`, `car__button car__${button}`];
      const onclick = (): void => emitter.emit(EventName.carBtnClicked, button, carControl);
      return Object.assign(acc, { [button]: new Button({ ariaLabel, className, onclick }) });
    }, {} as Record<CarButton, Button>);
  }
}
