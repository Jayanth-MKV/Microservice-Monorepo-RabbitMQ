import { Module } from '@nestjs/common';
import { MainAppController } from './main_app.controller';
import { MainAppService } from './main_app.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/main_app/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name , schema:UserSchema}]),
  ],
  controllers: [MainAppController],
  providers: [MainAppService],
})
export class MainAppModule {}
