import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { DataSource } from "typeorm";
import { ProductService } from "./product.service";
import { ConfigModule } from "@nestjs/config";
import { ProductRepository } from "./product.repository";

@Module({
    imports: [        
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
})
export class ProductModule {
constructor(private dataSource: DataSource) { }
}
