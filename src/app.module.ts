import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OrderModule,
    ProductModule, 
    ClientModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfigService,
      inject: [DBConfigService]
    })
  ],
})
export class AppModule {}
