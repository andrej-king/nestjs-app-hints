import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {CreateReviewDto} from './dto/create-review.dto'
import {ReviewService} from './review.service'
import {REVIEW_NOT_FOUND, REVIEWS_NOT_FOUND} from './review.constants'
import {ReviewModel} from './review.model'
import {JwtAuthGuard} from '../auth/guards/jwt.guard'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto): Promise<ReviewModel> {
    return this.reviewService.create(dto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const deletedDoc = await this.reviewService.delete(id)
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('byProduct/:productId')
  async getByProduct(
    @Param('productId') productId: string,
  ): Promise<ReviewModel[] | void> {
    const review = await this.reviewService.findByProductId(productId)
    if (!review.length) {
      throw new HttpException(REVIEWS_NOT_FOUND, HttpStatus.NOT_FOUND)
    }

    return review
  }
}
