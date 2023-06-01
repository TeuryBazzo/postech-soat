import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Order } from './order.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<Order[]> {
    return this.appService.getHello();
  }
}
