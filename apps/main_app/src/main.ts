import { NestFactory } from '@nestjs/core';
import { MainAppModule } from './main_app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MainAppModule);


  const config = new DocumentBuilder()
    .setTitle('Main_App')
    .setDescription('The Main_App API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({}));
  app.enableVersioning({ type: VersioningType.URI });
  app.use(helmet());
  app.use(compression());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), () => {
    console.log('Main App running at 3000');
  });
}
bootstrap();
