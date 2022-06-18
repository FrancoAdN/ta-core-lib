import { User } from '../../auth';
import { ObjectId } from 'mongodb';
import { AlbumPayloadDto } from '../dtos';
import { createAlbumEntity } from './create-album.helper';
import { Album } from '../schemas';

describe('CreateAlbumHelper', () => {
  it('should create an album entity', () => {
    const objectIdMock = new ObjectId('507f1f77bcf86cd799439011');
    const executionContextMock = new User({
      _id: objectIdMock,
    });
    const albumDtoMock = new AlbumPayloadDto();
    albumDtoMock.description = 'any-description';
    albumDtoMock.images = [objectIdMock];
    albumDtoMock.title = 'any-title';
    albumDtoMock.location = 'any-location';
    albumDtoMock.rate = 4;
    const result = createAlbumEntity(albumDtoMock, executionContextMock);
    expect(result).toEqual(
      new Album({
        published: false,
        images: [objectIdMock],
        title: 'any-title',
        description: 'any-description',
        rate: 4,
        location: 'any-location',
        createdBy: objectIdMock.toHexString(),
        createdAt: expect.any(Date),
        deleted: false,
      }),
    );
  });
});
