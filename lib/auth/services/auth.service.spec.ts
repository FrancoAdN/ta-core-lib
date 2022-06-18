import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MockType, objectIdMock, tokenMock, userMock } from '../../utils';
import { CredentialsDto, SignUpDto } from '../dtos';
import { AuthRepository } from '../repositories';
import { User } from '../schemas';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let repositoryMock = MockType<AuthRepository>({
    findById: jest.fn(),
    findOneByEmail: jest.fn(),
    signUp: jest.fn(),
  });
  const jwtServiceMock = MockType<JwtService>({
    sign: jest.fn().mockReturnValue(tokenMock),
  });
  describe('signUp', () => {
    it('should call the repository method correctly', async () => {
      const dto = new SignUpDto();
      dto.email = 'any@domain.com';
      dto.name = 'any-name';
      dto.lastname = 'any-lastname';
      dto.username = 'any-username';
      dto.password = 'any-pwd';

      const serviceMock = new AuthService(repositoryMock, jwtServiceMock);
      await serviceMock.signUp(dto);
      expect(repositoryMock.signUp).toHaveBeenCalledWith(new User(dto));
    });
  });
  describe('signIn', () => {
    const dto = new CredentialsDto();
    dto.email = 'any@domain.com';
    dto.password = 'any-pwd';

    it('should return the token when the user exist', async () => {
      repositoryMock.findOneByEmail = jest.fn().mockReturnValue(userMock);
      const service = new AuthService(repositoryMock, jwtServiceMock);
      const result = await service.signIn(dto);
      expect(result).toEqual({ token: tokenMock });
    });

    it('should throw an Unauthorized exception when the user does not exist', async () => {
      repositoryMock.findOneByEmail = jest.fn().mockReturnValue(null);
      const service = new AuthService(repositoryMock, jwtServiceMock);
      await expect(service.signIn(dto)).rejects.toEqual(
        new UnauthorizedException(),
      );
    });
  });

  describe('findById', () => {
    it('should call the repository method', async () => {
      const service = new AuthService(repositoryMock, jwtServiceMock);
      await service.findById(objectIdMock);
      expect(repositoryMock.findById).toHaveBeenCalledWith(objectIdMock);
    });
  });
});
