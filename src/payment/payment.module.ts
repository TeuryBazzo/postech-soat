import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { SendPayamentuseCase } from './useCases/sendPayment.useCase';
import { ReponseHttpHelper } from 'src/presentation/helpers/excption.http.helper';

@Module({
  controllers: [PaymentController],
  providers: [
    SendPayamentuseCase,
    ReponseHttpHelper
  ],
})
export class PaymentModule {}