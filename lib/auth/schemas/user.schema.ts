import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
export type UserDocument = User & Document;

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // @Prop({required: true})
  // avatar: string;

  constructor(user: Partial<User> = {}) {
    Object.assign(this, user);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
