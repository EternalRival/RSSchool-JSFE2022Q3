import { CarSettingsAction } from './enums';

export interface ICarData {
  name: string;
  color: string;
  id: number;
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

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}
export interface IWinnerTableItem {
  number: number;
  car: string;
  name: string;
  wins: number;
  time: number;
}
