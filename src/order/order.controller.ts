import { ConflictException, NotFoundException, Put } from '@nestjs/common';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDTO } from './dto/createorder.dto';
import { ResponseDTO } from 'src/product/dto/response.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller("api/v1/orders")
export class OrderController {
  constructor(private readonly appService: OrderService) { }

  @Get()
  getAll(@Query('status') status: string): Promise<Order[]> {
    return this.appService.getAll(status);
  }

  @Post()
  @ApiBody({
    type : CreateOrderDTO
  })
  post(@Body() orderDto: CreateOrderDTO): Promise<Order> {
    return this.appService.save(orderDto);
  }

  @Put("checkout")
  async put(@Query('orderId') orderId:number): Promise<any> {
    try {
      let order = await this.appService.fakeCheckout(orderId)

      var data =  {
        valorTotal : 10.95,
        pagamento : 'Pix',
        resume : order
      }
      return new ResponseDTO(201, 'order was finished', data)
    } catch (error) {
      return this.handleResponseError(error)
    }
  }
  
  handleResponseError (error: any): ResponseDTO {
    if (error instanceof NotFoundException) {
      return new ResponseDTO(404, 'order not found', null)
    } else if (error instanceof ConflictException) {
      return new ResponseDTO(409, 'code already exists', null)
    }
    return new ResponseDTO(500, 'internal server error', null)
  }

}
