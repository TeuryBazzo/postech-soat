import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
  async sendPaymentNotification(data: any) {
    // Simular o envio da notificação para o webhook.site
    const webhookSiteUrl = 'https://webhook.site/ecf8d57c-8357-42fc-8ac4-45392574c85f';
    await axios.post(webhookSiteUrl, data);
  }
}