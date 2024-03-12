import { NestFactory } from '@nestjs/core';
import { StudentModule } from './student.module';

async function bootstrap() {
  const app = await NestFactory.create(StudentModule);
  await app.listen(3000);
}
bootstrap();
