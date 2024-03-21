import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.studentService.getHello();
  }

  @EventPattern('sayhello')
  async handleSayHello(@Payload() data: any, @Ctx() ctx: RmqContext) {
    console.log('Ctx: ', ctx.getPattern());
    console.log('Data: ', data);
    await this.studentService.getHello();
    this.rmqService.ack(ctx);
  }
}
