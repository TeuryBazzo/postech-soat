import { Injectable } from '@nestjs/common';
import { Order, StatusOrder } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) { }

  getAll(status: string): Promise<Order[]> {
    if (!status) {
      return this.ordersRepository.find();
    }
    return this.ordersRepository.findBy({status: +status});
  }

  save(order: Order): Promise<Order> {
    order.dateTime = Date.now().toString()
    return this.ordersRepository.save(order);
  }
}
