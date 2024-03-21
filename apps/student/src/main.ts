import { NestFactory } from '@nestjs/core';
import { StudentModule } from './student.module';
import { RmqService } from '@app/common';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(StudentModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('STUDENT'));
  await app.startAllMicroservices();
  await app.listen(3001, () => {
    console.log("student started at 3001")
  });


  const logger = new Logger();
  // // const configService = new ConfigService();
  // // const rmqService = new RmqService(configService);
  // // const options = rmqService.getOptions('STUDENT');
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   StudentModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
        
  //       urls: [
  //         'amqp://localhost:5672'
  //     ],
  //     queue:'STUDENT',
  //     noAck:false,
  //     queueOptions: {
  //       durable: true,
  //     },
  //     prefetchCount: 1,
  //   }
  //     // persistance: true,
  //   },
  // );
  // await app.listen(3001);
  logger.log('Student service started successfully');


}

bootstrap();
