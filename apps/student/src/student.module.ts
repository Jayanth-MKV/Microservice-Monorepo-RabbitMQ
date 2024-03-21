import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/student/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_STUDENT_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
