import { Model } from 'mongoose';
import { MockQuery, MockType } from '../../utils';
import { AlbumDocument } from '../schemas';
import { AlbumRepository } from './album.repository';

describe('AlbumRepository', () => {
  const mockQuery: MockQuery = {
    exec: jest.fn(),
    select: jest.fn(),
    sort: jest.fn(),
  };
  describe('findByOwner', () => {
    it('should call the model method', async () => {
      const modelMock = MockType<Model<AlbumDocument>>({
        find: jest.fn().mockReturnValue(mockQuery),
      });
      const repository = new AlbumRepository(modelMock);
      await repository.findByOwner('any-user-id');
      expect(modelMock.find).toHaveBeenCalledWith({ createdBy: 'any-user-id' });
    });
  });
});
