import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Not, Repository } from "typeorm";
import { CreateProductDTO } from "./dto/createproduct.dto";
import { UpdateProductDTO } from "./dto/updateproduct.dto";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
  ) { }

  getAll(category: string): Promise<Product[]> {
    if (!category) {
      return this.productRepository.getAll();
    }
    return this.productRepository.getByCategory(category);
  }

  async create(createProductDto: CreateProductDTO): Promise<Product | null> {
    let product = Product.newProductByCreate(createProductDto)
    const storedProduct = await this.productRepository.getByCode(product.code);
    if (storedProduct) {
      throw new ConflictException()
    }
    return await this.productRepository.save(product)
  }

  async update(id: string, updateProductDto: UpdateProductDTO): Promise<Product | null> {
    let product = Product.newProductByUpdate(id, updateProductDto)
    const storedProduct = await this.productRepository.getById(product.id)
    if (!storedProduct) {
      throw new NotFoundException()
    }

    const otherStoredProduct = await this.productRepository.getByCode(product.code);
    if (otherStoredProduct != null && otherStoredProduct.id != product.id) {
      throw new ConflictException() 
    }
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<Product> {
    const storedProduct = await this.productRepository.getById(id)
    if (storedProduct == null) {
      throw new NotFoundException()
    } 
    return await this.productRepository.remove(storedProduct)
  }
}
