import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, NotFoundException,
  Param,
  Patch,
  Post, UsePipes, ValidationPipe,
} from '@nestjs/common'
import {ProductModel} from './product.model'
import {FindProductDto} from './dto/find-product.dto'
import {CreateProductDto} from './dto/create-product.dto'
import {ProductService} from './product.service'
import {PRODUCT_NOT_FOUND} from './product.constants'
import {BeAnObject, DocumentType} from '@typegoose/typegoose/lib/types'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create') // dto exclude _id field
  async create(@Body() dto: CreateProductDto): Promise<ProductModel> {
    return this.productService.create(dto)
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = this.productService.findById(id)
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND)
    }

    return product
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const deletedProduct = this.productService.deleteById(id)
    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND)
    }
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: CreateProductDto,
  ) {
    const updatedProduct = this.productService.updateById(id, dto)
    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND)
    }

    return updatedProduct
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    const res = this.productService.findWithReviews(dto)
    console.log(res)
    return res
  }
}
