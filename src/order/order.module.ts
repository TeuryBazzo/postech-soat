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
import { IsUniqueCpf } from 'src/client/validations/isuniquecpf.validation';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Client, Product])
  ],
  controllers: [OrderController, ClientController],
  providers: [OrderService, ClientService, IsUniqueCpf],
})
export class OrderModule {
  constructor(private dataSource: DataSource) { }
}
