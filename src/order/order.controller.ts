import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDTO } from './dto/createorder.dto';

@Controller("api/v1/orders")
export class OrderController {
  constructor(private readonly appService: OrderService) { }

  @Get()
  getAll(@Query('status') status: string): Promise<Order[]> {
    return this.appService.getAll(status);
  }

  @Post()
  post(@Body() order: CreateOrderDTO): Promise<Order> {
    console.log(order);
    
    return this.appService.save(order);
  }
}
