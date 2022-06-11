import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlbumDocument, Album } from '../schemas';
import { BaseRepository } from './base.repository';

export class AlbumRepository extends BaseRepository {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<AlbumDocument>,
  ) {
    super(albumModel);
  }

  findByOwner(userId: string): Promise<Album[]> {
    return this.albumModel.find({ createdBy: userId }).exec();
  }
}
