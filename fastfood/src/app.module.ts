import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [OrderModule, ProductModule, ClientModule],
})
export class AppModule {}
