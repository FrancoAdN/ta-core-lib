import { MockType, objectIdMock } from '../../utils';
import { AccountRepository } from '../repositories/account.repository';
import { AccountService } from './account.service';
import { ObjectId } from 'mongodb';

describe('AccountService', () => {
  let repositoryMock = MockType<AccountRepository>({
    findById: jest.fn(),
    addFollower: jest.fn(),
    addFollowing: jest.fn(),
  });

  describe('followUser', () => {
    it('should call the repository methods', async () => {
      const followed = '667fdfa7bcf86cdff9439abe';
      const service = new AccountService(repositoryMock);
      await service.followUser(objectIdMock, followed);
      expect(repositoryMock.addFollowing).toHaveBeenCalledWith(
        objectIdMock,
        followed,
      );
      expect(repositoryMock.addFollower).toHaveBeenCalledWith(
        new ObjectId(followed),
        objectIdMock.toHexString(),
      );
    });
  });
  describe('findById', () => {
    it('should call the repository method', async () => {
      const service = new AccountService(repositoryMock);
      await service.findById(objectIdMock);
      expect(repositoryMock.findById).toHaveBeenCalledWith(objectIdMock);
    });
  });
});
