import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {ProductModel} from './product.model'
import {FindProductDto} from './dto/find-product.dto'
import {CreateProductDto} from './dto/create-product.dto'
import {ProductService} from './product.service'
import {PRODUCT_NOT_FOUND} from './product.constants'
import {IdValidationPipe} from '../pipes/id-validation.pipe'
import {JwtAuthGuard} from '../auth/guards/jwt.guard'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateProductDto): Promise<ProductModel> {
    return this.productService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = this.productService.findById(id)
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND)
    }

    return product
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<void> {
    const deletedProduct = this.productService.deleteById(id)
    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
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
