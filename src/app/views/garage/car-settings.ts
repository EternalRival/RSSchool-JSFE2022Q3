import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { CarSettingsAction } from '../../../types/enums';
import { CarData } from '../../../types/interfaces';
import { emitter, EventName } from '../../../utils/emitter';

export class CarSettings extends Component<HTMLFormElement> {
  constructor(action: CarSettingsAction, props?: ComponentProps<HTMLFormElement>) {
    super({ ...props, tag: 'form', className: 'car-settings' });
    if (props?.className) {
      this.node.classList.add(props.className);
    }

    const name = new Input({
      className: 'car-settings__name',
      placeholder: 'Car Name',
      type: 'text',
      ariaLabel: 'car name input',
    });

    const color = new Input({
      className: 'car-settings__color',
      type: 'color',
      ariaLabel: 'car color picker',
      value: '#038681',
    });

    const submitBtn = new Button({ className: 'car-settings__submit', textContent: action });

    this.addEventListener('submit', (e) => {
      e.preventDefault();
      emitter.emit(EventName.setCarSubmitted, action, { name: name.value, color: color.value });
    });

    this.append(name, color, submitBtn);
  }
}
