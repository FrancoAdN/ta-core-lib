import { albumMock, MockType, objectIdMock } from '../../utils';
import { AlbumRepository } from '../repositories';
import { Album } from '../schemas';
import { AlbumService } from './album.service';

describe('AlbumService', () => {
  const repositoryMock = MockType<AlbumRepository>({
    findOneAndUpdate: jest.fn(),
    createOne: jest.fn(),
    findByOwner: jest.fn(),
  });

  describe('markAlbumAsPublished', () => {
    it('should call the repository method', async () => {
      const serviceMock = new AlbumService(repositoryMock);
      await serviceMock.markAlbumAsPublished(objectIdMock, 'any-user-id');
      expect(repositoryMock.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: objectIdMock },
        new Album({
          updatedAt: expect.any(Date),
          updatedBy: 'any-user-id',
          published: true,
        }),
        null,
        true,
      );
    });
  });
  describe('create', () => {
    it('should call the repository method', async () => {
      const serviceMock = new AlbumService(repositoryMock);
      await serviceMock.create(albumMock);
      expect(repositoryMock.createOne).toHaveBeenCalledWith(albumMock);
    });
  });
  describe('findByOwner', () => {
    it('should call the repository method', async () => {
      const serviceMock = new AlbumService(repositoryMock);
      await serviceMock.findByOwner(objectIdMock);
      expect(repositoryMock.findByOwner).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
    });
  });
});
