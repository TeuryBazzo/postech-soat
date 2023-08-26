import { Body, ConflictException, Controller, Delete, Get,NotFoundException, Param, Post, Put, Query, Res } from "@nestjs/common";
import { CreateProductDTO } from "./dto/createproduct.dto";
import { UpdateProductDTO } from "./dto/updateproduct.dto";
import { ResponseDTO } from "./dto/response.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetProductsByCategoryUserCase } from './userCases/getProductsByCategory.userCase';
import { GetAllProductsUserCase } from './userCases/getAllProducts.userCase';
import { CreateProductUserCase } from './userCases/createProduct.userCase';
import { UpdateProductUserCase } from './userCases/updateProduct.userCase';
import { DeleteProductUserCase } from './userCases/deleteProduct.userCase';

@Controller("/api/v1/products")
@ApiTags('products')
export class ProductController {
  constructor(
    private readonly getProductByCategoryUserCase: GetProductsByCategoryUserCase,
    private readonly createProductUserCase: CreateProductUserCase,
    private readonly updateProductUserCase: UpdateProductUserCase,
    private readonly deleteProductUserCase: DeleteProductUserCase,
    private readonly getAllProductsUserCase: GetAllProductsUserCase) { }

  @Get()
  @ApiOperation({ summary: 'get products by category' })
  async getAll(@Query('category') category: string ): Promise<ResponseDTO> {
    
    let products = category ?
     await this.getProductByCategoryUserCase.handle(category) :
     await this.getAllProductsUserCase.handle();     

    return new ResponseDTO(200, '', products)
  }

  @Post()
  @ApiOperation({ summary: 'create product' })
  async create(@Body() createProductDto: CreateProductDTO): Promise<ResponseDTO> {
    try {
      let product = await this.createProductUserCase.handle(createProductDto)
      return new ResponseDTO(201, 'product was created successfully', product)
    } catch (error) {
      return this.handleResponseError(error)
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'update product by id' })
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO): Promise<ResponseDTO> {
    try {
      let product =  await this.updateProductUserCase.handle(id, updateProductDto)
      return new ResponseDTO(200, 'product was updated successfully', product)
    } catch (error) {
      return this.handleResponseError(error)
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'delete product by id' })
  async delete(@Param('id') id: number): Promise<ResponseDTO> {
    try {
      await this.deleteProductUserCase.handle(id);
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
