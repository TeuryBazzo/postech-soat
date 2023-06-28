import { Body, Controller, Get, Post } from "@nestjs/common";
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
  post(@Body() product: Product): Promise<Product> {
    console.log(product);
    return this.appService.save(product);
  }
}
