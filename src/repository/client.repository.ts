import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientRepository {
  getHello(): string {
    return 'Hello';
  }
}
