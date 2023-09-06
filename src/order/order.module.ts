import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';
import { Client } from '../client/client.entity';
import { OrderRepository } from './order.repository';
import { ClientModule } from '../client/client.module';
import { CheckoutOrderuseCase } from './useCases/checkoutOrder.useCase';
import { CreateOrderuseCase } from './useCases/createOrder.useCase';
import { GetAllOrdersuseCase } from './useCases/getAllOrders.useCase';
import { GetOrderByIduseCase } from './useCases/getOrderById.useCase';
import { GetOrdersByStatususeCase } from './useCases/getOrdersByStatus.useCase';
import { GetOrdersUnfinisheduseCase } from './useCases/getOrdersUnfinished.useCase';
import { UpdateStatusOrderuseCase } from './useCases/updateStatusOrder.useCase';
import { ProductModule } from '../product/product.module';
import { ReponseHttpHelper } from '../presentation/helpers/excption.http.helper';
import { Cart } from '../cart/cart.entity';


@Module({
  imports: [
    ClientModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, Client, Product, Cart])
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
