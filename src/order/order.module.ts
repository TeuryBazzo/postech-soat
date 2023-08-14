import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/product/product.entity';
import { Client } from 'src/client/client.entity';
import { ClientController } from 'src/client/client.controller';
import { ClientService } from 'src/client/client.service';
import { IsUniqueCpf } from 'src/client/validations/isuniquecpf.validation';
import { ClientRepository } from 'src/client/client.repository';
import { OrderRepository } from './order.repository';
import { ProductRepository } from 'src/product/product.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Client, Product])
  ],
  controllers: [OrderController, ClientController],
  providers: [OrderService,
     ClientService,
     IsUniqueCpf,
     ClientRepository,
     OrderRepository,
     ProductRepository
    ]
})
export class OrderModule {
  constructor(private dataSource: DataSource) { }
}
