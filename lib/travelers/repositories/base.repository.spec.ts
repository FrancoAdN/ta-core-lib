import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MockQuery, MockType } from '../../utils';
import { BaseSchema } from '../schemas';
import { BaseRepository } from './base.repository';

describe('BaseRepository', () => {
  const mockQuery: MockQuery = {
    exec: jest.fn(),
    select: jest.fn(),
    sort: jest.fn(),
  };

  class TestCommentRepository extends BaseRepository {
    constructor(model: Model<any>) {
      super(model);
    }
  }

  const entityMock = new BaseSchema({
    createdBy: 'any-user',
  });

  const modelMock = MockType<Model<any>>({
    findOne: jest.fn().mockReturnValue(mockQuery),
    create: jest.fn(),
    findOneAndUpdate: jest.fn().mockReturnValue(mockQuery),
  });

  describe('createOne', () => {
    it('should call the model method', async () => {
      const repository = new TestCommentRepository(modelMock);
      await repository.createOne(entityMock);
      expect(modelMock.create).toHaveBeenCalledWith(entityMock);
    });
  });
  describe('findOne', () => {
    const filter = { createdBy: 'any-user' };
    const projection = 'project';

    it('should call the model method', async () => {
      const repository = new TestCommentRepository(modelMock);
      await repository.findOne(filter, projection);
      expect(modelMock.findOne).toHaveBeenCalledWith(filter, projection);
    });

    it('should throw an exception', async () => {
      mockQuery.exec = jest.fn().mockReturnValue(null);
      modelMock.findOne = jest.fn().mockReturnValue(mockQuery);
      const repository = new TestCommentRepository(modelMock);
      await expect(
        repository.findOne(filter, projection, true),
      ).rejects.toEqual(
        new NotFoundException(`Entity not found: ${JSON.stringify(filter)}`),
      );
    });
  });
  describe('findOneAndUpdate', () => {
    const filter = { createdBy: 'any-user' };
    const options = {};
    const update = {
      createdBy: 'other-user',
      updatedBy: 'any-user',
    };

    it('should call the model method', async () => {
      const repository = new TestCommentRepository(modelMock);
      await repository.findOneAndUpdate(filter, update, options);
      expect(modelMock.findOneAndUpdate).toHaveBeenCalledWith(filter, update, {
        new: true,
      });
    });

    it('should throw an exception', async () => {
      mockQuery.exec = jest.fn().mockReturnValue(null);
      modelMock.findOneAndUpdate = jest.fn().mockReturnValue(mockQuery);
      const repository = new TestCommentRepository(modelMock);
      await expect(
        repository.findOneAndUpdate(filter, update, options, true),
      ).rejects.toEqual(
        new NotFoundException(`Entity not found: ${JSON.stringify(filter)}`),
      );
    });
  });
});
