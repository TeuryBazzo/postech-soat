import { Body, Controller, Delete, Get, HttpCode, HttpException, InternalServerErrorException, Param, Post, Put } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./dto/createproduct.dto";
import { UpdateProductDTO } from "./dto/updateproduct.dto";
import { SuccessResponseDTO } from "./dto/successresponse.dto";
@Controller("/api/v1/products")
export class ProductController {
  constructor(private readonly appService: ProductService) { }

  @Get()
  async getAll(): Promise<SuccessResponseDTO> {
    let products = await this.appService.getAll()
    let response = new SuccessResponseDTO()
    response.status = 200
    response.message = ''
    response.data = products
    return response
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDTO): Promise<SuccessResponseDTO> {
    try {
      let product = await this.appService.create(createProductDto)
      let response = new SuccessResponseDTO()
      response.status = 201 
      response.message = "product was created successfully"
      response.data = product
      return response
    } catch (error) {
      throw error instanceof HttpException
      ? error
      : new InternalServerErrorException
    }
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO): Promise<SuccessResponseDTO> {
    try {
      let product =  await this.appService.update(id, updateProductDto)
      let response = new SuccessResponseDTO()
      response.status = 201 
      response.message = "product was updated successfully"
      response.data = product
      return response
    } catch (error) {
      throw error instanceof HttpException
      ? error
      : new InternalServerErrorException
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Body() product: Product): Promise<SuccessResponseDTO> {
    try {
      await this.appService.delete(id, product)
      let response = new SuccessResponseDTO()
      response.status = 200 
      response.message = "product was deleted successfully"
      response.data = null;
      return response
    } catch (error) {
      throw error instanceof HttpException
      ? error
      : new InternalServerErrorException
    }
  }
}
