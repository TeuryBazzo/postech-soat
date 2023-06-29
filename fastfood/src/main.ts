import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order/order.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Pipes
  app.useGlobalPipes(new ValidationPipe());
  
  useContainer(app.select(OrderModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
