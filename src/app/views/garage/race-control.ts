import { Button } from '../../../components/Button';
import { Component, ComponentProps } from '../../../components/Component';
import { emitter, EventName } from '../../../utils/emitter';

export class RaceControl extends Component {
  private startBtn: HTMLButtonElement;
  private resetBtn: HTMLButtonElement;

  constructor(props?: ComponentProps) {
    super({ ...props, className: 'garage__race-control-bar' });

    const startBtn = new Button({ className: 'garage__race-control-button', textContent: 'Start' });
    startBtn.node.addEventListener('click', () => emitter.emit(EventName.startBtnClicked));

    const resetBtn = new Button({ className: 'garage__race-control-button', textContent: 'Reset' });
    resetBtn.node.addEventListener('click', () => emitter.emit(EventName.resetBtnClicked));

    const generateBtn = new Button({ className: 'garage__race-control-button', textContent: 'Generate Cars' });
    generateBtn.node.addEventListener('click', () => emitter.emit(EventName.generateBtnClicked));

    [this.startBtn, this.resetBtn] = [startBtn.node, resetBtn.node];
    this.append(startBtn, resetBtn, generateBtn);
  }

  public toggleRaceButtons(mode: boolean): void {
    if (mode) {
      this.toggleResetButton(true)
    } else {
      this.toggleStartButton(false)
      this.toggleResetButton(false)
    }
  }
  public toggleStartButton(mode: boolean): void {
    this.startBtn.disabled = !mode;
  }
  public toggleResetButton(mode: boolean): void {
    this.resetBtn.disabled = !mode;
  }
}
