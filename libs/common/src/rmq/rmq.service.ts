import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { RmqContext, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false) {
    return {
      transport: Transport.RMQ,
      options: {
        
        urls: [this.configService.get<string>('RABBITMQ_URI'),
      ],
      queue:this.configService.get<string>(`RABBITMQ_${queue}_QUEUE`),
      noAck,
      queueOptions: {
        durable: true,
      },
      // persistance: true,
    }
    };
  }

  ack(ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    channel.ack(originalMsg);
  }

}
