import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Not, Repository } from "typeorm";
import { CreateProductDTO } from "./dto/createproduct.dto";
import { UpdateProductDTO } from "./dto/updateproduct.dto";

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
    let product = Product.newProductByCreate(createProductDto)
    const storedProduct = await this.productRepository.findOneBy({code: product.code})
    if (storedProduct) {
      throw new ConflictException()
    }
    return this.productRepository.save(product)
  }

  async update(id: string, updateProductDto: UpdateProductDTO): Promise<Product> {
    let product = Product.newProductByUpdate(id, updateProductDto)
    const storedProduct = await this.productRepository.findOneBy({
      id: product.id
    })
    if (!storedProduct) {
      throw new NotFoundException()
    }
    const otherStoredProduct = await this.productRepository.findOne({
      where: {
        code: product.code,
        id: Not(product.id)
      }
    });
    if (otherStoredProduct) {
      throw new ConflictException() 
    }
    return this.productRepository.save(product);
  }

  async delete(id: string, product: Product): Promise<Product[]> {
    const storedProduct = await this.productRepository.findBy({
      id: +id,
    })
    if (storedProduct.length == 0) {
      throw new NotFoundException()
    } 
    return this.productRepository.remove(storedProduct)
  }
}
