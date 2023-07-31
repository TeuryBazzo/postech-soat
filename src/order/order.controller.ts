import { ConflictException, NotFoundException, Patch, Put } from '@nestjs/common';
import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrderDTO } from './dto/createorder.dto';
import { ResponseDTO } from 'src/product/dto/response.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateStatusOrderDTO } from './dto/updatestatusorder.dto';

@Controller("api/v1/orders")
@ApiTags('orders')
export class OrderController {
  constructor(private readonly appService: OrderService) { }

  @Get()
  @ApiOperation({ summary: 'get orders by status' })
  getAll(@Query('status') status: string): Promise<Order[]> {
    return this.appService.getAll(status);
  }

  @Get("/:id/status-pagamento")
  async getPaymentStatus(@Param('id') orderId: string): Promise<any> {
    const order = await this.appService.findById(+orderId);
    if (!order) {
      throw new NotFoundException('Order not found!');
    }
    return {paymentstatus: order.paymentstatus};
  }

  @Post()
  @ApiBody({
    type : CreateOrderDTO
  })
  @ApiOperation({ summary: 'create order' })
  post(@Body() orderDto: CreateOrderDTO): Promise<Order> {
    return this.appService.save(orderDto);
  }

  @Put("checkout")
  @ApiOperation({ summary: 'finish de order' })
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

  @Patch("/:id/status")
  @ApiOperation({ summary: 'update status order' })
  async updateStatus(@Param('id') orderId: string, @Body() updateStatusOrderDTO: UpdateStatusOrderDTO): Promise<any> {
    try {
      let order = await this.appService.updateStatus(orderId, updateStatusOrderDTO)
      return new ResponseDTO(200, 'status was updated', order)
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
