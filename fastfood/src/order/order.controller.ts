import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller()
export class OrderController {
  constructor(private readonly appService: OrderService) {}

  @Get()
  getHello(): Promise<Order[]> {
    return this.appService.getHello();
  }
}
