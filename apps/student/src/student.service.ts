import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  async getHello(): Promise<string> {
    this.logger.debug('Hello from student');
    return 'Hello World! STUDENT';
  }
}
