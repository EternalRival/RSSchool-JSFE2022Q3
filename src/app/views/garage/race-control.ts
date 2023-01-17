import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';

export class RaceControl extends Component {
  public startBtn = new Button({ parent: this, className: 'garage__race-control-button', textContent: 'Start' });
  public resetBtn = new Button({ parent: this, className: 'garage__race-control-button', textContent: 'Reset' });
  public generateBtn = new Button({
    parent: this,
    className: 'garage__race-control-button',
    textContent: 'Generate Cars',
  });

  constructor(props?: ComponentProps) {
    super({ ...props, className: 'garage__race-control-bar' });
  }
}
