import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User, UserDocument } from '../schemas';
import { BaseRepository } from '../../travelers/repositories/base.repository';

export class AccountRepository extends BaseRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  addFollower(userId: ObjectId, followerId: string): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ _id: userId }, { $push: { followers: followerId } })
      .exec();
  }

  addFollowing(userId: ObjectId, followingId: string): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ _id: userId }, { $push: { following: followingId } })
      .exec();
  }

  findById(id: ObjectId): Promise<User> {
    return this.findOne({ _id: id }, '-password', true);
  }
}
