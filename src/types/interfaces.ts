import { CarSettingsAction } from './enums';

export interface ICarData {
  name: string;
  color: string;
  id: number;
}
export interface ICarControl {
  driving?: ReturnType<typeof setInterval>;
  id: ICarData['id'];
  drive: (engineData: ICarEngineData) => void;
  pause: () => void;
  stop: () => void;
}
export interface ICarEngineData {
  velocity: number;
  distance: number;
}
export interface IRouteState {
  page: number;
  limit: number;
  total: number;
}

export interface ICarSettings {
  action: CarSettingsAction;
  carData?: ICarData;
}
