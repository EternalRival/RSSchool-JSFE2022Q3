import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { Input } from '../../../components/Input';

export class CarSettings extends Component<HTMLFormElement> {
  public nodes = {
    name: new Input({
      className: 'car-settings__name',
      placeholder: 'Car Name',
      type: 'text',
      ariaLabel: 'car name input',
    }),
    color: new Input({
      className: 'car-settings__color',
      type: 'color',
      ariaLabel: 'car color picker',
      value: '#00ff00',
    }),
    submitBtn: new Button({ className: 'car-settings__submit', textContent: 'submit' }),
  };

  constructor(props?: ComponentProps<HTMLFormElement> & { buttonText?: string }) {
    super({ ...props, tag: 'form', className: 'car-settings', method: 'POST' });
    if (props?.className) {
      this.node.classList.add(props.className);
    }
    if (props?.buttonText) {
      this.nodes.submitBtn.node.textContent = props.buttonText;
    }

    this.append(...Object.values(this.nodes));
  }
}
