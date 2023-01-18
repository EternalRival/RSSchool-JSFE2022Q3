import { CarData } from '../types/interfaces';
import { HexColor } from '../utils/utils';

export class Model {
  private defaultCarName = 'Tesla';

  public createCar(carData: CarData): Promise<Response> {
    const car = {
      name: carData.name || this.defaultCarName,
      color: HexColor.isColor(carData.color) ? carData.color : HexColor.random,
    };
    return fetch('http://localhost:3000/garage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
  }
}
