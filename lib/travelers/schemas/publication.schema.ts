import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { BaseSchema } from './base.schema';

export type PublicationDocument = Publication & Document;

@Schema()
export class Publication extends BaseSchema {
  @Prop({ type: [String], default: [] })
  seenBy: string[];

  @Prop({ type: [ObjectId], default: [] })
  comments: ObjectId[];

  @Prop({ type: ObjectId, required: true })
  albumId: ObjectId;

  @Prop({ type: String, required: true })
  caption: string;

  @Prop({ type: [String], default: [] })
  likes: string[];

  constructor(publication: Partial<Publication> = {}) {
    super(publication);
    Object.assign(this, publication);
  }
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
