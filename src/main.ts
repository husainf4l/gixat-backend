import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  ); app.setGlobalPrefix('api');
  app.enableCors({});
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
