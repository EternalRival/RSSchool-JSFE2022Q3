import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth() {
    return [{ auth: 'kek' }];
  }
}
