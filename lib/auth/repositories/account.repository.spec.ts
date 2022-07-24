import { Model } from 'mongoose';
import { MockQuery, MockType, objectIdMock, userMock } from '../../utils';
import { UserDocument } from '../schemas';
import { AccountRepository } from './account.repository';

describe('AccountRepository', () => {
  let mockQuery: MockQuery;

  beforeEach(() => {
    mockQuery = {
      select: jest.fn(),
      exec: jest.fn(),
      sort: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('should return a user entity given its id', async () => {
      mockQuery.exec.mockReturnValue(userMock);
      mockQuery.select.mockReturnThis();

      const modelMock = MockType<Model<UserDocument>>({
        findOne: jest.fn().mockReturnValue(mockQuery),
      });

      const repository = new AccountRepository(modelMock);
      await repository.findById(objectIdMock);
      expect(modelMock.findOne).toHaveBeenCalledWith(
        {
          _id: objectIdMock,
        },
        '-password',
      );
      expect(mockQuery.exec).toHaveBeenCalled();
    });
  });

  describe('addFollower', () => {
    it('should call the method', async () => {
      const modelMock = MockType<Model<UserDocument>>({
        findOneAndUpdate: jest.fn().mockReturnValue(mockQuery),
      });
      const repository = new AccountRepository(modelMock);
      await repository.addFollower(objectIdMock, 'any-user-id');
      expect(modelMock.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: objectIdMock },
        { $push: { followers: 'any-user-id' } },
      );
    });
  });

  describe('addFollowing', () => {
    it('should call the method', async () => {
      const modelMock = MockType<Model<UserDocument>>({
        findOneAndUpdate: jest.fn().mockReturnValue(mockQuery),
      });
      const repository = new AccountRepository(modelMock);
      await repository.addFollowing(objectIdMock, 'any-user-id');
      expect(modelMock.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: objectIdMock },
        { $push: { following: 'any-user-id' } },
      );
    });
  });
});
