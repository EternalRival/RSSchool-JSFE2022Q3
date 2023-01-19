import { CarBrand, CarModel, Route } from '../types/enums';
import { CarData } from '../types/interfaces';
import { getRandomArrayItem, HexColor } from '../utils/utils';

export class Model {
  public state: Record<Route, { page: number; limit: number; totalQuantity: number }> = {
    [Route.GARAGE]: { page: 1, limit: 7, totalQuantity: 0 },
    [Route.WINNERS]: { page: 1, limit: 10, totalQuantity: 0 },
  };

  private domain = 'http://localhost:3000';

  private carDefaultNames: Record<string, string[]> = {
    brands: Object.values(CarBrand),
    models: Object.values(CarModel),
  };

  private get randomCarName(): string {
    const { brands, models } = this.carDefaultNames;
    return `${getRandomArrayItem(brands)} ${getRandomArrayItem(models)}`;
  }

  public async createCar(carData: CarData): Promise<Response> {
    const car = {
      name: carData.name || this.randomCarName,
      color: HexColor.isColor(carData.color) ? carData.color : HexColor.random,
    };
    const response = await fetch(`${this.domain}/${Route.GARAGE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    this.state[Route.GARAGE].totalQuantity += 1;
    return response;
  }

  public generateHundredCars(): Promise<Response>[] {
    return Array.from({ length: 100 }, () => this.createCar({ name: this.randomCarName, color: HexColor.random }));
  }
  /* 
  public async getCars(queryParams?: { limit?: number; page?: number }): Promise<CarData[]> {
    const route = Route.GARAGE;
    let url = `${this.domain}/${route}`;
    if (queryParams) {
      const entries = Object.entries(queryParams);
      url += entries.length ? `?${entries.map(([key, value]) => `_${key}=${value}`).join('&')}` : '';
    }

    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();
    this.state[route].totalQuantity = Number(response.headers.get('X-Total-Count'));
    return json;
  } */

  public async getCars(route: Route): Promise<CarData[]> {
    const { page, limit } = this.state[route];
    const url = `${this.domain}/${route}?_page=${page}&_limit=${limit}`;
    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();
    this.state[route].totalQuantity = Number(response.headers.get('X-Total-Count'));
    return json;
  }
}
