import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { DataSource } from "typeorm";
import { ProductRepository } from "./product.repository";
import { CreateProductUserCase } from "./userCases/createProduct.userCase";
import { DeleteProductUserCase } from "./userCases/deleteProduct.userCase";
import { GetAllProductsUserCase } from "./userCases/getAllProducts.userCase";
import { GetProductsByCategoryUserCase } from "./userCases/getProductsByCategory.userCase";
import { UpdateProductUserCase } from "./userCases/updateProduct.userCase";

@Module({
    imports: [        
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [ 
        ProductRepository,
        CreateProductUserCase,
        DeleteProductUserCase,
        GetAllProductsUserCase,
        GetProductsByCategoryUserCase,
        UpdateProductUserCase
    ],
})
export class ProductModule {
constructor() { }
}
