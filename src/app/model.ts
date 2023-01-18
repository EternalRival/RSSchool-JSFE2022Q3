import { CarBrand, CarModel } from '../types/enums';
import { CarData } from '../types/interfaces';
import { getRandomArrayItem, HexColor } from '../utils/utils';

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

  public generateHundredCars(): Promise<Response>[] {
    const [carBrands, carModels] = [Object.values(CarBrand), Object.values(CarModel)];
    const getRandomCarName = (): string => `${getRandomArrayItem(carBrands)} ${getRandomArrayItem(carModels)}`;
    return Array.from({ length: 100 }, () => this.createCar({ name: getRandomCarName(), color: HexColor.random }));
  }
}
