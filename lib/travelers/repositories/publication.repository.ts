import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication, PublicationDocument } from '../schemas';
import { BaseRepository } from './base.repository';
import { ObjectId } from 'mongodb';

export class PublicationRepository extends BaseRepository {
  constructor(
    @InjectModel(Publication.name)
    private readonly publicationModel: Model<PublicationDocument>,
  ) {
    super(publicationModel);
  }

  findMultipleByUserId(userId: string): Promise<Publication[]> {
    return this.publicationModel.find({ createdBy: userId }).exec();
  }

  appendSeenBy(publicationId: ObjectId, seenBy: string): Promise<Publication> {
    return this.publicationModel
      .findOneAndUpdate({ _id: publicationId }, { $push: { seenBy: seenBy } })
      .exec();
  }

  findAllPublications(
    userId: string,
    following: string[],
  ): Promise<Publication[]> {
    const owners: string[] = [userId, ...following];
    return this.publicationModel
      .find({ createdBy: { $in: owners } })
      .sort({ createdAt: -1 })
      .exec();
  }
}
