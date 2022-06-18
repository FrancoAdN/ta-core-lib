import { Model } from 'mongoose';
import { MockQuery, MockType, objectIdMock } from '../../utils';
import { PublicationDocument } from '../schemas';
import { PublicationRepository } from './publication.repository';

describe('PublicationRepository', () => {
  const mockQuery: MockQuery = {
    exec: jest.fn(),
    select: jest.fn(),
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
});
