import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentWebhookDto } from './dto/createPayment.dto';
import { PaymentService } from './payment.service';

@Controller('/api/v1/webhook')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('createPayment')
  async createPaymentWebhook(@Body() data: PaymentWebhookDto) {
    try {
      console.log('Received payment webhook:', data);
      await this.paymentService.sendPaymentNotification(data);
      
      return { success: true };
    } catch (error) {
      
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('receivePayment') // Rota que vai receber a notificação
  receivePaymentNotification(@Body() data: any) {
    try {
      // Processar a notificação
      console.log('Received payment notification:', data);

      if (data.status === 'approved') {
        console.log('Payment was approved.');
        
      } else if (data.status === 'rejected') {
        console.log('Payment was rejected.');
        
      } else {
        console.log('Unknown payment status:', data.status);
        // Tratar outros casos de status de pagamento, se necessário
      }

      return { success: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}






