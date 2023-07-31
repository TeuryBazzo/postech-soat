import { Body, Controller, Get, Post, Query, Param } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/payments')
@ApiTags('payments')
export class PaymentController {

    @Post()
    @ApiOperation({ summary: 'create payment order' })
    post(){
        return {};
    }

    @Post()
    handleWebhookEvent(@Body() payload: any) {
    // Aqui você irá processar a notificação recebida do webhook
    // Verificar se o pagamento foi aprovado ou recusado e realizar as ações necessárias
    console.log('Payload:', payload);
  }
}
