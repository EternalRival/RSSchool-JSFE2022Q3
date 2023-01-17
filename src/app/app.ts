import { View } from '../types/enums';
import { Model } from './model';
import { AppView } from './view';

export class App {
  private model = new Model();
  private view = new AppView();

  public run(): void {
    console.info('App started!');
    this.initListeners();
  }

  private initListeners(): void {
    const { garageBtn, winnersBtn } = this.view.header.nodes;
    garageBtn.addEventListener('click', () => this.view.setView(View.GARAGE));
    winnersBtn.addEventListener('click', () => this.view.setView(View.WINNERS));
    // console.log(this.view.views.get(View.GARAGE).nodes);
    /*     const { garageBtn, winnersBtn } = this.view.header;
    const { submitBtn } = this.view.garage.createBar;
    const { startBtn, resetBtn, generateBtn } = this.view.garage.controlBar;
    garageBtn.addEventListener('click', () => console.log('garageBtn clicked'));
    winnersBtn.addEventListener('click', () => console.log('winnersBtn clicked'));
    submitBtn.addEventListener('click', () => console.log('submitBtn clicked'));
    startBtn.addEventListener('click', () => console.log('startBtn clicked'));
    resetBtn.addEventListener('click', () => console.log('resetBtn clicked'));
    generateBtn.addEventListener('click', () => console.log('generateBtn clicked')); */
  }
}
