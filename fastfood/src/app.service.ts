import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  // getHello(): string {
  //   return 'Hello World!';
  // }

  getHello(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

}
