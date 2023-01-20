import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { emitter, EventName } from '../../../utils/emitter';

export class RaceControl extends Component {
  constructor(props?: ComponentProps) {
    super({ ...props, className: 'garage__race-control-bar' });

    const startBtn = new Button({ className: 'garage__race-control-button', textContent: 'Start' });
    startBtn.addEventListener('click', () => emitter.emit(EventName.startBtnClicked));

    const resetBtn = new Button({ className: 'garage__race-control-button', textContent: 'Reset' });
    resetBtn.addEventListener('click', () => emitter.emit(EventName.resetBtnClicked));

    const generateBtn = new Button({ className: 'garage__race-control-button', textContent: 'Generate Cars' });
    generateBtn.addEventListener('click', () => emitter.emit(EventName.generateBtnClicked));

    this.append(startBtn, resetBtn, generateBtn);
  }
}
