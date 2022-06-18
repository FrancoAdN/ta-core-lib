import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User, UserDocument } from '../schemas';
import { EmailType } from '../../utils';

export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  signUp(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  findOneByEmail(email: EmailType): Promise<User> {
    return this.userModel
      .findOne({
        email,
      })
      .select('_id password')
      .exec();
  }

  findById(id: ObjectId): Promise<User> {
    return this.userModel.findById(id).select('-password').exec();
  }
}
