import {Injectable} from '@nestjs/common'
import {InjectModel} from 'nestjs-typegoose'
import {TopLevelCategory, TopPageModel} from './top-page.model'
import {ModelType} from '@typegoose/typegoose/lib/types'
import {CreateTopPageDto} from './dto/create-top-page.dto'
import {addDays} from 'date-fns'
import {Types} from 'mongoose'

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto)
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec()
  }

  public async findByAlias(alias: string) {
    return this.topPageModel.findOne({alias}).exec()
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .find({firstCategory}, {alias: 1, secondCategory: 1, title: 1, category: 1})
      .exec()
  }

  async findByText(text: string) {
    return this.topPageModel.find({$text: {$search: text, $caseSensitive: false}}).exec()
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndRemove(id).exec()
  }

  async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, {new: true}).exec()
  }

  async findForHhUpdate(date: Date) {
    return this.topPageModel.find({
      firstCategory: 0,
      $or: [
        {'hh.updatedAt': {$lt: addDays(date, -1)}},
        {'hh.updatedAt': {$exists: false}},
      ],

    }).exec()
  }
}
