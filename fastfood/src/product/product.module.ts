import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { DataSource } from "typeorm";
import { ProductService } from "./product.service";

@Module({
imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'soatuser',
    password: 'soatpassword',
    database: 'soatdb',
    entities: [Product],
    synchronize: true,
    }),
    TypeOrmModule.forFeature([Product])
],
controllers: [ProductController],
providers: [ProductService],
})
export class ProductModule {
constructor(private dataSource: DataSource) { }
}
