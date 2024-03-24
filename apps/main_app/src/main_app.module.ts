import { Module } from '@nestjs/common';
import { MainAppController } from './main_app.controller';
import { MainAppService } from './main_app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule,AuthModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { STUDENT_SERVICE } from './constants/services';
import { UsersRepository } from './repositories/user.repository';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.string().required(),
      }),
      envFilePath: './apps/main_app/.env',
    }),
    ThrottlerModule.forRoot([
      { name: 'short', limit: 5, ttl: 1000 },
      { name: 'long', limit: 100, ttl: 60000 },
    ]),
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RmqModule.register({
      name: STUDENT_SERVICE,
    }),
    AuthModule
  ],
  controllers: [MainAppController],
  providers: [
    MainAppService,
    UsersRepository,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class MainAppModule {}
