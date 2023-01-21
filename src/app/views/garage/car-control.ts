import { ICarData, ICarEngineData } from '../../../types/interfaces';
import { emitter, EventName } from '../../../utils/emitter';

export class CarControl {
  private driving?: ReturnType<typeof setInterval>;
  constructor(
    public id: ICarData['id'],
    private track: HTMLInputElement,
    private startButton: HTMLButtonElement,
    private stopButton: HTMLButtonElement,
  ) {}
  public drive(engineData: ICarEngineData): void {
    this.track.max = `${engineData.distance}`;
    this.driving = setInterval(() => {
      if (this.track.value === this.track.max) {
        this.pause();
        emitter.emit(EventName.carFinishedRace, this.id);
      }
      this.track.stepUp(engineData.velocity);
    });
  }
  public pause(): void {
    clearInterval(this.driving);
  }
  public stop(): void {
    this.pause();
    this.track.value = this.track.min;
  }
  public startButtonToggle(mode: boolean): void {
    this.startButton.disabled = !mode;
  }
  public stopButtonToggle(mode: boolean): void {
    this.stopButton.disabled = !mode;
  }
  public startRide(): void {
    this.startButton.click();
  }
  public stopRide(): void {
    this.stopButton.click();
  }
}
