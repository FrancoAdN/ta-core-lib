import { Injectable } from '@nestjs/common';
import { Publication } from '../schemas';
import { PublicationPayloadDto } from '../dtos';
import { PublicationRepository } from '../repositories';
import { ObjectId } from 'mongodb';
import { AlbumService } from './album.service';
import { FilterQuery } from 'mongoose';
import { User } from '../../auth';

@Injectable()
export class PublicationService {
  constructor(
    protected readonly repository: PublicationRepository,
    protected readonly albumService: AlbumService,
  ) {}

  async createPublication(
    payload: PublicationPayloadDto,
    userId: string,
  ): Promise<Publication> {
    // update album entity
    const albumId = new ObjectId(payload.albumId);
    await this.albumService.markAlbumAsPublished(albumId, userId);

    const publication = new Publication({
      albumId,
      caption: payload.caption,
    });

    return this.repository.createOne(publication);
  }

  findMultipleByUser(userId: string): Promise<Publication[]> {
    return this.repository.findMultipleByUserId(userId);
  }

  async markPublicationAsSeen(
    publicationId: ObjectId,
    userId: string,
  ): Promise<void> {
    const filter: FilterQuery<Publication> = {
      id: publicationId,
      createdBy: { $ne: userId },
    };
    await this.repository.findOne(filter, null, true);
    await this.repository.appendSeenBy(publicationId, userId);
  }

  findAllPublications(user: User): Promise<Publication[]> {
    return this.repository.findAllPublications(
      user._id.toHexString(),
      user.following,
    );
  }
}
