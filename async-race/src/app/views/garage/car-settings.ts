import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { ICarSettings } from '../../../types/interfaces';
import { emitter, EventName } from '../../../utils/emitter';

export class CarSettings extends Component<HTMLFormElement> {
  constructor(settings: ICarSettings, props?: ComponentProps<HTMLFormElement>) {
    super({ ...props, tag: 'form', className: 'car-settings' });
    if (props?.className) {
      this.node.classList.add(props.className);
    }

    const defaults = { name: '', color: '#038681' };
    const currentSettings = { carData: defaults, ...settings };

    const name = new Input({
      className: 'car-settings__name',
      placeholder: 'Car Name',
      type: 'text',
      ariaLabel: 'car name input',
      value: currentSettings.carData.name,
      oninput: (): void => {
        currentSettings.carData.name = name.node.value;
      },
    });

    const color = new Input({
      className: 'car-settings__color',
      type: 'color',
      ariaLabel: 'car color picker',
      value: currentSettings.carData.color,
      oninput: (): void => {
        currentSettings.carData.color = color.node.value;
        this.node.style.setProperty('--car-color', currentSettings.carData.color);
        emitter.emit(EventName.colorPicked, currentSettings.carData.color);
      },
    });

    const submitBtn = new Button({ className: 'car-settings__submit', textContent: settings.action });
    this.node.addEventListener('submit', (e) => {
      e.preventDefault();
      emitter.emit(EventName.setCarSubmitted, currentSettings);
    });

    this.append(name, color, submitBtn);
  }
}
