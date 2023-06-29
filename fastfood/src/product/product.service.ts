import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Not, Repository } from "typeorm";
import { CreateProductDTO } from "./dto/createproduct.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(createProductDto: CreateProductDTO): Promise<Product> {
    let product = new Product()
    product.code = createProductDto.code
    product.category = createProductDto.category
    product.description = createProductDto.description
    product.price = createProductDto.price

    const storedProduct = await this.productRepository.findOneBy({code: product.code})
  
    if (storedProduct) {
      throw new ConflictException()
    }
    return this.productRepository.save(product)
  }

  async update(id: string, product: Product): Promise<Product> {
    product.id = +id
    const otherProduct = await this.productRepository.findOne({
      where: {
        code: product.code,
        id: Not(product.id)
      }
    });
    if (otherProduct) {
      throw new ConflictException()
    }
    return this.productRepository.save(product);
  }

  async delete(id: string, product: Product): Promise<Product[]> {
    const storedProduct = await this.productRepository.findBy({
      id: +id,
    })
    return this.productRepository.remove(storedProduct)
  }
}
