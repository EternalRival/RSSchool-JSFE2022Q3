import { CarBrand, CarModel, RequestMethod, Route, StatusCode } from '../types/enums';
import { ICarData, ICarEngineData, IRouteState, IWinner, IWinnerTableItem } from '../types/interfaces';
import { getRandomArrayItem, HexColor } from '../utils/utils';

export class Model {
  public state: Record<Route, IRouteState> = {
    [Route.GARAGE]: { page: 1, limit: 7, total: 0 },
    [Route.WINNERS]: { page: 1, limit: 10, total: 0 },
  };

  public race = {
    startTime: 0,
    inProgress: false,
    currentWinner: 0,
    winnerTime: 0,
    carsCrashed: 0,
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

  public async getCars(): Promise<ICarData[]> {
    const { page, limit } = this.state[Route.GARAGE];
    const url = `${this.domain}/${Route.GARAGE}?${this.buildQuery(['_page', page], ['_limit', limit])}`;
    const response = await fetch(url, {
      method: RequestMethod.GET,
    });
    this.state[Route.GARAGE].total = Number(response.headers.get('X-Total-Count'));

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
    const url = `${this.domain}/${Route.GARAGE}/${id}?id=${id}`;
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
        console.info(await response.text());
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
        console.info(await response.text());
        return response.status;
      default:
        return response.status;
    }
  }

  //* Winners

  // eslint-disable-next-line max-lines-per-function
  public async getWinners(sortParams?: {
    _sort: 'id' | 'wins' | 'time';
    _order: 'ASC' | 'DESC';
  }): Promise<IWinnerTableItem[]> {
    const { page, limit } = this.state[Route.WINNERS];

    const queryParams: [string, unknown][] = Object.entries({ _page: page, _limit: limit });
    if (sortParams) {
      queryParams.push(...Object.entries(sortParams));
    }

    const url = `${this.domain}/${Route.WINNERS}?${this.buildQuery(...queryParams)}`;
    const response = await fetch(url, {
      method: RequestMethod.GET,
    });
    this.state[Route.WINNERS].total = Number(response.headers.get('X-Total-Count'));

    switch (response.status) {
      case StatusCode.OK:
        return Promise.all(
          (await response.json()).map(async (winner: IWinner, index: number) => {
            const { color, name } = await this.getCar(winner.id);
            return { number: index + 1, car: color, name, wins: winner.wins, time: winner.time };
          }),
        );
      default:
        return [];
    }
  }
  public async getWinner(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  public async createWinner(): Promise<unknown> {
    const winner = { id: this.race.currentWinner, wins: 1, time: this.race.winnerTime };
    const url = `${this.domain}/${Route.WINNERS}`;
    const response = await fetch(url, {
      method: RequestMethod.POST,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });
    return response;
  }
  public async deleteWinner(id: number): Promise<unknown> {
    const url = `${this.domain}/${Route.WINNERS}/${id}?id=${id}`;
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

  public async updateWinner(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  //* Misc

  /*   private async responseHandler<T>(response: Response): Promise<T> {
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
  } */
}
