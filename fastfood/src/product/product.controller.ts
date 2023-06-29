import { Body, Controller, Delete, Get, HttpException, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./dto/createproduct.dto";
import { ResponseDTO } from "./dto/response.dto";
import { response } from "express";

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
      const product = await this.appService.create(createProductDto)
      return product 
    } catch (error) {
      throw error instanceof HttpException
      ? error
      : new InternalServerErrorException; 
    }
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.appService.update(id, product)
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @Body() product: Product): string {
    this.appService.delete(id, product)
    return  "product was deleted successfully"
  }
}
