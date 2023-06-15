import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Order } from './order.entity';
import { Cart, ItemCart } from 'src/cart/cart.entity';
import { Product } from 'src/product/product.entity';
import { Client } from 'src/client/client.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'soatuser',
      password: 'soatpassword',
      database: 'soatdb',
      entities: [Order, Cart, ItemCart, Product, Client],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {
  constructor(private dataSource: DataSource) { }
}
