import { User } from '../../auth';
import { MockType, objectIdMock } from '../../utils';
import { PublicationPayloadDto } from '../dtos';
import { PublicationRepository } from '../repositories';
import { Publication } from '../schemas';
import { AlbumService } from './album.service';
import { PublicationService } from './publication.service';

describe('PublicationService', () => {
  const repositoryMock = MockType<PublicationRepository>({
    findMultipleByUserId: jest.fn(),
    appendSeenBy: jest.fn(),
    createOne: jest.fn(),
    findOne: jest.fn(),
    findAllPublications: jest.fn(),
  });

  const albumServiceMock = MockType<AlbumService>({
    markAlbumAsPublished: jest.fn(),
  });

  describe('createPublication', () => {
    it('should call the repository method', async () => {
      const service = new PublicationService(repositoryMock, albumServiceMock);
      const dto = new PublicationPayloadDto();
      dto.albumId = objectIdMock.toHexString();
      dto.caption = 'any-caption';
      await service.createPublication(dto, 'any-user');
      expect(repositoryMock.createOne).toHaveBeenCalledWith(
        new Publication({
          albumId: objectIdMock,
          caption: 'any-caption',
        }),
      );
      expect(albumServiceMock.markAlbumAsPublished).toHaveBeenCalledWith(
        objectIdMock,
        'any-user',
      );
    });
  });

  describe('findMultipleByUser', () => {
    it('should call the repository method', async () => {
      const service = new PublicationService(repositoryMock, albumServiceMock);
      await service.findMultipleByUser('any-user');
      expect(repositoryMock.findMultipleByUserId).toHaveBeenCalledWith(
        'any-user',
      );
    });
  });

  describe('markPublicationAsSeen', () => {
    it('should call the repository method', async () => {
      const service = new PublicationService(repositoryMock, albumServiceMock);
      await service.markPublicationAsSeen(objectIdMock, 'any-user');
      expect(repositoryMock.findOne).toHaveBeenCalledWith(
        {
          id: objectIdMock,
          createdBy: { $ne: 'any-user' },
        },
        null,
        true,
      );
      expect(repositoryMock.appendSeenBy).toHaveBeenCalledWith(
        objectIdMock,
        'any-user',
      );
    });
  });

  describe('findAllPublications', () => {
    it('should call the respository method', async () => {
      const service = new PublicationService(repositoryMock, albumServiceMock);
      const userMock = new User({
        _id: objectIdMock,
        following: ['any-user-id'],
      });
      await service.findAllPublications(userMock);
      expect(repositoryMock.findAllPublications).toHaveBeenCalledWith(
        userMock._id.toHexString(),
        userMock.following,
      );
    });
  });
});
