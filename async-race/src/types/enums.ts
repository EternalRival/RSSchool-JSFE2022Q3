export enum StatusCode {
  OK = 200,
  NOT_FOUND = 404,
  CREATED = 201,
  BAD_REQUEST = 400,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum Route {
  GARAGE = 'garage',
  WINNERS = 'winners',
}

export enum CarButton {
  EDIT = 'edit',
  DELETE = 'delete',
  START = 'start',
  STOP = 'stop',
}

export enum CarSettingsAction {
  CREATE = 'create',
  UPDATE = 'update',
}

export enum CarModel {
  'Model 3' = 'Model 3',
  'Model S' = 'Model S',
  'Model X' = 'Model X',
  'Model Y' = 'Model Y',
  'Roadster' = 'Roadster',
  'Cybertruck' = 'Cybertruck',
  'Bolt EV' = 'Bolt EV',
  'I-Pace' = 'I-Pace',
  'Kona Electric' = 'Kona Electric',
  'Taycan Turbo' = 'Taycan Turbo',
  'Taycan Turbo S' = 'Taycan Turbo S',
  'e-Golf' = 'e-Golf',
  'Soul Electric' = 'Soul Electric',
  'e6' = 'e6',
  'Leaf' = 'Leaf',
  'Zoe' = 'Zoe',
  'i3' = 'i3',
  'dolphin' = 'dolphin',
  'eQ' = 'eQ',
}
export enum CarBrand {
  'Tesla' = 'Tesla',
  'Chevrolet' = 'Chevrolet',
  'Hyundai' = 'Hyundai',
  'Kia' = 'Kia',
  'Jaguar' = 'Jaguar',
  'Porche' = 'Porche',
  'BYD' = 'BYD',
  'Volkswagen' = 'Volkswagen',
  'Nissan' = 'Nissan',
  'Renault' = 'Renault',
  'Chery' = 'Chery',
  'BMW' = 'BMW',
}
