import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Order } from './order.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'soatuser',
      password: 'soatpassword',
      database: 'soatdb',
      entities: [Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Order])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor(private dataSource: DataSource) {}  
}
