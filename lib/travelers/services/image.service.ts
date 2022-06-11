import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { ContentService } from '../content/services/content.service';
import { ImagePayloadDto } from '../dtos';
import { ImageRepository } from '../repositories';
import { Image } from '../schemas';
import { ObjectId } from 'mongodb';

@Injectable()
export class ImageService {
  constructor(
    private readonly repository: ImageRepository,
    private readonly contentService: ContentService,
  ) {}

  async create(
    imageDto: ImagePayloadDto,
    stream: Readable,
    parentAlbum: ObjectId,
    userId: string,
  ): Promise<Image> {
    let image;
    const s3Response = await this.contentService.upload(imageDto, stream);
    if (s3Response) {
      image = await this.repository.createOne(
        this.createImage(s3Response.Location, parentAlbum, userId),
      );
      if (!image) {
        await this.contentService.deleteMediaContent(s3Response.Key);
      }
    } else {
      throw new BadRequestException(`Error uploading file to the server`);
    }
    return image;
  }

  private createImage(location: string, parentAlbum: ObjectId, userId): Image {
    return new Image({
      imageKey: location,
      parentAlbum,
      createdBy: userId,
      createdAt: new Date(),
      deleted: false,
    });
  }
}
