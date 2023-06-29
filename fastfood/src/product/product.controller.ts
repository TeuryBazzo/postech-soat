import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./dto/createproduct.dto";
import { UpdateProductDTO } from "./dto/updateproduct.dto";

@Controller("/api/v1/products")
export class ProductController {
  constructor(private readonly appService: ProductService) { }

  @Get()
  getAll(): Promise<Product[]> {
    return this.appService.getAll();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDTO): Promise<Product> {
    try {
      return await this.appService.create(createProductDto)
    } catch (error) {
      throw error instanceof HttpException
      ? error
      : new InternalServerErrorException
    }
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO): Promise<Product> {
    try {
      return await this.appService.update(id, updateProductDto)
    } catch (error) {
      throw error instanceof HttpException
      ? error
      : new InternalServerErrorException
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Body() product: Product): Promise<string> {
    try {
      await this.appService.delete(id, product)
      return  "product was deleted successfully"
    } catch (error) {
      throw error instanceof HttpException
      ? error
      : new InternalServerErrorException
    }
  }
}
