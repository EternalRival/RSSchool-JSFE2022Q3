import { Button } from '../../components/Button';
import { Component, ComponentProps } from '../../components/Component';
import { Input } from '../../components/Input';
import { Route } from '../../types/enums';
import { emitter, EventName } from '../../utils/emitter';

export class Pagination extends Component {
  constructor(route: Route, props?: ComponentProps) {
    super({ ...props, className: 'pagination' });

    const counter = new Input({
      className: 'pagination__counter',
      type: 'number',
      readOnly: true,
      value: '1',
      min: '1',
      ariaLabel: 'pagination counter',
    });

    const prevBtn = new Button({
      className: 'pagination__button',
      textContent: 'Prev',
      onclick: (): void => {
        counter.node.stepDown();
        emitter.emit(EventName.pageChanged, route, counter);
      },
    });
    const nextBtn = new Button({
      className: 'pagination__button',
      textContent: 'Next',
      onclick: (): void => {
        counter.node.stepUp();
        emitter.emit(EventName.pageChanged, route, counter);
      },
    });

    this.append(prevBtn, counter, nextBtn);
  }
}
