import { Injectable } from '@nestjs/common';

@Injectable()
export class DateGenerator {
  getDate(): string {
    return new Date().toISOString();
  }
}
