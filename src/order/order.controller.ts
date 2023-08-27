import { CheckoutOrderUserCase } from './userCases/checkoutOrder.userCase';
import { ConflictException, NotFoundException, Patch, Put } from '@nestjs/common';
import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { Order } from './order.entity';
import { CreateOrderDTO } from './dto/createorder.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateStatusOrderDTO } from './dto/updatestatusorder.dto';
import { GetAllOrdersUserCase } from './userCases/getAllOrders.userCase';
import { GetOrdersUnfinishedUserCase } from './userCases/getOrdersUnfinished.userCase';
import { GetOrdersByStatusUserCase } from './userCases/getOrdersByStatus.userCase';
import { CreateOrderUserCase } from './userCases/createOrder.userCase';
import { UpdateStatusOrderUserCase } from './userCases/updateStatusOrder.userCase';
import { GetOrderByIdUserCase } from './userCases/getOrderById.userCase';
import { ResponseDTO } from 'src/presentation/helpers/response.dto';

@Controller("api/v1/orders")
@ApiTags('orders')
export class OrderController {
  constructor(
    private readonly createOrderUserCase: CreateOrderUserCase,
    private readonly getOrdersByStatusUserCase: GetOrdersByStatusUserCase,
    private readonly getAllOrdersUserCase: GetAllOrdersUserCase,
    private readonly getOrdersUnfinishedUserCase: GetOrdersUnfinishedUserCase,
    private readonly checkoutOrderUserCase: CheckoutOrderUserCase,
    private readonly updateStatusOrderUserCase: UpdateStatusOrderUserCase,
    private readonly getOrderByIdUserCase: GetOrderByIdUserCase,
    ) { }

  @Get()
  @ApiOperation({ summary: 'get orders by status' })
  async getAll(@Query('status') status: string): Promise<Order[]> {

    return status ?
      await this.getOrdersByStatusUserCase.handle(status) :
      await this.getAllOrdersUserCase.handle();
  }

  @Get("unfinished")
  @ApiOperation({ summary: 'get orders unfinished' })
  getAllUnfinished(): Promise<Order[]> {
    return this.getOrdersUnfinishedUserCase.handle();
  }


  @Get("/:id/status-pagamento")
  @ApiOperation({ summary: 'get order payment status' })
  async getPaymentStatus(@Param('id') orderId: string): Promise<any> {
    const order = await this.getOrderByIdUserCase.handle(+orderId);
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
    return this.createOrderUserCase.handle(orderDto);
  }

  @Put("checkout")
  @ApiOperation({ summary: 'finish de order' })
  async put(@Query('orderId') orderId:number): Promise<any> {
    try {
      let order = await this.checkoutOrderUserCase.handle(orderId)

      return new ResponseDTO(201, 'order was finished', order)
    } catch (error) {
      return this.handleResponseError(error)
    }
  }

  @Patch("/:id/status")
  @ApiOperation({ summary: 'update status order' })
  async updateStatus(@Param('id') orderId: number, @Body() updateStatusOrderDTO: UpdateStatusOrderDTO): Promise<any> {
    try {
      let order = await this.updateStatusOrderUserCase.handle(orderId, updateStatusOrderDTO)
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
