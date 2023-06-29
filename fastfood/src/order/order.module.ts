import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Order } from './order.entity';
import { Cart, ItemCart } from 'src/cart/cart.entity';
import { Product } from 'src/product/product.entity';
import { Client } from 'src/client/client.entity';
import { ClientController } from 'src/client/client.controller';
import { ClientService } from 'src/client/client.service';
import { IsUniqueCpf } from 'src/client/validations/isUniqueCpf.validation';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';
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
    TypeOrmModule.forFeature([Order, Client, Product])
  ],
  controllers: [OrderController, ClientController, ProductController],
  providers: [OrderService, ClientService, ProductService, IsUniqueCpf],
})
export class OrderModule {
  constructor(private dataSource: DataSource) { }
}
