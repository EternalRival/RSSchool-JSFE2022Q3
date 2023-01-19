import { Button } from '../../components/Button';
import { Component, ComponentProps } from '../../components/Component';
import { Input } from '../../components/Input';

export class Pagination extends Component {
  public nodes = {
    counter: new Input({
      className: 'pagination__counter',
      type: 'number',
      readOnly: true,
      value: '1',
      min: '1',
      ariaLabel: 'pagination counter',
    }),
  };

  constructor(props?: ComponentProps) {
    super({ ...props, className: 'pagination' });

    const { counter } = this.nodes;

    const prevBtn = new Button({
      className: 'pagination__button',
      textContent: 'Prev',
      onclick: (): void => {
        counter.node.stepDown();
        counter.node.dispatchEvent(new Event('change'));
      },
    });
    const nextBtn = new Button({
      className: 'pagination__button',
      textContent: 'Next',
      onclick: (): void => {
        counter.node.stepUp();
        counter.node.dispatchEvent(new Event('change'));
      },
    });

    this.append(prevBtn, counter, nextBtn);
  }
}
