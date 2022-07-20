import { Model } from 'mongoose';
import { MockQuery, MockType, objectIdMock, userMock } from '../../utils';
import { UserDocument } from '../schemas';
import { AuthRepository } from './auth.repository';

describe('AuthRepository', () => {
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

  describe('signUp', () => {
    it('should create the entity', async () => {
      const modelMock = MockType<Model<UserDocument>>({
        create: jest.fn().mockReturnValue(userMock),
      });

      const repository = new AuthRepository(modelMock);
      await repository.signUp(userMock);
      expect(modelMock.create).toHaveBeenCalledWith(userMock);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user entity given its email', async () => {
      mockQuery.exec.mockReturnValue(userMock);
      mockQuery.select.mockReturnThis();

      const modelMock = MockType<Model<UserDocument>>({
        findOne: jest.fn().mockReturnValue(mockQuery),
      });

      const repository = new AuthRepository(modelMock);
      await repository.findOneByEmail('any@domain.com');
      expect(modelMock.findOne).toHaveBeenCalledWith({
        email: 'any@domain.com',
      });
      expect(mockQuery.select).toHaveBeenCalledWith('_id password');
      expect(mockQuery.exec).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a user entity given its id', async () => {
      mockQuery.exec.mockReturnValue(userMock);
      mockQuery.select.mockReturnThis();

      const modelMock = MockType<Model<UserDocument>>({
        findById: jest.fn().mockReturnValue(mockQuery),
      });

      const repository = new AuthRepository(modelMock);
      await repository.findById(objectIdMock);
      expect(modelMock.findById).toHaveBeenCalledWith(objectIdMock);
      expect(mockQuery.select).toHaveBeenCalledWith('-password');
      expect(mockQuery.exec).toHaveBeenCalled();
    });
  });
});
