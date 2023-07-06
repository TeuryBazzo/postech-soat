import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Cart, ItemCart } from "src/cart/cart.entity";
import { Client } from "src/client/client.entity";
import { Order } from "src/order/order.entity";
import { Product } from "src/product/product.entity";

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }
    createTypeOrmOptions(): TypeOrmModuleOptions  {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [Client, Order, Cart, ItemCart, Product],
            synchronize: true
        }
    }
}