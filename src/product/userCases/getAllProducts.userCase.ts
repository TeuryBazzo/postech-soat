import { Injectable } from "@nestjs/common";
import { Product } from "../product.entity";
import { ProductRepository } from "../product.repository";

@Injectable()
export class GetAllProductsUserCase {

    constructor(
        private productRepository: ProductRepository,
      ) { }

      handle(): Promise<Product[]> {
        return this.productRepository.getAll();
      }
    
}