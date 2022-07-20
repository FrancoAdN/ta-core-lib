import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { EmailType } from '../../utils';
export type UserDocument = User & Document;

@Schema()
export class User {
  _id: ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  email: EmailType;

  @Prop({ required: true, type: String })
  password: string;

  // @Prop({required: true})
  // avatar: string;
  @Prop({ required: true, type: [String] })
  following: string[];

  @Prop({ required: true, type: [String] })
  followers: string[];

  constructor(user: Partial<User> = {}) {
    Object.assign(this, user);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
