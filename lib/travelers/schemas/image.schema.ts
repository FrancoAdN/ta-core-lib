import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type ImageDocument = Image & Document;

@Schema()
export class Image extends BaseSchema {
  @Prop({ type: String })
  imageKey: string;

  @Prop({ type: ObjectId, default: null })
  parentAlbum: ObjectId;

  constructor(image: Partial<Image> = {}) {
    super(image);
    Object.assign(this, image);
  }
}

export const ImageSchema = SchemaFactory.createForClass(Image);
