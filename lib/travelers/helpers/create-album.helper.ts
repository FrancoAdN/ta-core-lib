import { AlbumPayloadDto } from '../dtos';
import { Album } from '../schemas';
import { User } from '../../auth';

export const createAlbumEntity = (
  payload: AlbumPayloadDto,
  executionContext: User,
) => {
  return new Album({
    published: false,
    images: payload.images,
    title: payload.title,
    description: payload.description,
    rate: payload.rate,
    location: payload.location,
    createdBy: executionContext._id.toHexString(),
    createdAt: new Date(),
    deleted: false,
  });
};
