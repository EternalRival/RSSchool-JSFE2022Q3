import { CarBrand, CarModel, RequestMethod, Route, StatusCode } from '../types/enums';
import { ICarData, ICarEngineData, IRouteState } from '../types/interfaces';
import { getRandomArrayItem, HexColor } from '../utils/utils';

export class Model {
  public state: Record<Route, IRouteState> = {
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

  private buildQuery(...params: [string, unknown][]): string {
    return params.map(([key, value]) => `${key}=${value}`).join('&');
  }

  //* Garage

  public async getCars(route: Route): Promise<ICarData[]> {
    const { page, limit } = this.state[route];
    const url = `${this.domain}/${route}?${this.buildQuery(['_page', page], ['_limit', limit])}`;
    const response = await fetch(url, {
      method: RequestMethod.GET,
    });
    this.state[route].total = Number(response.headers.get('X-Total-Count'));

    switch (response.status) {
      case StatusCode.OK:
        return response.json();
      default:
        return [];
    }
  }

  public async getCar(id: number): Promise<ICarData> {
    const url = `${this.domain}/${Route.GARAGE}/${id}?${this.buildQuery(['id', id])}`;
    const response = await fetch(url, {
      method: RequestMethod.GET,
    });

    switch (response.status) {
      case StatusCode.OK:
      case StatusCode.NOT_FOUND:
        return response.json();
      default:
        return {} as ICarData;
    }
  }

  public async createCar(carData: Omit<ICarData, 'id'>): Promise<unknown> {
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

    switch (response.status) {
      case StatusCode.CREATED:
        return response.json();
      default:
        return {};
    }
  }

  public generateHundredCars(): Promise<unknown>[] {
    return Array.from({ length: 100 }, () => this.createCar({ name: this.randomCarName, color: HexColor.random }));
  }

  public async deleteCar(id: number): Promise<unknown> {
    const url = `${this.domain}/${Route.GARAGE}/${id}`;
    const response = await fetch(url, {
      method: RequestMethod.DELETE,
    });

    switch (response.status) {
      case StatusCode.OK:
      case StatusCode.NOT_FOUND:
        return response.json();
      default:
        return {};
    }
  }

  public async updateCar(carData: ICarData): Promise<unknown> {
    console.log('m', carData);
    const url = `${this.domain}/${Route.GARAGE}/${carData.id}`;
    const response = await fetch(url, {
      method: RequestMethod.PUT,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData),
    });

    switch (response.status) {
      case StatusCode.OK:
      case StatusCode.NOT_FOUND:
        return response.json();
      default:
        return {};
    }
  }

  //* Engine

  public async toggleCarEngine(id: number, status: 'started' | 'stopped'): Promise<ICarEngineData | number> {
    const params = Object.entries({ id, status });
    const url = `${this.domain}/engine?${this.buildQuery(...params)}`;
    const response = await fetch(url, {
      method: RequestMethod.PATCH,
    });

    switch (response.status) {
      case StatusCode.OK:
        return response.json();
      case StatusCode.BAD_REQUEST:
      case StatusCode.NOT_FOUND:
        console.log(response.text());
        return response.status;
      default:
        return response.status;
    }
  }

  public async drive(id: number): Promise<unknown> {
    const status = 'drive';
    const params = Object.entries({ id, status });
    const url = `${this.domain}/engine?${this.buildQuery(...params)}`;

    const response = await fetch(url, {
      method: RequestMethod.PATCH,
    });

    switch (response.status) {
      case StatusCode.OK:
        return response.json();
      case StatusCode.BAD_REQUEST:
      case StatusCode.NOT_FOUND:
      case StatusCode.TOO_MANY_REQUESTS:
      case StatusCode.INTERNAL_SERVER_ERROR:
        console.log(response.text());
        return response.status;
      default:
        return response.status;
    }
  }

  //* Winners

  public async getWinners(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public async getWinner(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public async createWinner(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public async updateWinner(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  //* Misc

  private async responseHandler<T>(response: Response): Promise<T> {
    switch (response.status) {
      case StatusCode.OK:
      case StatusCode.CREATED:
        return response.json();
      case StatusCode.BAD_REQUEST:
      case StatusCode.NOT_FOUND:
      case StatusCode.TOO_MANY_REQUESTS:
      case StatusCode.INTERNAL_SERVER_ERROR:
      default:
        return response.json().catch(() => ({} as T));
    }
  }
}
