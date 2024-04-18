import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Shopping Cart API';
  }

  getTest(): string {
    return 'test string';
  }
}
