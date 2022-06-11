import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User, UserDocument } from '../schemas';

export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  signUp(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  findOneByEmail(email: string): Promise<User> {
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
