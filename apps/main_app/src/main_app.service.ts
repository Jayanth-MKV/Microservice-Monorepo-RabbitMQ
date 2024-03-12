import { Injectable } from '@nestjs/common';

@Injectable()
export class MainAppService {
  getHello(): string {
    return 'Hello World - MainAPP!';
  }
}
