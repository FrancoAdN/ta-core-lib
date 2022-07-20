import { Model } from 'mongoose';
import { MockQuery, MockType, objectIdMock, userMock } from '../../utils';
import { PublicationDocument } from '../schemas';
import { PublicationRepository } from './publication.repository';

describe('PublicationRepository', () => {
  const mockQuery: MockQuery = {
    exec: jest.fn(),
    select: jest.fn(),
    sort: jest.fn(),
  };
  const modelMock = MockType<Model<PublicationDocument>>({
    find: jest.fn().mockReturnValue(mockQuery),
    findOneAndUpdate: jest.fn().mockReturnValue(mockQuery),
  });

  describe('findMultipleByUserId', () => {
    it('should call the method', async () => {
      const repository = new PublicationRepository(modelMock);
      await repository.findMultipleByUserId('any-user-id');
      expect(modelMock.find).toHaveBeenCalledWith({ createdBy: 'any-user-id' });
    });
  });

  describe('appendSeenBy', () => {
    it('should call the method', async () => {
      const repository = new PublicationRepository(modelMock);
      await repository.appendSeenBy(objectIdMock, 'any-user-id');
      expect(modelMock.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: objectIdMock },
        { $push: { seenBy: 'any-user-id' } },
      );
    });
  });

  describe('findAllPublications', () => {
    it('should call the method', async () => {
      mockQuery.sort.mockReturnThis();
      const repository = new PublicationRepository(modelMock);
      await repository.findAllPublications(
        userMock._id.toHexString(),
        userMock.following,
      );
      expect(modelMock.find).toHaveBeenCalledWith({
        createdBy: { $in: ['507f1f77bcf86cd799439011', 'any-following'] },
      });
      expect(mockQuery.sort).toHaveBeenCalledWith({ createdAt: -1 });
    });
  });
});
