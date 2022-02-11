import {Injectable} from '@nestjs/common'
import {AuthDto} from './dto/auth.dto'
import {ModelType} from '@typegoose/typegoose/lib/types'
import {UserModel} from './user.model'
import {InjectModel} from 'nestjs-typegoose'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ModelType<UserModel>,
  ) {}

  async createUser(dto: AuthDto): Promise<void> {}

  async findUser(email: string): Promise<void> {}
}
