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

  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  update(id: string, product: Product): Promise<Product> {
    product.id = +id
    console.log(product)
    return this.productRepository.save(product);
  }
}
