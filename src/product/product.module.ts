import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { CreateProductuseCase } from "./useCases/createProduct.useCase";
import { DeleteProductuseCase } from "./useCases/deleteProduct.useCase";
import { GetAllProductsuseCase } from "./useCases/getAllProducts.useCase";
import { GetProductsByCategoryuseCase } from "./useCases/getProductsByCategory.useCase";
import { UpdateProductuseCase } from "./useCases/updateProduct.useCase";
import { GetProductsByCodeuseCase } from "./useCases/getProductsByCode.useCase";
import { ReponseHttpHelper } from "../presentation/helpers/excption.http.helper";

@Module({
    imports: [        
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [ 
        ProductRepository,
        CreateProductuseCase,
        DeleteProductuseCase,
        GetAllProductsuseCase,
        GetProductsByCategoryuseCase,
        UpdateProductuseCase,
        GetProductsByCodeuseCase,
        ReponseHttpHelper
    ],
    exports: [
        GetProductsByCodeuseCase
    ]
})
export class ProductModule {
constructor() { }
}
