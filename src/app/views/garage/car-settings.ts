import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';
import { CarData } from '../../../types/interfaces';

export class CarSettings extends Component<HTMLFormElement> {
  public nodes = {
    submitBtn: new Button({ className: 'car-settings__submit', textContent: 'submit' }),
  };
  private name = new Input({
    className: 'car-settings__name',
    placeholder: 'Car Name',
    type: 'text',
    ariaLabel: 'car name input',
  });
  private color = new Input({
    className: 'car-settings__color',
    type: 'color',
    ariaLabel: 'car color picker',
    value: '#00ff00',
  });

  constructor(props?: ComponentProps<HTMLFormElement> & { buttonText?: string }) {
    super({ ...props, tag: 'form', className: 'car-settings' });
    if (props?.className) {
      this.node.classList.add(props.className);
    }
    if (props?.buttonText) {
      this.nodes.submitBtn.node.textContent = props.buttonText;
    }

    this.append(this.name, this.color, ...Object.values(this.nodes));
  }

  public getCarData(): CarData {
    const { name, color } = this;
    return { name: name.value, color: color.value };
  }
}
