import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order/order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  await app.listen(3000);
}
bootstrap();
