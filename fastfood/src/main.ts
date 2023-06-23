import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order/order.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  
  //Pipes
  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(OrderModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('fasfood soat1')
    .setDescription('API de pedidos')
    .setVersion('1.0')
    .addTag('fastfood')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
