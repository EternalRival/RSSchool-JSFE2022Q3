import { CarBrand, CarModel, RequestMethod, Route } from '../types/enums';
import { CarData, RouteState } from '../types/interfaces';
import { getRandomArrayItem, HexColor } from '../utils/utils';

export class Model {
  public state: Record<Route, RouteState> = {
    [Route.GARAGE]: { page: 1, limit: 7, total: 0 },
    [Route.WINNERS]: { page: 1, limit: 10, total: 0 },
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

  public async createCar(carData: Omit<CarData, 'id'>): Promise<Response> {
    const url = `${this.domain}/${Route.GARAGE}`;
    const car = {
      name: carData.name || this.randomCarName,
      color: HexColor.isColor(carData.color) ? carData.color : HexColor.random,
    };
    const response = await fetch(url, {
      method: RequestMethod.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    this.state[Route.GARAGE].total += 1;
    return response;
  }

  public generateHundredCars(): Promise<Response>[] {
    return Array.from({ length: 100 }, () => this.createCar({ name: this.randomCarName, color: HexColor.random }));
  }

  public async deleteCar(id: number): Promise<Response> {
    const url = `${this.domain}/${Route.GARAGE}/${id}`;
    const response = await fetch(url, { method: RequestMethod.DELETE });
    return response;
  }
  public async updateCar(carData: CarData): Promise<Response> {
    const url = `${this.domain}/${Route.GARAGE}/${carData.id}`;
    const response = await fetch(url, {
      method: RequestMethod.PUT,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData),
    });
    return response;
  }

  public async getCars(route: Route): Promise<CarData[]> {
    const { page, limit } = this.state[route];
    const url = `${this.domain}/${route}?_page=${page}&_limit=${limit}`;
    const response = await fetch(url, { method: RequestMethod.GET });
    const json = await response.json();
    this.state[route].total = Number(response.headers.get('X-Total-Count'));
    return json;
  }
}
