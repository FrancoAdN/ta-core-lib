import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { AccountRepository } from '../repositories/account.repository';
import { User } from '../schemas';

@Injectable()
export class AccountService {
  constructor(private readonly repository: AccountRepository) {}

  async followUser(userId: ObjectId, followedId: string): Promise<void> {
    const promises = [
      this.repository.addFollowing(userId, followedId),
      this.repository.addFollower(
        new ObjectId(followedId),
        userId.toHexString(),
      ),
    ];
    await Promise.all(promises);
  }

  findById(userId: ObjectId): Promise<User> {
    return this.repository.findById(userId);
  }
}
