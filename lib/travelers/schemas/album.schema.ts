import { BaseSchema } from '.';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type AlbumDocument = Album & Document;

// export class Tag {
//   @Prop({ type: String, required: true })
//   username: string;
//   @Prop({ type: String, required: true })
//   userId: string;
// }

@Schema()
export class Album extends BaseSchema {
  @Prop({ type: Boolean, default: false })
  published: boolean;

  @Prop({ type: [ObjectId], required: true })
  images: ObjectId[];

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: Number, required: true })
  rate: number;

  @Prop({ type: String, required: true })
  location: string;

  //   @Prop({ type: [Tag], default: [] })
  //   tags: Tag[];

  constructor(album: Partial<Album> = {}) {
    super(album);
    Object.assign(this, album);
  }
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
