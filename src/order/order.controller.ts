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
import { ReponseHttpHelper } from 'src/presentation/helpers/excption.http.helper';
import { HttpStatusCode } from 'axios';

@Controller("api/v1/orders")
@ApiTags('orders')
export class OrderController {
  constructor(
    private readonly reponseHttpHelper: ReponseHttpHelper,
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
  async getAll(@Query('status') status: string): Promise<ResponseDTO> {

    try {
      const orders = status ?
        await this.getOrdersByStatusUserCase.handle(status) :
        await this.getAllOrdersUserCase.handle();

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, '', orders)
    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }


  @Get("unfinished")
  @ApiOperation({ summary: 'get orders unfinished' })
  async getAllUnfinished(): Promise<ResponseDTO> {
    try {
      const orders = await this.getOrdersUnfinishedUserCase.handle();

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, '', orders)
    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

  @Get("/:id/status-pagamento")
  @ApiOperation({ summary: 'get order payment status' })
  async getPaymentStatus(@Param('id') orderId: string): Promise<ResponseDTO> {
    try {

      const order = await this.getOrderByIdUserCase.handle(+orderId);

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, '', order.paymentstatus)

    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

  @Post()
  @ApiBody({
    type: CreateOrderDTO
  })
  @ApiOperation({ summary: 'create order' })
  async post(@Body() orderDto: CreateOrderDTO): Promise<ResponseDTO> {
    try {
      let order = await this.createOrderUserCase.handle(orderDto);
      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Created, '', order)

    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

  @Put("checkout")
  @ApiOperation({ summary: 'finish de order' })
  async put(@Query('orderId') orderId: number): Promise<any> {
    try {
      let order = await this.checkoutOrderUserCase.handle(orderId)

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, 'order was finished', order)
    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

  @Patch("/:id/status")
  @ApiOperation({ summary: 'update status order' })
  async updateStatus(@Param('id') orderId: number, @Body() updateStatusOrderDTO: UpdateStatusOrderDTO): Promise<any> {
    try {
      let order = await this.updateStatusOrderUserCase.handle(orderId, updateStatusOrderDTO)

      return this.reponseHttpHelper.handleReponse(HttpStatusCode.Ok, 'status was updated', order)
    } catch (error) {
      return this.reponseHttpHelper.handleException(error);
    }
  }

}
