import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
import { Client } from 'src/client/client.entity';
import { ClientController } from 'src/client/client.controller';
import { ClientRepository } from 'src/client/client.repository';
import { OrderRepository } from './order.repository';
import { ProductRepository } from 'src/product/product.repository';
import { ClientModule } from 'src/client/client.module';
import { CheckoutOrderUserCase } from './userCases/checkoutOrder.userCase';
import { CreateOrderUserCase } from './userCases/createOrder.userCase';
import { GetAllOrdersUserCase } from './userCases/getAllOrders.userCase';
import { GetOrderByIdUserCase } from './userCases/getOrderById.userCase';
import { GetOrdersByStatusUserCase } from './userCases/getOrdersByStatus.userCase';
import { GetOrdersUnfinishedUserCase } from './userCases/getOrdersUnfinished.userCase';
import { UpdateStatusOrderUserCase } from './userCases/updateStatusOrder.userCase';
import { ProductModule } from 'src/product/product.module';


@Module({
  imports: [
    ClientModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, Client, Product])
  ],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    CheckoutOrderUserCase,
    CreateOrderUserCase,
    GetAllOrdersUserCase,
    GetOrderByIdUserCase,
    GetOrdersByStatusUserCase,
    GetOrdersUnfinishedUserCase,
    UpdateStatusOrderUserCase
  ]
})
export class OrderModule {
  constructor() { }
}
