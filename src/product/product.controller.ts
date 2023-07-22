import { Body, ConflictException, Controller, Delete, Get, HttpCode, HttpException, InternalServerErrorException, NotFoundException, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ProductService } from "./product.service";
import { Product } from "./product.entity";
import { CreateProductDTO } from "./dto/createproduct.dto";
import { UpdateProductDTO } from "./dto/updateproduct.dto";
import { ResponseDTO } from "./dto/response.dto";

@Controller("/api/v1/products")
export class ProductController {
  constructor(private readonly appService: ProductService) { }

  @Get()
  async getAll(@Query('category') category: string): Promise<ResponseDTO> {
    let products = await this.appService.getAll(category)
    return new ResponseDTO(200, '', products)
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDTO): Promise<ResponseDTO> {
   
    try {
      let product = await this.appService.create(createProductDto)
      return new ResponseDTO(201, 'product was created successfully', product)
    } catch (error) {
      return this.handleResponseError(error)
    }
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO): Promise<ResponseDTO> {
    try {

      let product =  await this.appService.update(id, updateProductDto)
      return new ResponseDTO(200, 'product was updated successfully', product)
    } catch (error) {
      return this.handleResponseError(error)
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Body() product: Product): Promise<ResponseDTO> {
    try {
      await this.appService.delete(id, product)
      return new ResponseDTO(200, 'product was deleted successfully', null)
    } catch (error) {
      return this.handleResponseError(error)
    }
  }

  handleResponseError (error: any): ResponseDTO {
    if (error instanceof NotFoundException) {
      return new ResponseDTO(404, 'product not found', null)
    } else if (error instanceof ConflictException) {
      return new ResponseDTO(409, 'code already exists', null)
    }
    return new ResponseDTO(500, 'internal server error', null)
  }
}
