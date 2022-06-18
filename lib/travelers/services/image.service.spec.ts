import { imageMock, MockType, objectIdMock } from '../../utils';
import { ContentService } from '../content';
import { ImagePayloadDto } from '../dtos';
import { ImageRepository } from '../repositories';
import { ImageService } from './image.service';
import { Readable } from 'stream';
import { BadRequestException } from '@nestjs/common';

describe('ImageService', () => {
  describe('create', () => {
    const dto = new ImagePayloadDto();
    const readable = new Readable();

    it('should create the image entity correctly', async () => {
      const repositoryMock = MockType<ImageRepository>({
        createOne: jest.fn().mockReturnValue(imageMock),
      });
      const contentServiceMock = MockType<ContentService>({
        upload: jest.fn().mockReturnValue({ Location: imageMock.imageKey }),
        deleteMediaContent: jest.fn(),
      });

      const serviceMock = new ImageService(repositoryMock, contentServiceMock);

      await serviceMock.create(dto, readable, objectIdMock, 'any-user');
      expect(contentServiceMock.upload).toHaveBeenCalledWith(dto, readable);
      expect(contentServiceMock.deleteMediaContent).not.toHaveBeenCalled();
      expect(repositoryMock.createOne).toHaveBeenCalledWith(imageMock);
    });

    it('should throw a badrequest exception', async () => {
      const repositoryMock = MockType<ImageRepository>({
        createOne: jest.fn(),
      });
      const contentServiceMock = MockType<ContentService>({
        upload: jest.fn().mockReturnValue(null),
        deleteMediaContent: jest.fn(),
      });

      const serviceMock = new ImageService(repositoryMock, contentServiceMock);
      await expect(
        serviceMock.create(dto, readable, objectIdMock, 'any-user'),
      ).rejects.toEqual(
        new BadRequestException(`Error uploading file to the server`),
      );
    });

    it('should delete the image when there is an error creating the entity', async () => {
      const repositoryMock = MockType<ImageRepository>({
        createOne: jest.fn().mockReturnValue(null),
      });
      const contentServiceMock = MockType<ContentService>({
        upload: jest
          .fn()
          .mockReturnValue({ Location: imageMock.imageKey, Key: 'any-key' }),
        deleteMediaContent: jest.fn(),
      });

      const serviceMock = new ImageService(repositoryMock, contentServiceMock);

      await serviceMock.create(dto, readable, objectIdMock, 'any-user');
      expect(contentServiceMock.deleteMediaContent).toHaveBeenCalledWith(
        'any-key',
      );
    });
  });
});
