import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) { }

  getHello(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  save(order: Order): Promise<Order> {

    order.dateTime = new Date().toDateString();

    return this.ordersRepository.save(order);
  }

}
