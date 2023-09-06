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
import { CheckoutOrderuseCase } from './useCases/checkoutOrder.useCase';
import { CreateOrderuseCase } from './useCases/createOrder.useCase';
import { GetAllOrdersuseCase } from './useCases/getAllOrders.useCase';
import { GetOrderByIduseCase } from './useCases/getOrderById.useCase';
import { GetOrdersByStatususeCase } from './useCases/getOrdersByStatus.useCase';
import { GetOrdersUnfinisheduseCase } from './useCases/getOrdersUnfinished.useCase';
import { UpdateStatusOrderuseCase } from './useCases/updateStatusOrder.useCase';
import { ProductModule } from 'src/product/product.module';
import { ReponseHttpHelper } from 'src/presentation/helpers/excption.http.helper';


@Module({
  imports: [
    ClientModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, Client, Product])
  ],
  controllers: [OrderController],
  providers: [
    ReponseHttpHelper,
    OrderRepository,
    CheckoutOrderuseCase,
    CreateOrderuseCase,
    GetAllOrdersuseCase,
    GetOrderByIduseCase,
    GetOrdersByStatususeCase,
    GetOrdersUnfinisheduseCase,
    UpdateStatusOrderuseCase
  ]
})
export class OrderModule {
  constructor() { }
}
