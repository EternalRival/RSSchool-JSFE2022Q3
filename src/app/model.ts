import { CarBrand, CarModel, Route } from '../types/enums';
import { CarData } from '../types/interfaces';
import { getRandomArrayItem, HexColor } from '../utils/utils';

export class Model {
  private domain = 'http://localhost:3000';
  private defaultCarName = 'Tesla';

  public createCar(carData: CarData): Promise<Response> {
    const car = {
      name: carData.name || this.defaultCarName,
      color: HexColor.isColor(carData.color) ? carData.color : HexColor.random,
    };
    return fetch(`${this.domain}/${Route.GARAGE}`, {
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

  public async getCars(queryParams?: { limit?: number; page?: number }): Promise<{ json: CarData[]; count: number }> {
    let url = `${this.domain}/${Route.GARAGE}`;
    if (queryParams) {
      const entries = Object.entries(queryParams);
      url += entries.length ? `?${entries.map(([key, value]) => `_${key}=${value}`).join('&')}` : '';
    }

    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { json, count };
  }
}
