import { Model, Document, FilterQuery } from 'mongoose';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import { NotFoundException } from '@nestjs/common';

type BaseDocument = any & Document;

export abstract class BaseRepository {
  constructor(protected readonly model: Model<BaseDocument>) {}

  createOne(entity: object): Promise<BaseDocument> {
    return this.model.create(entity);
  }

  async findOne(
    filter: FilterQuery<BaseDocument>,
    projection?: any,
    expectOne: boolean = false,
  ): Promise<BaseDocument> {
    const result = await this.model.findOne(filter, projection).exec();
    if (expectOne && isEmpty(result))
      throw new NotFoundException(
        `Entity not found: ${JSON.stringify(filter)}`,
      );
    return result;
  }

  async findOneAndUpdate(
    filter: FilterQuery<BaseDocument>,
    entity: Partial<object>,
    options?: object,
    expectOne: boolean = false,
  ): Promise<BaseDocument> {
    const result = this.model
      .findOneAndUpdate(filter, entity, merge(options, { new: true }))
      .exec();
    if (expectOne && isEmpty(result))
      throw new NotFoundException(
        `Entity not found: ${JSON.stringify(filter)}`,
      );
  }
}
