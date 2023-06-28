import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";

@Controller("/api/v1/products")
export class ProductController {
  constructor(private readonly appService: ProductService) { }

  @Get()
  getAll(): Promise<Product[]> {
    return this.appService.getAll();
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.appService.create(product);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.appService.update(id, product)
  }
}
