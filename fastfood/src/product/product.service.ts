import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  save(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
