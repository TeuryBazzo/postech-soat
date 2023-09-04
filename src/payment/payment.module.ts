import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { SendPayamentUserCase } from './userCases/sendPayment.userCase';
import { ReponseHttpHelper } from 'src/presentation/helpers/excption.http.helper';

@Module({
  controllers: [PaymentController],
  providers: [
    SendPayamentUserCase,
    ReponseHttpHelper
  ],
})
export class PaymentModule {}