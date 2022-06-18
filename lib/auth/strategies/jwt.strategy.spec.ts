import { UnauthorizedException } from '@nestjs/common';
import { MockType, objectIdMock, userMock } from '../../utils';
import { AuthService } from '../services';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStategy', () => {
  describe('validate', () => {
    process.env.JWT_SECRET_KEY = 'anySecret';
    it('should return the user when it exist', async () => {
      const authServiceMock = MockType<AuthService>({
        findById: jest.fn().mockReturnValue(userMock),
      });
      const strategy = new JwtStrategy(authServiceMock);
      const result = await strategy.validate({ userId: objectIdMock });
      expect(result).toEqual(userMock);
      expect(authServiceMock.findById).toHaveBeenCalledWith(objectIdMock);
    });

    it('should throw an exception when the user does not exist', async () => {
      const authServiceMock = MockType<AuthService>({
        findById: jest.fn().mockReturnValue(null),
      });
      const strategy = new JwtStrategy(authServiceMock);
      await expect(strategy.validate({ userId: objectIdMock })).rejects.toEqual(
        new UnauthorizedException(),
      );
    });
  });
});
