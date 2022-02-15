import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import {ProductModel} from './product.model'
import {FindProductDto} from './dto/find-product.dto'
import {CreateProductDto} from './dto/create-product.dto'

@Controller('product')
export class ProductController {
  @Post('create') // dto exclude _id field
  async create(@Body() dto: CreateProductDto): Promise<void> {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<void> {}

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {}

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() dto: ProductModel,
  ): Promise<void> {}

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto): Promise<void> {}
}
